import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Navbar from './features/navbar/Navbar';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from 'styled-theming';
import { useAppSelector } from './app/hooks';

const GlobalStyle = createGlobalStyle<{ isPageLoaded: boolean }>`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    height: 100vh;
    background-color: ${theme('theme', {
      light: '#fff',
      dark: '#121212',
    })};
    color: ${theme('theme', {
      light: '#000',
      dark: 'rgba(255, 255, 255, 0.6)',
    })};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${({ isPageLoaded }) =>
      isPageLoaded &&
      `
      transition: all 0.3s ease-in-out;
      `}
  }
  a {
    color: ${theme('theme', {
      light: '#000',
      dark: 'rgba(255, 255, 255, 0.8)',
    })};
    text-decoration: none;
  }
`;

function App() {
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
  const isPageLoaded = useAppSelector((state) => state.theme.isPageLoaded);

  return (
    <BrowserRouter>
      <ThemeProvider theme={{ theme: isDarkTheme ? 'dark' : 'light' }}>
        <GlobalStyle isPageLoaded={isPageLoaded} />
        <Navbar />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
