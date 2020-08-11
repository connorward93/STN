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

export default function Guests() {
  const [guests, setGuests] = useState([]);
  // const dispatch = useDispatch();
  // const channelData = useSelector(channels);
  // const playState = useSelector(playing);
  // const current = useSelector(currentlyPlaying);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/shows/guests')
        .then((res) => setGuests(res.data.embeds.episodes.results));
    fetchData();
  }, []);

  type Props = {
    name: string;
    location_long: string;
    broadcast: string;
    media: { background_medium_large: string };
    genres: [{ id: string; value: string }];
  };

  const guestsComponents = guests.map((guest: Props) => {
    return <ListItem key={guest.name} data={guest} />;
  });

  return <div className={styles.discovery__transition}>{guestsComponents}</div>;
}
