import {
    ConferenceTransformed,
    VideoTransformed
} from '../domain/TransformedJSON';

import { PresenterInput } from '../domain/InputJSON'

/** Mock data */
export const mockVideo = (title = 'test title'): VideoTransformed => ({
    link: 'a link',
    split: '',
    title: title || 'test title',
    length: '12:34',
    lightning: false,
    presenter: { name: 'simon carter' },
    embeddableLink: 'a link',
    conference: {
        date: 'XX/YY/ZZZ',
        title: 'react conf 2018',
        website: 'fake url',
        playlist: 'day 1',
    }
});

export const mockPresenter = (name = 'simon carter'): PresenterInput => ({
    name
});

export const mockConference = (): ConferenceTransformed => ({
    date: 'XX/YY/ZZZ',
    title: 'react conf 2018',
    website: 'fake url',
    playlist: 'day 1',
    videos: [mockVideo('aaa'), mockVideo('bbb'), mockVideo('ccc')]
});
