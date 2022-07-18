import { useCallback, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import {
  BalanceText,
  BalanceEye,
  MetamaskFoxComponent,
  ConnectButton,
  MetamaskText,
  WalletComponent,
  CopyWalletAddress,
  MetamaskContainer,
  AdressText,
} from './WalletStyle';
import Spinner from '../Spinner';
import { fetchNetworkData, fetchWalletData } from './walletSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const { ethereum } = window;

export default function Wallet() {
  const dispatch = useAppDispatch();

  const { address, balance, isConnected } = useAppSelector((state) => state.user.wallet);
  const networkName = useAppSelector((state) => state.user.network.name);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const [showBalance, setShowBalance] = useState(false);

  const getAccount = useCallback(async () => {
    if (ethereum === undefined) {
      alert('Please install MetaMask');
      window.open('https://metamask.io/', '_blank');
      return;
    }
    try {
      dispatch(fetchNetworkData());
      dispatch(fetchWalletData());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  if (ethereum !== undefined) {
    ethereum.on('accountsChanged', async () => {
      dispatch(fetchWalletData());
    });

    ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isConnected ? (
        <WalletComponent>
          <h3>{networkName} Network</h3>
          <AdressText>
            <MetamaskFoxComponent size="small" />
            {address ? `${address.slice(0, 5)}...${address.slice(34)}` : '0x0'}
            <CopyWalletAddress onClick={() => navigator.clipboard.writeText(address)} />
          </AdressText>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <BalanceText>
              <span>Total Balance</span> {showBalance ? balance.toString() : '٭٭٭٭٭٭'}
            </BalanceText>
            <BalanceEye onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <AiFillEyeInvisible /> : <AiFillEye />}
            </BalanceEye>
          </div>
        </WalletComponent>
      ) : (
        <MetamaskContainer>
          <MetamaskFoxComponent />
          <MetamaskText />
          <ConnectButton onClick={getAccount}>Connect Wallet</ConnectButton>
        </MetamaskContainer>
      )}
    </>
  );
}
