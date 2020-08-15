import React, { ReactNode } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Latest from './Latest';
import Picks from './Picks';
// import Hosts from './Hosts';
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
    // hosts: <Hosts />,
    guests: <Guests />,
    genres: <Genres />,
  };

  return (
    <div className={styles.discovery__container}>
      <div className={styles.discovery__header}>
        <h4>Discovery</h4>
      </div>
      <nav className={styles.discovery__nav}>
        <Link to="/discovery/picks">Picks</Link>
        <Link to="/discovery/latest">Latest</Link>
        {/* <Link to="/discovery/hosts">Hosts</Link> */}
        <Link to="/discovery/guests">Guests</Link>
        <Link to="/discovery/genres">Genres</Link>
      </nav>
      {components[id]}
    </div>
  );
}
