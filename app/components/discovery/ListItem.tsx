import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  play,
  updatePlayer,
  updateSource,
  updateDetails,
} from '../common/playerSlice';
import styles from './Discovery.css';

type Props = {
  data: {
    name: string;
    location_long: string;
    broadcast: string;
    media: { background_medium_large: string };
    genres: [{ id: string; value: string }];
    mixcloud: string;
  };
};

export default function ListItem(props: Props) {
  const { data } = props;
  const dispatch = useDispatch();
  return (
    <div className={styles.mix__container}>
      <div
        className={styles.mix__thumbnail}
        style={{
          backgroundImage: `url(
                ${data.media.background_medium_large}
              )`,
          backgroundSize: 'cover',
        }}
      >
        <button
          type="button"
          className={styles.mix__button}
          onClick={() => {
            dispatch(updateSource(data.mixcloud));
            dispatch(
              updateDetails({
                title: data.name,
                subtitle: data.location_long,
                picture: data.media.background_medium_large,
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
        <h6>{data.location_long}</h6>
        <h5>{data.name}</h5>
        <span className={styles.mix__date}>
          {moment(data.broadcast).format('DD.MM.YYYY')}
        </span>
        <div className={styles.mix__genre__container}>
          {data.genres.map((genre) => {
            return (
              <Link to={`/search/?q=${genre.value}`} key={genre.id}>
                <span className={styles.mix__genre}>{genre.value}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
