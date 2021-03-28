
import { atom, atomFamily, selectorFamily } from "recoil";
import { any, omit, sort } from 'ramda';
import { cleanQuery, sluggifyUrl } from "../utils";
import axios from 'axios';
import { Conferences } from "../domain/TransformedJSON";
import { ConferenceInput, JSONInput, VideoInput } from "../domain/InputJSON";

export const listState = atom<Conferences>({
    key: "list",
    default: []
})

export const queryState = atomFamily<string, string>({
    key: "query",
    default: (param: string) => param
})

export const resultDetailsState = atom({
    key: "resultDetails",
    default: {
        numberOfVideos: 0,
        numberOfConferences: 0
    }
})

const addEmbeddableLinksToVideos = (data: JSONInput): Conferences => {
    const linkReg = /https:?\/\/www\.youtube\.com\/watch\?v=(.*?)\&.*$/;
    return data.map((conference: ConferenceInput) => {
        const videos = conference.videos || [];
        const nVideos = videos.map((video: VideoInput) => {
            const embeddableLink = video.link.replace(
                linkReg,
                'https://www.youtube.com/embed/$1'
            );
            return Object.assign({}, video, { embeddableLink });
        });
        return Object.assign({}, conference, { videos: nVideos });
    });
};

const mapConferenceDetailsOntoVideo = (conference: ConferenceInput) => (video: VideoInput) =>
({
    ...video,
    conference: omit(['videos'], conference)
})

const addConferenceDetails = (data: Conferences): Conferences => {
    return data.map(conference => {
        const videos = conference.videos || [];
        const nVideos = videos.map(mapConferenceDetailsOntoVideo(conference));
        return Object.assign({}, conference, { videos: nVideos });
    });
}

export const sortByDate = sort<ConferenceInput>((a: ConferenceInput, b: ConferenceInput) => {
    const [aD, aM, aY] = a.date.split('-');
    const [bD, bM, bY] = b.date.split('-');

    // 1t first compare years for difference
    if (parseFloat(aY) < parseFloat(bY)) {
        return 1;
    } else if (parseFloat(aY) > parseFloat(bY)) {
        return -1;
    }

    // otherwise look at months
    if (parseFloat(aM) < parseFloat(bM)) {
        return 1;
    } else if (parseFloat(aM) > parseFloat(bM)) {
        return -1;
    }

    // finally look at days
    if (parseFloat(aD) < parseFloat(bD)) {
        return 1;
    } else if (parseFloat(aD) > parseFloat(bD)) {
        return -1;
    }

    // they are the same
    return 0;
});

// normalize data
export const transformDataFromJson = (data: JSONInput): Conferences => {
    // sort confs by date
    const confs = sortByDate(data);

    // add embeddable links to videos
    const dataWithEmbeddableLinks = addEmbeddableLinksToVideos(confs);
    const withConferenceDetails = addConferenceDetails(dataWithEmbeddableLinks)
    return withConferenceDetails;
};

export const loadData = async () => {
    const response = await axios.get('/assets/conferenceVids.json')
    return transformDataFromJson(response.data)
}

const textInDetails = (
    filterValue: string,
    termsToSearch: [string, string]
) => any(phrase => cleanQuery(phrase).includes(filterValue), termsToSearch);

const filterConferences = (conferences: Conferences, confName?: string) => {
    return !confName || confName === '' ? conferences : conferences.filter(({ title }) => sluggifyUrl(cleanQuery(title)) === confName)
}

export const filteredListState = selectorFamily({
    key: "filteredList",
    get: (confName: string) => ({ get }) => {
        const filter = get(queryState(''))
        const list = get(listState)
        const cleanFilter = cleanQuery(filter)
        if ((!cleanFilter || cleanFilter === '') && confName === '') return list;
        const filteredConferences = filterConferences(list, confName)
        const matchingConferences = filteredConferences.reduce<Conferences>((confAcc, conference) => {
            const matchedVideos = conference.videos.filter((video) => {
                const { presenter: { name }, title } = video;
                return textInDetails(cleanFilter, [name, title])
            })
            if (matchedVideos.length) {
                confAcc.push({
                    ...conference,
                    videos: matchedVideos
                })
            }
            return confAcc;
        }, [])
        return matchingConferences
    }
});

export const computedResultDetails = selectorFamily({
    key: "computedResultDetails",
    get: (confName: string) => ({ get }) => {
        const filteredList = get(filteredListState(confName));
        const numberOfVideos = filteredList.reduce((numberOfVideos, conference) => {
            numberOfVideos += conference.videos.length;
            return numberOfVideos;
        }, 0)
        return {
            numberOfVideos,
            numberOfConferences: filteredList.length
        }
    }
})
