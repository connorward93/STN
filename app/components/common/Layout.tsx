import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.css';
import Player from './Player';

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
        <Link to="/" onClick={() => toggleMenu(!isMenuOpen)}>
          Live
        </Link>
        <Link to="/discovery/picks" onClick={() => toggleMenu(!isMenuOpen)}>
          Discovery
        </Link>
        <Link to="/search/?q=" onClick={() => toggleMenu(!isMenuOpen)}>
          Search
        </Link>
        <Link to="/mixtapes/" onClick={() => toggleMenu(!isMenuOpen)}>
          Mixtapes
        </Link>
      </div>
      {isMenuOpen && <div className={styles.overlay} />}

      <button
        type="button"
        onClick={() => toggleMenu(!isMenuOpen)}
        className={styles.menu__button}
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
