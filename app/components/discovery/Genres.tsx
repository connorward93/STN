import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../common/Loading';
import styles from './Discovery.css';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/genres')
        .then((res) => setGenres(res.data.results))
        .then(() => setLoading(false));
    fetchData();
  }, []);

  type Genre = {
    subgenres: [{ id: string; name: string }];
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        genres.map((genre: Genre) =>
          genre.subgenres.map((sub) => {
            return (
              <li key={sub.id} className={styles.genre}>
                <Link to={`/search/?q=${sub.name}`}>{sub.name}</Link>
              </li>
            );
          })
        )
      )}
    </div>
  );
}
