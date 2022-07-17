import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export default function Coin() {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);

  async function fetchCoin() {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=1`);
    setChartData(data);
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  function renderChart() {
    const series = [
      {
        data: chartData.map((item: any) => {
          return {
            x: item[0],
            y: [item[1], item[2], item[3], item[4]],
          };
        }),
      },
    ];
    return (
      <Chart
        height={350}
        type="candlestick"
        series={series}
        options={{
          chart: {
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            type: 'datetime',
          },
          grid: {
            xaxis: {
              lines: {
                show: true,
              },
            },
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
        }}
      />
    );
  }

  return (
    <>
      <Link to="/">Go Back</Link>
      <h1>Coin Page and {id}</h1>
      {chartData.length > 0 && renderChart()}
    </>
  );
}
