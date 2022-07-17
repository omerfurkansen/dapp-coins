import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import { chainIdClient as httpClient } from '../../client/httpClient';
import { ReactComponent as MetamaskFox } from '../../assets/MetaMask_Fox.svg';
import MetamaskText from '../../assets/MetamaskText';
import styled from 'styled-components';

const MetamaskFoxComponent = styled(MetamaskFox)`
  width: 30%;
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

  ethereum.on('accountsChanged', (accounts: any) => {
    const [account] = accounts;
    setWalletAddress(account);
  });

  ethereum.on('networkChanged', () => {
    window.location.reload();
  });

  return (
    <>
      {isUserConnected ? (
        <>
          <h3>Network Name: {network}</h3>
          <h3>
            Address: {walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(34)}` : '0x0'}
            <MdContentCopy onClick={() => navigator.clipboard.writeText(walletAddress)} />
          </h3>
          <h3 style={{ display: 'flex', justifyContent: 'space-between', width: 200 }}>
            Balance: {showBalance ? walletBalance.toString() : '******'}
            <div onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </h3>
        </>
      ) : (
        <>
          <MetamaskFoxComponent />
          <MetamaskText />
          <ConnectButton onClick={getAccount}>Connect Wallet</ConnectButton>
        </>
      )}
    </>
  );
}
