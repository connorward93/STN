import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import moment from 'moment';
import {
  currentlyPlaying,
  // play,
  // pause,
  playing,
  // updatePlaying,
} from '../live/channelSlice';
import styles from './Discovery.css';

export default function Latest() {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  // const dispatch = useDispatch();
  // const channelData = useSelector(channels);
  const playState = useSelector(playing);
  const current = useSelector(currentlyPlaying);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/collections/recently-added')
        .then((res) => setRecentlyAdded(res.data.results));
    fetchData();
  }, []);

  const recentlyAddedComponents = recentlyAdded.map(
    (recent: {
      name: string;
      location_long: string;
      media: { background_medium_large: string };
    }) => {
      return (
        <div key={recent.name} className={styles.recent__container}>
          <div
            className={styles.recent__thumbnail}
            style={{
              backgroundImage: `url(
                ${recent.media.background_medium_large}
              )`,
              backgroundSize: 'cover',
            }}
          />
          <div className={styles.recent__description}>
            <h6>{recent.location_long}</h6>
            <h5>{recent.name}</h5>
          </div>
        </div>
      );
    }
  );

  return (
    <div>
      Latest
      {recentlyAddedComponents}
    </div>
  );
}
