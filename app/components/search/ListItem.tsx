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
      </div>
      <div className={styles.mix__description}>
        <h6>{data.title}</h6>
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
