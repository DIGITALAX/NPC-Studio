import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface WalletConnectedState {
  connected: boolean;
}

const initialWalletConnectedState: WalletConnectedState = {
  connected: false,
};

export const walletConnectedSlice = createSlice({
  name: "walletConnected",
  initialState: initialWalletConnectedState,
  reducers: {
    setWalletConnected: (
      state: WalletConnectedState,
      action: PayloadAction<boolean>
    ) => {
      state.connected = action.payload;
    },
  },
});

export const { setWalletConnected } = walletConnectedSlice.actions;

export default walletConnectedSlice.reducer;
