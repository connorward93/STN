/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ListItem from '../DiscoveryItem';
import Loading from '../../Base/Loading';
import styles from '../discovery.module.css';

type Props = {
  name: string;
  location_long: string;
  broadcast: string;
  media: { background_medium_large: string };
  genres: [{ id: string; value: string }];
  mixcloud: string;
};

export default function Guests() {
  const [guests, setGuests] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(12);

  const fetchData = useCallback(
    (n: number) =>
      axios
        .get(`https://www.nts.live/api/v2/shows/guests/?offset=${n}`)
        .then((res) => {
          return setGuests([...guests, ...res.data.embeds.episodes.results]);
        })
        .then(() => setLoading(false)),
    [guests]
  );

  useEffect(() => {
    fetchData(0);
  }, []);

  const guestsComponents = guests.map((guest: Props) => {
    return <ListItem key={guest.name} data={guest} />;
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.transition}>{guestsComponents}</div>
          <button
            type="button"
            className={styles.load__more}
            onClick={() => {
              setOffset(offset + 12);
              fetchData(offset);
            }}
          >
            More
          </button>
        </>
      )}
    </>
  );
}
