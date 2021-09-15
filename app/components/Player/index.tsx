import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { currentPlayer } from '../../state/playerSlice';
import RadioPlayer from '../Radio/RadioPlayer';
import MixtapePlayer from '../Mixtapes/MixtapePlayer';
import MixcloudPlayer from '../Mixcloud/MixcloudPlayer';

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
