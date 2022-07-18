import styled from 'styled-components';
import theme from 'styled-theming';

const TableCover = styled.table`
  max-width: calc(100vw - 5rem);
  width: 920px;
  font-size: 0.8rem;
  border-collapse: collapse;
  border: 1px solid
    ${theme('theme', {
      light: 'rgba(0, 0, 0, 0.2)',
      dark: 'rgba(255, 255, 255, 0.2)',
    })};
  text-align: left;

  @media (min-width: 1024px) {
    width: 1200px;
    font-size: 1rem;
  }
`;

const TableRow = styled.tr`
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: ${theme('theme', {
    light: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(255, 255, 255, 0.2)',
  })};

  &:hover {
    background-color: ${theme('theme', {
      light: 'rgba(0, 0, 0, 0.05)',
      dark: 'rgba(255, 255, 255, 0.05)',
    })};
    transition: background-color 0.2s ease-in-out;
  }
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }

  td {
    padding: 1rem 2rem;
    margin: 1rem;
    cursor: pointer;
    height: 0.7rem;

    @media (min-width: 1024px) {
      height: 1rem;
    }

    @media (max-width: 600px) {
      padding: 0.5rem 1rem;
    }

    @media (max-width: 445px) {
      padding: 0.5rem 0.4rem;
    }
  }

  th {
    color: ${theme('theme', {
      light: 'rgba(0, 0, 0, 0.8)',
      dark: 'rgba(255, 255, 255, 0.8)',
    })};
    padding: 1rem 2rem;
    cursor: pointer;
    border-bottom: 1px solid
      ${theme('theme', {
        light: 'rgba(0, 0, 0, 0.2)',
        dark: 'rgba(255, 255, 255, 0.2)',
      })};

    &:not(:last-child):hover::after {
      content: '▼';
      position: absolute;
      margin: 0.5rem 0 0 0.2rem;
      font-size: 0.5rem;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  button {
    cursor: pointer;
    background: none;
    color: ${theme('theme', {
      light: 'rgba(0, 0, 0, 0.5)',
      dark: 'rgba(255, 255, 255, 0.5)',
    })};
    border: 1px solid
      ${theme('theme', {
        light: 'rgba(0, 0, 0, 0.2)',
        dark: 'rgba(255, 255, 255, 0.2)',
      })};
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;

    &:hover:not(:disabled) {
      background-color: ${theme('theme', {
        light: 'rgba(0, 0, 0, 0.05)',
        dark: 'rgba(255, 255, 255, 0.05)',
      })};
      transition: background-color 0.2s ease-in-out;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const HomeScreen = styled.div`
  animation: fadein 1s;
  height: calc(100vh - 5.8rem);
  max-width: calc(100vw - 5rem);
`;

export { TableCover, TableRow, ButtonsContainer, HomeScreen };
