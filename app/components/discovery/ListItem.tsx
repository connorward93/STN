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
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" />
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
