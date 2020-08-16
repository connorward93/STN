import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { currentPlayer } from './playerSlice';
import RadioPlayer from '../radio/RadioPlayer';
import MixtapePlayer from '../mixtapes/MixtapePlayer';
import MixcloudPlayer from '../mixcloud/MixcloudPlayer';

interface Source {
  [index: string]: ReactNode;
}

const player: Source = {
  channel: <RadioPlayer />,
  mixtape: <MixtapePlayer />,
  mixcloud: <MixcloudPlayer />,
};

export default function Player() {
  const current = useSelector(currentPlayer);
  return <div>{current && player[current]}</div>;
}
