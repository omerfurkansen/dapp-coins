import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Coin() {
  const { id } = useParams();
  const [chartData, setChartData] = useState({});

  async function fetchCoin() {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=1`);
    console.log(data);
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <>
      <Link to="/">Go Back</Link>
      <h1>Coin Page and {id}</h1>
    </>
  );
}
