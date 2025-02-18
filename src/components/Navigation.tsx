import { Link } from "react-router";
import useWallet from "../hooks/useWallet";
import { formatCurrency } from "../utils/utils";

export default function Navigation() {
    const { balance } = useWallet();

    return (
        <nav>
            {/* Nav Links */}
            <div>
                <Link to="/">Home</Link>
                <Link to="/history">History</Link>
                <Link to="/stats">Statistics</Link>
            </div>

            {/* Balance */}
            <div>{formatCurrency(balance)}</div>
        </nav>
    );
}
