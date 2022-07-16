import { Link } from 'react-router-dom';
import { IoMdHome, IoMdWallet } from 'react-icons/io';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">
            <IoMdHome />
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/wallet">
            <IoMdWallet />
            Wallet
          </Link>
        </li>
      </ul>
    </nav>
  );
}
