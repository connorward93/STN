/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  play,
  updatePlayer,
  updateSource,
  updateDetails,
} from '../common/playerSlice';
import styles from './Mixtapes.css';

export default function Mixtapes() {
  const dispatch = useDispatch();
  const [mixtapes, setMixtapes] = useState([]);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/mixtapes')
        .then((res) => setMixtapes(res.data.results));
    fetchData();
  }, []);

  type Mixtape = {
    title: string;
    subtitle: string;
    mixtape_alias: string;
    media: { picture_large: string; picture_small: string };
    audio_stream_endpoint: string;
  };

  const mixtapeComponents = mixtapes.map((mixtape: Mixtape) => {
    return (
      <button
        type="button"
        key={mixtape.mixtape_alias}
        className={styles.mixtape__item}
        style={{
          backgroundImage: `url(
        ${mixtape.media.picture_large}
      )`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={() => {
          dispatch(updatePlayer('mixtape'));
          dispatch(updateSource(mixtape.audio_stream_endpoint));
          dispatch(
            updateDetails({
              title: mixtape.title,
              subtitle: mixtape.subtitle,
              picture: mixtape.media.picture_small,
            })
          );
          dispatch(play());
        }}
      >
        <div className={styles.overlay} />
        <div className={styles.mixtape__title}>{mixtape.title}</div>
      </button>
    );
  });

  return (
    <div className={styles.mixtapes__container}>
      <div className={styles.mixtapes__header}>
        <h4>Mixtapes</h4>
      </div>
      {mixtapeComponents}
    </div>
  );
}
