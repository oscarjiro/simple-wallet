import { BrowserRouter, Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import { WalletProvider } from "./context/WalletContext";
import HomePage from "./pages/HomePage";
import History from "./pages/History";
import Statistics from "./pages/Statistics";

function App() {
    return (
        <WalletProvider>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/stats" element={<Statistics />} />
                </Routes>
            </BrowserRouter>
        </WalletProvider>
    );
}

export default App;
