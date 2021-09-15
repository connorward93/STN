import React, { ReactNode } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentPlayer } from '../../state/playerSlice';
import Latest from './DiscoverySections/Latest';
import Picks from './DiscoverySections/Picks';
import Guests from './DiscoverySections/Guests';
import Genres from './DiscoverySections/Genres';
import styles from './discovery.module.css';

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
      className={`${styles.container} ${
        useSelector(currentPlayer) && styles['active-player']
      }`}
    >
      <div className={styles.header}>
        <h4>Discovery</h4>
      </div>
      <nav className={styles.nav}>
        <Link to="/discovery/picks">Picks</Link>
        <Link to="/discovery/latest">Latest</Link>

        <Link to="/discovery/guests">Guests</Link>
        <Link to="/discovery/genres">Genres</Link>
      </nav>
      {components[id]}
    </div>
  );
}
