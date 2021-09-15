import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Base/Loading';
import ListItem from './SearchItem';
import styles from './search.module.css';

export default function Search() {
  const param = new URLSearchParams(useLocation().search).get('q');
  const [searchQuery, setSearchQuery] = useState('');
  const [defaultResults, setDefaultResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    (query) =>
      axios
        .get(
          `https://www.nts.live/api/v2/search?limit=36&q=${query}&types%5B%5D=episode&version=2`
        )
        .then((res) => {
          return (
            setSearchResults(res.data.results),
            setDefaultResults(res.data.metadata.popular_terms)
          );
        })
        .then(() => setLoading(false)),
    []
  );

  useEffect(() => {
    fetchData(param);
  }, [fetchData, param]);

  type Results = {
    title: string;
    broadcast: string;
    article: { path: string };
    image: { medium_large: string };
    description: { highlight_html: string };
    audio: { url: string };
  };

  const defaultComponents = defaultResults.map((result) => {
    return (
      <li key={result} className={styles.genre}>
        <Link to={`/search/?q=${result}`}>{result}</Link>
      </li>
    );
  });

  const resultsComponents = searchResults.map((result: Results) => {
    return <ListItem key={result.article.path} data={result} />;
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h4>Search</h4>
          </div>
          <div className={styles.searchbar}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                fetchData(searchQuery);
              }}
            >
              <input
                type="search"
                placeholder="🔍 Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          {resultsComponents.length >= 1 ? (
            resultsComponents
          ) : (
            <div className={styles.defaults}>
              <h6>Recommended</h6>
              {defaultComponents}
            </div>
          )}
        </div>
      )}
    </>
  );
}
