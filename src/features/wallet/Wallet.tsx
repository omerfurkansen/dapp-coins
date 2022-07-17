import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { chainIdClient as httpClient } from '../../client/httpClient';
import {
  BalanceEye,
  MetamaskFoxComponent,
  ConnectButton,
  MetamaskText,
  WalletComponent,
  CopyWalletAddress,
  MetamaskContainer,
} from './WalletStyle';

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);

export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('0');
  const [network, setNetwork] = useState('');
  const [showBalance, setShowBalance] = useState(false);
  const [isUserConnected, setIsUserConnected] = useState(false);

  async function getChainId() {
    const { chainId: chainIdFromNetwork } = await provider.getNetwork();
    const result = await httpClient.get('/chains.json');
    const chainId = result.data.find((chain: any) => chain.networkId === chainIdFromNetwork);
    setNetwork(chainId.name);
  }

  const getAccount = useCallback(async () => {
    if (ethereum === undefined) return;
    try {
      await getChainId();

      const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(account);

      const balanceInWei = await provider.getBalance(account);
      const balanceInEther = Number(ethers.utils.formatEther(balanceInWei)).toFixed(4);
      setWalletBalance(balanceInEther);

      setIsUserConnected(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  ethereum.on('accountsChanged', async (accounts: any) => {
    const [account] = accounts;
    setWalletAddress(account);
    const balanceInWei = await provider.getBalance(account);
    const balanceInEther = Number(ethers.utils.formatEther(balanceInWei)).toFixed(4);
    setWalletBalance(balanceInEther);
  });

  ethereum.on('chainChanged', () => {
    window.location.reload();
  });

  return (
    <>
      {isUserConnected ? (
        <WalletComponent>
          <h3>{network} Network</h3>
          <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <MetamaskFoxComponent size="small" />
            {walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(34)}` : '0x0'}
            <CopyWalletAddress onClick={() => navigator.clipboard.writeText(walletAddress)} />
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: 200, height: 50 }}>
              <span>Total Balance</span> {showBalance ? walletBalance.toString() : '٭٭٭٭٭٭'}
            </h3>
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
