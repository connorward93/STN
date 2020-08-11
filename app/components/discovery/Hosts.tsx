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

export default function Hosts() {
  const [hosts, setHosts] = useState([]);
  // const dispatch = useDispatch();
  // const channelData = useSelector(channels);
  // const playState = useSelector(playing);
  // const current = useSelector(currentlyPlaying);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/shows/')
        .then((res) => setHosts(res.data.results));
    fetchData();
  }, []);

  type Props = {
    name: string;
    location_long: string;
    broadcast: string;
    media: { background_medium_large: string };
    genres: [{ id: string; value: string }];
  };

  const hostsComponents = hosts.map((host: Props) => {
    return <ListItem key={host.name} data={host} />;
  });

  return <div className={styles.discovery__transition}>{hostsComponents}</div>;
}
