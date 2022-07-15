import { fetchTableData } from './tableSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';

export default function Table() {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.table.data);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

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
            <th>#</th>
            <th>Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h Volume</th>
            <th>Mkt Cap</th>
            {/* <th>Last 7 days</th> */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.market_cap_rank}</td>
              <td>
                <img src={item.image} alt={item.name} width="30" height="30" />
                {item.name}
              </td>
              <td>{item.symbol.toUpperCase()}</td>
              <td>{formatDollar(item.current_price)}</td>
              <td>{formatDollar(item.total_volume)}</td>
              <td>{formatDollar(item.market_cap)}</td>
              {/* <td>{item.percentChange7d}</td> */}
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
    </div>
  );
}
