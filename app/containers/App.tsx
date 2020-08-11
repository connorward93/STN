import React, { ReactNode } from 'react';
import Layout from '../components/layout/Layout';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return <Layout>{children}</Layout>;
}
