import useWallet from "../hooks/useWallet";
import { formatCurrency } from "../utils/utils";

export default function Header() {
    const { balance, accumulatedExpensesByCategory } = useWallet();

    return <div>{formatCurrency(balance)}</div>;
}
