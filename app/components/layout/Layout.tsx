import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './Layout.css';
import Player from '../live/Player';

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  const [isMenuOpen, toggleMenu] = useState(false);
  const { children } = props;
  return (
    <>
      <Player />
      <div
        className={
          isMenuOpen ? `${styles.nav} ${styles.collapsed}` : styles.nav
        }
      >
        <Link to="/">Live</Link>
        <Link to="/discovery/picks">Discovery</Link>
        <Link to="/">Search</Link>
        <Link to="/">Mixtapes</Link>
      </div>
      {isMenuOpen && <div className={styles.overlay} />}

      <button
        type="button"
        className={styles.menu__button}
        onClick={() => toggleMenu(!isMenuOpen)}
      >
        <div
          className={
            isMenuOpen ? `${styles.nav__icon} ${styles.open}` : styles.nav__icon
          }
        >
          <span />
          <span />
          <span />
          <span />
        </div>
      </button>

      {children}
    </>
  );
}
