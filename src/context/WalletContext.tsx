import React, { createContext, useReducer } from "react";

// Transaction Category type
type Category =
    | "Food & Beverage"
    | "Transportation"
    | "Entertainment"
    | "Shopping"
    | "Others";

// Transaction type
interface Transaction {
    id: number;
    type: "income" | "expense";
    amount: number;
    datetime: string;
    category?: Category;
}

// State type
interface WalletState {
    balance: number;
    transactions: Transaction[];
}

// Reducer actions
type Action =
    | { type: "ADD_TRANSACTION"; payload: Transaction }
    | { type: "DELETE_TRANSACTION"; payload: number };

// Reducer function
const reducer = (state: WalletState, action: Action): WalletState => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
            };
        case "DELETE_TRANSACTION":
            const transactionToDelete = state.transactions.find(
                (t) => t.id === action.payload
            );
            if (!transactionToDelete) return state;

            return {
                ...state,
                transactions: state.transactions.filter(
                    (t) => t.id !== action.payload
                ),
                balance:
                    transactionToDelete.type === "income"
                        ? state.balance - transactionToDelete.amount
                        : state.balance + transactionToDelete.amount,
            };
        default:
            return state;
    }
};

// Hook to use Wallet Context
const useWallet = (initWalletState: WalletState) => {
    const [state, dispatch] = useReducer(reducer, initWalletState);

    // Get formatted balance
    const balance = `$${state.balance.toFixed(2)}`;

    // Get

    return { dispatch, balance };
};

// Create context
type UseWalletType = ReturnType<typeof useWallet>;
export const WalletContext = createContext<UseWalletType | undefined>(
    undefined
);

// Init state
const initState: WalletState = {
    balance: 0,
    transactions: [],
};

// Provider component
export const WalletProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode => {
    return (
        <WalletContext.Provider value={useWallet(initState)}>
            {children}
        </WalletContext.Provider>
    );
};
