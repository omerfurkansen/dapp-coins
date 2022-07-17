import { fetchTableData, setTableData } from './tableSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import Spinner from '../../assets/spinner.svg';
import { TableCover, TableRow, HomeScreen, ButtonsContainer } from './TableStyles';

interface ISortBy {
  column: 'market_cap_rank' | 'name' | 'current_price' | 'total_volume' | 'market_cap';
  isAscending: boolean;
}

export default function Table() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.table.data);
  const isLoading = useAppSelector((state) => state.table.loading);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState<ISortBy>({ column: 'market_cap_rank', isAscending: false });

  function renderLineChart(price: number[]) {
    const options = {
      tooltip: {
        enabled: false,
      },
      stroke: {
        width: 1,
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
    return <Chart height={40} width={100} options={options} series={[{ data: price }]} type="line" />;
  }

  const changeSorting = useCallback(
    (
      isAscending: boolean = false,
      value: 'market_cap_rank' | 'name' | 'current_price' | 'total_volume' | 'market_cap'
    ) => {
      dispatch(
        setTableData(
          [...tableData].sort((a, b) => {
            if (typeof a[value] === 'string' && typeof b[value] === 'string')
              return isAscending
                ? (a[value] as string).localeCompare(b[value] as string)
                : (b[value] as string).localeCompare(a[value] as string);
            return isAscending
              ? (a[value] as number) - (b[value] as number)
              : (b[value] as number) - (a[value] as number);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  function formatDollar(value: number, maxSignificantDigits = 12) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: maxSignificantDigits,
    }).format(value);
  }

  function handleIsAscending(column: ISortBy['column']) {
    return sortBy.column === column && !sortBy.isAscending;
  }

  function handleSortClick(column: ISortBy['column']) {
    setSortBy({ column, isAscending: handleIsAscending(column) });
  }

  function renderTable() {
    return (
      <TableCover>
        <thead>
          <TableRow>
            <th onClick={() => handleSortClick('market_cap_rank')}>#</th>
            <th onClick={() => handleSortClick('name')}>Coin</th>
            <th onClick={() => handleSortClick('current_price')}>Price</th>
            <th onClick={() => handleSortClick('total_volume')}>24h Volume</th>
            <th onClick={() => handleSortClick('market_cap')}>Mkt Cap</th>
            <th>Last 7 days</th>
          </TableRow>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <TableRow key={index} onClick={() => navigate(`/coin/${item.id}`)}>
              <td>{item.market_cap_rank}</td>
              <td
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width="24"
                    height="24"
                    style={{ marginLeft: '-1rem', marginRight: '1rem' }}
                  />
                  {item.name}
                </span>
                <span style={{ marginLeft: '1rem' }}>{item.symbol.toUpperCase()}</span>
              </td>
              <td>{formatDollar(item.current_price)}</td>
              <td>{formatDollar(item.total_volume)}</td>
              <td>{formatDollar(item.market_cap)}</td>
              <td>{renderLineChart(item.sparkline_in_7d.price)}</td>
            </TableRow>
          ))}
        </tbody>
      </TableCover>
    );
  }

  return (
    <div>
      {!isLoading ? (
        <HomeScreen>
          {renderTable()}
          <ButtonsContainer>
            <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
              Previous
            </button>
            <button onClick={() => setPageNumber(pageNumber + 1)} disabled={tableData.length === 0}>
              Next
            </button>
          </ButtonsContainer>
        </HomeScreen>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <img src={Spinner} alt="loading" width="50%" />
        </div>
      )}
    </div>
  );
}
