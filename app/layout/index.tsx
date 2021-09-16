/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './layout.module.css';
import Player from '../components/Player';

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
        <div
          className={styles.overlay}
          onClick={() => toggleMenu(!isMenuOpen)}
        />
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
