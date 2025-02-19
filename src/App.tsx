import { BrowserRouter, Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import { WalletProvider } from "./context/WalletContext";
import HomePage from "./pages/HomePage";
import History from "./pages/History";
import Statistics from "./pages/Statistics";
import { ThemeProvider } from "@emotion/react";
import darkTheme from "./data/theme";
import { Box } from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <WalletProvider>
                <BrowserRouter>
                    <Navigation />
                    <Box sx={{ paddingTop: 2, paddingX: 3 }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/stats" element={<Statistics />} />
                        </Routes>
                    </Box>
                </BrowserRouter>
            </WalletProvider>
        </ThemeProvider>
    );
}

export default App;
