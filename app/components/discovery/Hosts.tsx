import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ListItem from './ListItem';
import styles from './Discovery.css';

export default function Hosts() {
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/shows/')
        .then((res) => setHosts(res.data.results));
    fetchData();
  }, []);

  type Props = {
    name: string;
    location_long: string;
    broadcast: string;
    media: { background_medium_large: string };
    genres: [{ id: string; value: string }];
  };

  const hostsComponents = hosts.map((host: Props) => {
    return <ListItem key={host.name} data={host} />;
  });

  return <div className={styles.discovery__transition}>{hostsComponents}</div>;
}
