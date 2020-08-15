import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { currentPlayer } from './playerSlice';
import ChannelPlayer from '../radio/Player';
import MixtapePlayer from '../mixtapes/MixtapePlayer';
import MixcloudPlayer from '../mixcloud/MixcloudPlayer';

interface Source {
  [index: string]: ReactNode;
}

const player: Source = {
  channel: <ChannelPlayer />,
  mixtape: <MixtapePlayer />,
  mixcloud: <MixcloudPlayer />,
};

export default function Player() {
  return <div>{player[useSelector(currentPlayer)]}</div>;
}
