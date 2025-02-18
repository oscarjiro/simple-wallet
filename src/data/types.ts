export type TransactionCategory =
    | "Food & Beverage"
    | "Transportation"
    | "Entertainment"
    | "Shopping"
    | "Others";

// Transaction type
export interface Transaction {
    id: number;
    type: "income" | "expense";
    amount: number;
    datetime: string;
    category: TransactionCategory;
}
