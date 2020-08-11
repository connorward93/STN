import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ListItem from './ListItem';
// import {
//   currentlyPlaying,
//   // play,
//   // pause,
//   playing,
//   // updatePlaying,
// } from '../live/channelSlice';
import styles from './Discovery.css';

export default function Picks() {
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/collections/recently-added')
        .then((res) => setRecentlyAdded(res.data.results));
    fetchData();
  }, []);

  type Props = {
    name: string;
    location_long: string;
    broadcast: string;
    media: { background_medium_large: string };
    genres: [{ id: string; value: string }];
  };

  const recentlyAddedComponents = recentlyAdded.map((recent: Props) => {
    return <ListItem key={recent.name} data={recent} />;
  });

  return (
    <div className={styles.discovery__transition}>
      {recentlyAddedComponents}
    </div>
  );
}
