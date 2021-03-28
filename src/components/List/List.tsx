import * as React from 'react';

import styles from './List.scss';
import { ConferenceTransformed } from '../../domain/TransformedJSON';
import VideoList from '../VideoList';

export const ConferenceList: React.FC<{
  conferences: ConferenceTransformed[]
}> = ({
  conferences
}) => (
    <ol className={styles.root} data-cy="results-list">
      {conferences.length > 0 && conferences.map(conference => <VideoList conference={conference} />)}
    </ol >
  );
