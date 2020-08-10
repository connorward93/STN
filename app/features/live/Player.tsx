/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { playing, currentlyPlaying } from './channelSlice';

export default function Player() {
  const audio = useRef() as MutableRefObject<HTMLAudioElement>;
  const state = useSelector(playing);
  const current = useSelector(currentlyPlaying);

  useEffect(() => {
    if (state === true) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  });

  interface Source {
    [index: string]: string;
  }

  const src: Source = {
    '1': 'https://stream-relay-geo.ntslive.net/stream',
    '2': 'https://stream-relay-geo.ntslive.net/stream2',
  };

  return (
    <>
      <audio preload="none" ref={audio} src={src[`${current}`]} />
    </>
  );
}
