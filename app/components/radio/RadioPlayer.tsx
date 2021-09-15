/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, MutableRefObject, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  play,
  pause,
  playing,
  currentSource,
  currentDetails,
} from '../../state/playerSlice';
import styles from './radio-player.module.css';

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
    <div className={styles.container}>
      <>
        <audio
          onPause={() => dispatch(pause())}
          onPlay={() => dispatch(play())}
          preload="none"
          ref={audio}
          src={src[`${current}`]}
        />
      </>
      <div
        className={styles.thumb}
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
              className={styles.button}
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
              className={styles.button}
              onClick={() => dispatch(play())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.button}
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
      <div className={styles.details}>
        <h6 dangerouslySetInnerHTML={{ __html: title }} />
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
