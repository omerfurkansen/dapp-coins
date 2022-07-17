import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { fetchCoinChartData } from './coinSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export default function Coin() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const coinChartData = useAppSelector((state) => state.coin.data);
  const isLoading = useAppSelector((state) => state.coin.loading);

  useEffect(() => {
    dispatch(fetchCoinChartData(id));
  }, [dispatch, id]);

  function renderChart() {
    const series = [
      {
        data: coinChartData.map((item) => {
          const [x, ...y] = item;
          return {
            x,
            y,
          };
        }),
      },
    ];
    const options: ApexOptions = {
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
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
    };
    return <Chart height={350} type="candlestick" series={series} options={options} />;
  }

  return (
    <>
      <Link to="/">Go Back</Link>
      <h1>Coin Page and {id}</h1>
      {!isLoading && renderChart()}
    </>
  );
}
