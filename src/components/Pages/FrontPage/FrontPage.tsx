import * as React from 'react';

import {
  Header,
  InnerLayoutContainer,
  Meta,
  ResultDetails,
  SearchInput,
  ConferenceList
} from 'components';
import useSearch from '../../../hooks/useSearch';

export const FrontPageInner: React.FC<any> = () => {
  const {
    query,
    localQuery,
    filteredList,
    onInputChange,
    numberOfVideos,
    numberOfConferences
  } = useSearch()

  return (
    <>
      <Meta title={query} />
      <Header
        title="React.js Videos"
        titleLink="/#/search"
        tagline="Search React.js conference videos."
      />
      <InnerLayoutContainer>
        <SearchInput filterValue={localQuery} onChange={onInputChange} />
        <ResultDetails numberOfVideos={numberOfVideos} numberOfConferences={numberOfConferences} />
        <ConferenceList conferences={filteredList} />
      </InnerLayoutContainer>
    </>
  );
};

export const FrontPage = FrontPageInner


