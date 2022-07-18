import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { fetchCoinChartData } from './coinSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../Spinner';

export default function Coin() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const coinChartData = useAppSelector((state) => state.coin.data);
  const isLoading = useAppSelector((state) => state.coin.loading);
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

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
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: 768,
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 540,
            },
          },
        },
        {
          breakpoint: 540,
          options: {
            chart: {
              width: 380,
            },
          },
        },
      ],
      chart: {
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value.toString().slice(0, 8)} USD`,

          style: {
            colors: isDarkTheme ? 'rgba(255,255,255, .6)' : '#000',
          },
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        borderColor: isDarkTheme ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)',
      },
      tooltip: {
        enabled: false,
      },
    };
    return <Chart width={1024} type="candlestick" series={series} options={options} />;
  }

  return isLoading ? <Spinner /> : renderChart();
}
