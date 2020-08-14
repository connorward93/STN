/* eslint-disable react/no-danger */
import React from 'react';
import moment from 'moment';
import styles from '../discovery/Discovery.css';

type Props = {
  data: {
    title: string;
    broadcast: string;
    image: { medium_large: string };
    description: { highlight_html: string };
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
                ${data.image.medium_large}
              )`,
          backgroundSize: 'cover',
        }}
      />
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
