import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import useWallet from "../hooks/useWallet";

export default function History() {
    const { transactions } = useWallet();

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h5" textAlign="center" mb={2}>
                Transaction History
            </Typography>

            {transactions.length === 0 ? (
                <Typography textAlign="center" color="text.secondary">
                    No transactions yet.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Type</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Category</strong>
                                </TableCell>
                                <TableCell align="right">
                                    <strong>Amount</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell
                                        sx={{
                                            color:
                                                tx.type === "income"
                                                    ? "green"
                                                    : "red",
                                        }}
                                    >
                                        {tx.type.charAt(0).toUpperCase() +
                                            tx.type.slice(1)}
                                    </TableCell>
                                    <TableCell>{tx.category}</TableCell>
                                    <TableCell align="right">
                                        ${tx.amount}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
