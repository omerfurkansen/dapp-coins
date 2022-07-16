import { Route, Routes } from 'react-router-dom';
import Table from './features/table/Table';
import Wallet from './features/wallet/Wallet';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </>
  );
}
