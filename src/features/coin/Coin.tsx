import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

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
      <ReactApexChart
        height={350}
        type="candlestick"
        series={series}
        options={{
          xaxis: {
            type: 'datetime',
            tickPlacement: 'between',
          },
          yaxis: {
            opposite: true,
          },
          title: {
            text: 'Coin Price',
            align: 'left',
          },
          chart: {
            toolbar: {
              show: false,
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
