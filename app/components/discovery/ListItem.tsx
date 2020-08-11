import React from 'react';
import moment from 'moment';
import styles from './Discovery.css';

type Props = {
  data: {
    name: string;
    location_long: string;
    broadcast: string;
    media: { background_medium_large: string };
    genres: [{ id: string; value: string }];
  };
};

export default function ListItem(props: Props) {
  const { data } = props;
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
      />
      <div className={styles.mix__description}>
        <h6>{data.location_long}</h6>
        <h5>{data.name}</h5>
        <span className={styles.mix__date}>
          {moment(data.broadcast).format('DD.MM.YYYY')}
        </span>
        <div className={styles.mix__genre__container}>
          {data.genres.map((genre) => {
            return (
              <span key={genre.id} className={styles.mix__genre}>
                {genre.value}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
