import styled from 'styled-components';
import theme from 'styled-theming';
import { ReactComponent as MetamaskFox } from '../../assets/MetaMask_Fox.svg';
import MetamaskText from '../../assets/MetamaskText';
import { MdContentCopy } from 'react-icons/md';

const MetamaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadein 1s;
`;

const MetamaskFoxComponent = styled(MetamaskFox)<{ size?: 'small' | 'big' }>`
  ${({ size = 'big' }) =>
    size === 'small'
      ? `
      width: 24px;
      height: 24px;
      margin-right: 8px;
    `
      : `
      width: 20%;
      height: 20%;
  `}
  object-fit: contain;
`;

const ConnectButton = styled.button`
  background-color: green;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 5px;
  padding: 0.7rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 3rem;
  &:hover {
    background-color: #00ff00;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const WalletComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: ${theme('theme', {
    light: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    dark: '0px 0px 10px rgba(255, 255, 255, 0.1)',
  })};
  margin-top: 2rem;
  animation: fadein 1s;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 1rem;
    margin-top: 0;
  }
`;

const AdressText = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BalanceText = styled.h3`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 200px;
  height: 50px;
`;

const BalanceEye = styled.div`
  cursor: pointer;
`;

const CopyWalletAddress = styled(MdContentCopy)`
  cursor: pointer;
  margin-left: 1rem;
  font-size: 1.5rem;
`;

export {
  MetamaskContainer,
  CopyWalletAddress,
  AdressText,
  BalanceText,
  BalanceEye,
  WalletComponent,
  MetamaskFoxComponent,
  ConnectButton,
  MetamaskText,
};
