/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, MutableRefObject, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  play,
  pause,
  playing,
  currentSource,
  currentDetails,
} from '../common/playerSlice';
import styles from './Radio.css';

export default function RadioPlayer() {
  const dispatch = useDispatch();
  const audio = useRef() as MutableRefObject<HTMLAudioElement>;
  const state = useSelector(playing);
  const current = useSelector(currentSource);
  const { title, subtitle, picture } = useSelector(currentDetails);

  useEffect(() => {
    if (state) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  });

  interface Source {
    [index: string]: string;
  }

  const src: Source = {
    '1': 'https://stream-relay-geo.ntslive.net/stream',
    '2': 'https://stream-relay-geo.ntslive.net/stream2',
  };

  return (
    <div className={styles.player__container}>
      <>
        <audio preload="none" ref={audio} src={src[`${current}`]} />
      </>
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
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
