import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function Genre() {
  const { id } = useParams();

  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get(
          `https://www.nts.live/api/v2/search?limit=36&q=${id}&types%5B%5D=show&version=2`
        )
        .then((res) => setGenre(res.data.results));
    fetchData();
  }, [id]);

  return <div>hey</div>;
}
