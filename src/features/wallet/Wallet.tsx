import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import axios from 'axios';

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);

export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('0');
  const [network, setNetwork] = useState('');
  const [showBalance, setShowBalance] = useState(false);

  async function getChainId() {
    const { chainId: chainIdFromNetwork } = await provider.getNetwork();
    const result = await axios.get('https://chainid.network/chains.json');
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
    <div className="wallet">
      <h1>Wallet</h1>
      <h3>Network Name: {network}</h3>
      <h3>
        Address: {walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(34)}` : '0x0'}{' '}
        <MdContentCopy onClick={() => navigator.clipboard.writeText(walletAddress)} />
      </h3>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', width: 200 }}>
        Balance: {showBalance ? walletBalance.toString() : '******'}
        <div onClick={() => setShowBalance(!showBalance)}>{showBalance ? <AiFillEyeInvisible /> : <AiFillEye />}</div>
      </h3>
      <button onClick={getAccount}>Connect</button>
    </div>
  );
}
