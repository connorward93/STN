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

export default function Latest() {
  const [picks, setPicks] = useState([]);
  // const dispatch = useDispatch();
  // const channelData = useSelector(channels);
  // const playState = useSelector(playing);
  // const current = useSelector(currentlyPlaying);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/collections/nts-picks')
        .then((res) => setPicks(res.data.results));
    fetchData();
  }, []);

  type Props = {
    name: string;
    location_long: string;
    broadcast: string;
    media: { background_medium_large: string };
    genres: [{ id: string; value: string }];
  };

  const picksComponents = picks.map((pick: Props) => {
    return <ListItem key={pick.name} data={pick} />;
  });

  return <div className={styles.discovery__transition}>{picksComponents}</div>;
}
