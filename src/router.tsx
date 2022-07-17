import { Navigate, Route, Routes } from 'react-router-dom';
import Table from './features/table/Table';
import Wallet from './features/wallet/Wallet';
import Coin from './features/coin/Coin';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0 0.5rem 0;
`;

export default function Router() {
  return (
    <Body>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/coin/:id" element={<Coin />} />
        <Route path="/wallet" element={<Wallet />} />

        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </Body>
  );
}
