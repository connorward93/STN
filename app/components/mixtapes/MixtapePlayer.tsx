import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import {
  play,
  pause,
  playing,
  currentSource,
  currentDetails,
} from '../common/playerSlice';
import styles from './Mixtapes.css';

export default function MixtapePlayer() {
  const { title, subtitle, picture } = useSelector(currentDetails);
  const dispatch = useDispatch();
  const sub = subtitle.length >= 50 ? `${subtitle.substr(0, 48)}...` : subtitle;
  return (
    <div className={styles.player__container}>
      <ReactPlayer
        width="0"
        url={useSelector(currentSource)}
        config={{ file: { forceAudio: true } }}
        playing={useSelector(playing)}
      />
      <div
        className={styles.player__thumb}
        style={{
          backgroundImage: `url(
        ${picture}
      )`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.overlay}>
          {useSelector(playing) ? (
            <button
              type="button"
              className={styles.player__button}
              onClick={() => dispatch(pause())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 6h12v12H6z" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className={styles.player__button}
              onClick={() => dispatch(play())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.player__button}
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className={styles.player__details}>
        <h6>{title}</h6>
        <span>{sub}</span>
      </div>
    </div>
  );
}
