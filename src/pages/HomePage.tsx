import useWallet from "../hooks/useWallet";
import { formatCurrency } from "../utils/utils";
import { TransactionCategory } from "../data/types";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button,
    Box,
    Typography,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useState } from "react";

export default function HomePage() {
    const { balance, addTransaction } = useWallet();

    const categories: TransactionCategory[] = [
        "Food & Beverage",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Others",
    ];

    const [amount, setAmount] = useState<number>(1);
    const [isExpense, setIsExpense] = useState<boolean>(true);
    const [category, setCategory] = useState<TransactionCategory>(
        categories[0]
    );

    const handleSubmit = () => {
        if (amount > 0) {
            addTransaction(amount, isExpense ? "expense" : "income", category);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 8,
            }}
        >
            {/* Balance */}
            <Box textAlign="center" mb={6}>
                <Typography
                    variant="h6"
                    sx={{
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 300,
                    }}
                >
                    Balance
                </Typography>
                <Typography variant="h1" fontWeight="600">
                    {formatCurrency(balance)}
                </Typography>
            </Box>

            {/* Add Transaction Form */}
            <Box
                sx={{
                    width: 320,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {/* Transaction Type Switch */}
                <FormControlLabel
                    control={
                        <Switch
                            checked={isExpense}
                            onChange={() => setIsExpense(!isExpense)}
                        />
                    }
                    label={isExpense ? "Expense" : "Income"}
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                    }}
                />

                {/* Amount Input */}
                <TextField
                    label="Amount"
                    type="number"
                    fullWidth
                    value={amount}
                    onChange={(e) =>
                        setAmount(Math.max(1, Number(e.target.value)))
                    }
                />

                {/* Category Dropdown */}
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value as TransactionCategory)
                        }
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Submit Button */}
                <Button variant="outlined" onClick={handleSubmit} fullWidth>
                    LOG
                </Button>
            </Box>
        </Box>
    );
}
