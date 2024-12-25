import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

export interface BalanceState {
  transaction: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransaction: () => void;
}

export const useBalanceStore = create<BalanceState>()(
  persist((set, get) => ({
    transaction: [],
    runTransaction: (transaction: Transaction) => {
      set((state) => ({ transaction: [...state.transaction, transaction] }));
    },
    balance: () =>
      get().transaction.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      ),
    clearTransaction: () => {
      set({ transaction: [] });
    },
  }),
  {
    name: "balance",
    storage: createJSONStorage(() =>zustandStorage)
  }
)
);
