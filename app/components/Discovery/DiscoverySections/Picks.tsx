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

export default function Latest() {
  const [picks, setPicks] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(12);

  const fetchData = useCallback(
    (n: number) =>
      axios
        .get(`https://www.nts.live/api/v2/collections/nts-picks/?offset=${n}`)
        .then((res) => {
          return setPicks([...picks, ...res.data.results]);
        })
        .then(() => setLoading(false)),
    [picks]
  );

  useEffect(() => {
    fetchData(0);
  }, []);

  const picksComponents = picks.map((pick: Props) => {
    return <ListItem key={pick.name} data={pick} />;
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.transition}>{picksComponents}</div>
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
