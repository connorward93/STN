import React from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import {
  // play,
  // pause,
  playing,
  currentSource,
  // currentDetails,
} from '../common/playerSlice';
import styles from './Mixcloud.css';

export default function MixcloudPlayer() {
  // const { title, subtitle, picture } = useSelector(currentDetails);
  // const dispatch = useDispatch();

  return (
    <div className={styles.player__container}>
      <ReactPlayer
        width="100vw"
        className="repostable"
        url={useSelector(currentSource)}
        playing={useSelector(playing)}
        config={{
          mixcloud: {
            options: { mini: true, hide_cover: true, hide_tracklist: true },
          },
        }}
      />
      {/* <div
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
                fill="#fff"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className={styles.player__button}
              onClick={() => dispatch(play())}
            >
              <svg
                className={styles.player__button}
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 600 600"
              >
                <g transform="translate(-772 -385)">
                  <g id="Drawer" transform="translate(0 43)">
                    <g id="_x32_" transform="translate(18)">
                      <path
                        id="play"
                        d="M1260.4 651.3L882.8 861.2c-4.4 2.4-8.2 2.7-11.2 1-3.1-1.7-4.6-5.1-4.6-10.2V433.2c0-4.8 1.5-8.2 4.6-10.2 3.1-2 6.8-1.7 11.2 1l377.6 210c4.4 2.4 6.6 5.3 6.6 8.7 0 3.3-2.2 6.2-6.6 8.6z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className={styles.player__details}>
        <h6>{title}</h6>
        <span>{subtitle}</span>
      </div> */}
    </div>
  );
}
