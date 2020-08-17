/* eslint-disable react/no-danger */
import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  play,
  updatePlayer,
  updateSource,
  updateDetails,
} from '../common/playerSlice';

import styles from '../discovery/Discovery.css';

type Props = {
  data: {
    title: string;
    broadcast: string;
    image: { medium_large: string };
    description: { highlight_html: string };
    audio: { url: string };
  };
};

export default function ListItem(props: Props) {
  const dispatch = useDispatch();
  const { data } = props;
  return (
    <div className={styles.mix__container}>
      <div
        className={styles.mix__thumbnail}
        style={{
          backgroundImage: `url(
                ${data.image.medium_large}
              )`,
          backgroundSize: 'cover',
        }}
      >
        <button
          type="button"
          className={styles.mix__button}
          onClick={() => {
            dispatch(updateSource(data.audio.url));
            dispatch(
              updateDetails({
                title: data.title,
                subtitle: data.broadcast,
                picture: data.image.medium_large,
              })
            );
            dispatch(updatePlayer('mixcloud'));
            dispatch(play());
          }}
        >
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <div className={styles.mix__description}>
        <h6 className={styles.mix__title}>{data.title}</h6>
        <span className={styles.mix__date}>
          {moment(data.broadcast).format('DD.MM.YYYY')}
        </span>
        <div
          className={styles.mix__html}
          dangerouslySetInnerHTML={{ __html: data.description.highlight_html }}
        />
      </div>
    </div>
  );
}
