import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Navbar from './features/navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}

export default App;
