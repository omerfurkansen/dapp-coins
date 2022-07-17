import { fetchTableData, setTableData } from './tableSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';

export default function Table() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.table.data);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState<{
    column: 'market_cap_rank' | 'name' | 'current_price' | 'total_volume' | 'market_cap';
    isAscending: boolean;
  }>({ column: 'market_cap_rank', isAscending: true });

  function renderLineChart(coin: any) {
    const { price } = coin.sparkline_in_7d;
    const options = {
      tooltip: {
        enabled: false,
      },
      stroke: {
        width: 0.5,
      },
      chart: {
        sparkline: {
          enabled: true,
        },
        animations: {
          enabled: false,
        },
      },
      colors: [price[0] > price[price.length - 1] ? '#ff0000' : '#006400'],
    };
    return <Chart width={150} options={options} series={[{ data: price }]} type="line" />;
  }

  const changeSorting = useCallback(
    (
      isAscending: boolean = false,
      value: 'market_cap_rank' | 'name' | 'current_price' | 'total_volume' | 'market_cap'
    ) => {
      if (isAscending)
        dispatch(
          setTableData(
            [...tableData].sort((a, b) => {
              if (typeof a[value] === 'string' && typeof b[value] === 'string')
                return (a[value] as string).localeCompare(b[value] as string);
              return (a[value] as number) - (b[value] as number);
            })
          )
        );
      else
        dispatch(
          setTableData(
            [...tableData].sort((a, b) => {
              if (typeof a[value] === 'string' && typeof b[value] === 'string')
                return (b[value] as string).localeCompare(a[value] as string);
              return (b[value] as number) - (a[value] as number);
            })
          )
        );
    },
    [tableData, dispatch]
  );

  useEffect(() => {
    dispatch(fetchTableData(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    changeSorting(sortBy.isAscending, sortBy.column);
  }, [sortBy]);

  function formatDollar(value: number, maxSignificantDigits = 12) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: maxSignificantDigits,
    }).format(value);
  }

  function renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <th
              onClick={() =>
                setSortBy({
                  column: 'market_cap_rank',
                  isAscending: sortBy.column !== 'market_cap_rank' ? false : !sortBy.isAscending,
                })
              }
            >
              #
            </th>
            <th
              onClick={() =>
                setSortBy({ column: 'name', isAscending: sortBy.column !== 'name' ? false : !sortBy.isAscending })
              }
            >
              Coin
            </th>
            <th></th>
            <th
              onClick={() =>
                setSortBy({
                  column: 'current_price',
                  isAscending: sortBy.column !== 'current_price' ? false : !sortBy.isAscending,
                })
              }
            >
              Price
            </th>
            <th
              onClick={() =>
                setSortBy({
                  column: 'total_volume',
                  isAscending: sortBy.column !== 'total_volume' ? false : !sortBy.isAscending,
                })
              }
            >
              24h Volume
            </th>
            <th
              onClick={() =>
                setSortBy({
                  column: 'market_cap',
                  isAscending: sortBy.column !== 'market_cap' ? false : !sortBy.isAscending,
                })
              }
            >
              Mkt Cap
            </th>
            <th>Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} onClick={() => navigate(`/coin/${item.id}`)}>
              <td>{item.market_cap_rank}</td>
              <td>
                <img src={item.image} alt={item.name} width="30" height="30" />
                {item.name}
              </td>
              <td>{item.symbol.toUpperCase()}</td>
              <td>{formatDollar(item.current_price)}</td>
              <td>{formatDollar(item.total_volume)}</td>
              <td>{formatDollar(item.market_cap)}</td>
              <td>{renderLineChart(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h1>Table</h1>
      {tableData.length > 0 ? renderTable() : <p>Loading...</p>}
      <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
        Previous
      </button>
      <button onClick={() => setPageNumber(pageNumber + 1)} disabled={tableData.length === 0}>
        Next
      </button>
    </div>
  );
}
