import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { chainIdClient as httpClient } from '../../client/httpClient';

const { ethereum } = window;
const provider = ethereum === undefined ? ethers.getDefaultProvider() : new ethers.providers.Web3Provider(ethereum);

const initialState = {
  wallet: {
    balance: '0',
    address: '',
    isConnected: false,
  },
  network: {
    name: '',
  },
  data: {
    networkName: '',
  },
  isLoading: false,
};

export const fetchNetworkData = createAsyncThunk('network/fetchNetworkData', async () => {
  const result = await httpClient.get('/chains.json');
  const { chainId: chainIdFromNetwork } = await provider.getNetwork();
  const chainId = result.data.find((chain: any) => chain.networkId === chainIdFromNetwork);
  return chainId;
});

export const fetchWalletData = createAsyncThunk('wallet/fetchWalletData', async () => {
  const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
  const balanceInWei = await provider.getBalance(account);
  const balanceInEther = Number(ethers.utils.formatEther(balanceInWei)).toFixed(4);
  return {
    balance: balanceInEther,
    address: account,
    isConnected: true,
  };
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action) => {
      state.wallet.balance = action.payload.balance;
      state.wallet.address = action.payload.address;
      state.wallet.isConnected = action.payload.isConnected;
    },
    setNetwork: (state, action) => {
      state.network.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNetworkData.fulfilled, (state, action) => {
        state.network.name = action.payload.name;
      })
      .addCase(fetchWalletData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallet.balance = action.payload.balance;
        state.wallet.address = action.payload.address;
        state.wallet.isConnected = action.payload.isConnected;
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setWallet, setNetwork } = walletSlice.actions;

export default walletSlice.reducer;
