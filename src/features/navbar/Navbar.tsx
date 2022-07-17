import { IoIosArrowRoundBack, IoMdHome, IoMdWallet } from 'react-icons/io';
import { GoBackLink, NavbarContainer, NavbarLink, ThemeSwitcher } from './NavbarStyle';
import { useAppDispatch } from '../../app/hooks';
import { toggleTheme } from '../theme/themeSlice';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  const isWalletPage = pathname.slice(1) === 'wallet';
  const isCoinPage = useLocation().pathname.includes('coin');

  const dispatch = useAppDispatch();

  return (
    <NavbarContainer>
      <GoBackLink to="/" style={{ display: !isCoinPage ? 'none' : 'flex' }}>
        <IoIosArrowRoundBack />
        Back
      </GoBackLink>
      <div style={{ display: isCoinPage ? 'none' : 'flex' }}>
        <NavbarLink to="/" id="home" className={!isWalletPage ? 'active' : ''}>
          <IoMdHome />
          Home
        </NavbarLink>
        <NavbarLink to="/wallet" id="wallet" className={isWalletPage ? 'active' : ''}>
          <IoMdWallet />
          Wallet
        </NavbarLink>
      </div>
      <ThemeSwitcher onClick={() => dispatch(toggleTheme())} />
    </NavbarContainer>
  );
}
