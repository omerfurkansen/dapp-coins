import { Route, Routes } from 'react-router-dom';
import Table from './features/table/Table';
import Wallet from './features/wallet/Wallet';
import Coin from './features/coin/Coin';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/coin/:id" element={<Coin />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </>
  );
}
