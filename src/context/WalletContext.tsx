import React, { createContext, useReducer } from "react";
import { Transaction, TransactionCategory } from "../data/types";

// State type
interface WalletState {
    balance: number;
    lastId: number;
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
                balance:
                    action.payload.type === "income"
                        ? state.balance + action.payload.amount
                        : state.balance - action.payload.amount,
                lastId: state.lastId + 1,
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

// Categories to number
const initCategorizedExpenses: Record<TransactionCategory, number> = {
    "Food & Beverage": 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Others: 0,
};

// Hook to use Wallet Context
const useWalletContext = (initWalletState: WalletState) => {
    const [state, dispatch] = useReducer(reducer, initWalletState);

    // Get balance
    const balance = state.balance;

    // Log new transaction
    const addTransaction = (
        amount: number,
        type: "income" | "expense",
        category: TransactionCategory = "Others"
    ) =>
        dispatch({
            type: "ADD_TRANSACTION",
            payload: {
                id: state.lastId,
                type: type,
                amount: amount,
                datetime: "",
                category: category,
            },
        });

    // Delete transaction
    const deleteTransaction = (id: number) =>
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id,
        });

    // Get accumulated expenses by category
    const accumulatedExpensesByCategory: Record<TransactionCategory, number> =
        state.transactions.reduce<Record<TransactionCategory, number>>(
            (acc, transaction) => {
                if (transaction.type === "expense") {
                    const category: TransactionCategory =
                        transaction.category ?? "Others";
                    acc[category] = (acc[category] || 0) + transaction.amount;
                }
                return acc;
            },
            initCategorizedExpenses
        );

    return {
        balance,
        addTransaction,
        deleteTransaction,
        accumulatedExpensesByCategory,
    };
};

// Create context
export type UseWalletContextType = ReturnType<typeof useWalletContext>;
const initWalletContextState: UseWalletContextType = {
    balance: 0,
    addTransaction: () => {},
    deleteTransaction: () => {},
    accumulatedExpensesByCategory: initCategorizedExpenses,
};
const WalletContext = createContext<UseWalletContextType>(
    initWalletContextState
);

// Init state
const initState: WalletState = {
    balance: 0,
    lastId: 0,
    transactions: [],
};

// Provider component
export const WalletProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode => {
    return (
        <WalletContext.Provider value={useWalletContext(initState)}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContext;
