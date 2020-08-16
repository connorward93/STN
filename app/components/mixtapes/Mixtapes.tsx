/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  play,
  updatePlayer,
  updateSource,
  updateDetails,
  currentPlayer,
} from '../common/playerSlice';
import Loading from '../common/Loading';
import styles from './Mixtapes.css';

export default function Mixtapes() {
  const dispatch = useDispatch();
  const [mixtapes, setMixtapes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/mixtapes')
        .then((res) => setMixtapes(res.data.results))
        .then(() => setLoading(false));
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
        <div className={styles.mixtape__title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" />
          </svg>
          {mixtape.title}
        </div>
      </button>
    );
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`${styles.mixtapes__container} ${
            currentPlayer && styles.active__player
          }`}
        >
          <div className={styles.mixtapes__header}>
            <h4>Mixtapes</h4>
          </div>
          {mixtapeComponents}
        </div>
      )}
    </>
  );
}
