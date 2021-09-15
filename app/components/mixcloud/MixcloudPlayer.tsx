import React from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { playing, currentSource } from '../../state/playerSlice';
import styles from './mixcloud.module.css';

export default function MixcloudPlayer() {
  return (
    <div className={styles.container}>
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
