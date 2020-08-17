/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import Loading from '../common/Loading';
import styles from './Discovery.css';

type Props = {
  name: string;
  location_long: string;
  broadcast: string;
  media: { background_medium_large: string };
  genres: [{ id: string; value: string }];
  mixcloud: string;
};

export default function Picks() {
  const [recentlyAdded, setRecentlyAdded] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(12);

  const fetchData = useCallback(
    (n: number) =>
      axios
        .get(
          `https://www.nts.live/api/v2/collections/recently-added/?offset=${n}`
        )
        .then((res) => {
          return setRecentlyAdded([...recentlyAdded, ...res.data.results]);
        })
        .then(() => setLoading(false)),
    [recentlyAdded]
  );

  useEffect(() => {
    fetchData(0);
  }, []);

  const recentlyAddedComponents = recentlyAdded.map((recent: Props) => {
    return <ListItem key={recent.name} data={recent} />;
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.discovery__transition}>
            {recentlyAddedComponents}
          </div>
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
