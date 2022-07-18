import { IoMdSunny } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styled-theming';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  position: fixed;
  backdrop-filter: blur(10px);
  height: 2rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  // tablet screen
  @media (min-width: 768px) {
    height: 2.5rem;
  }
`;

const NavbarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    box-shadow: ${theme('theme', {
      light: 'inset 0px -3px 0px rgba(0, 0, 0, 0.1)',
      dark: 'inset 0px -3px 0px rgba(255, 255, 255, 0.1)',
    })};
    transition: box-shadow 0.2s ease-in-out;
  }

  svg {
    margin-right: 0.5rem;
  }

  &.active {
    box-shadow: inset 0px -3px 0px green;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ThemeSwitcher = styled(IoMdSunny)`
  position: absolute;
  right: 2rem;
  top: 0.9rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;

  &:hover {
    fill: ${theme('theme', {
      light: 'grey',
      dark: '#fff',
    })};
    transition: fill 0.2s ease-in-out;
  }

  // tablet screen
  @media (min-width: 768px) {
    width: 24px;
    height: 24px;
    top: 1.1rem;
  }
`;

const GoBackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  left: 2rem;
  top: 0.9rem;
  z-index: 1;
  &:hover {
    color: ${theme('theme', {
      light: 'grey',
      dark: '#fff',
    })};
    transition: color 0.2s ease-in-out;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }

  // tablet screen
  @media (min-width: 768px) {
    font-size: 1.2rem;
    top: 1.1rem;
  }
`;

export { GoBackLink, NavbarContainer, NavbarLink, ThemeSwitcher };
