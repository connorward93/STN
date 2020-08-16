import React from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { playing, currentSource } from '../common/playerSlice';
import styles from './Mixcloud.css';

export default function MixcloudPlayer() {
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
    </div>
  );
}
