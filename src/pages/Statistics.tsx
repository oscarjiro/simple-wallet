import { Box, Typography } from "@mui/material";
import useWallet from "../hooks/useWallet";

export default function Statistics() {
    const { accumulatedExpensesByCategory } = useWallet();

    const maxExpense = Math.max(
        ...Object.values(accumulatedExpensesByCategory),
        1
    );

    return (
        <Box sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
            <Typography variant="h5" textAlign="center" mb={2}>
                Expense Statistics
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {Object.entries(accumulatedExpensesByCategory).map(
                    ([category, amount]) => (
                        <Box key={category}>
                            <Typography
                                variant="body1"
                                fontWeight="light"
                                sx={{ display: "flex" }}
                            >
                                {category} -
                                <Typography fontWeight="bold">
                                    {" "}
                                    ${amount}
                                </Typography>
                            </Typography>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 24,
                                    bgcolor: "#f0f0f0",
                                    borderRadius: 1,
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: `${
                                            (amount / maxExpense) * 100
                                        }%`,
                                        height: "100%",
                                        bgcolor: "primary.main",
                                        transition: "width 0.3s ease",
                                    }}
                                />
                            </Box>
                        </Box>
                    )
                )}
            </Box>
        </Box>
    );
}
