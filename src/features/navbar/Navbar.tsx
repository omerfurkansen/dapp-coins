import { IoMdHome, IoMdWallet } from 'react-icons/io';
import { useState } from 'react';
import { NavbarContainer, NavbarLink, ThemeSwitcher } from './NavbarStyle';
import { useAppDispatch } from '../../app/hooks';
import { toggleTheme } from '../theme/themeSlice';

export default function Navbar() {
  const [active, setActive] = useState('home');
  const handleClick = (e: any) => {
    setActive(e.target.id);
  };

  const dispatch = useAppDispatch();

  return (
    <NavbarContainer>
      <NavbarLink to="/" id="home" onClick={handleClick} className={active === 'home' ? 'active' : ''}>
        <IoMdHome />
        Home
      </NavbarLink>
      <NavbarLink to="/wallet" id="wallet" onClick={handleClick} className={active === 'wallet' ? 'active' : ''}>
        <IoMdWallet />
        Wallet
      </NavbarLink>
      <ThemeSwitcher onClick={() => dispatch(toggleTheme())} />
    </NavbarContainer>
  );
}
