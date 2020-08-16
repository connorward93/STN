import React, { ReactNode } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentPlayer } from '../common/playerSlice';
import Latest from './Latest';
import Picks from './Picks';
import Guests from './Guests';
import Genres from './Genres';
import styles from './Discovery.css';

export default function Discovery() {
  const { id } = useParams();

  interface Source {
    [index: string]: ReactNode;
  }

  const components: Source = {
    picks: <Picks />,
    latest: <Latest />,

    guests: <Guests />,
    genres: <Genres />,
  };

  return (
    <div
      className={`${styles.discovery__container} ${
        useSelector(currentPlayer) && styles.active__player
      }`}
    >
      <div className={styles.discovery__header}>
        <h4>Discovery</h4>
      </div>
      <nav className={styles.discovery__nav}>
        <Link to="/discovery/picks">Picks</Link>
        <Link to="/discovery/latest">Latest</Link>

        <Link to="/discovery/guests">Guests</Link>
        <Link to="/discovery/genres">Genres</Link>
      </nav>
      {components[id]}
    </div>
  );
}
