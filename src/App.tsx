import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import { WalletProvider } from "./context/WalletContext";

function App() {
    return (
        <WalletProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<>Hello, world</>} />
                </Routes>
            </BrowserRouter>
        </WalletProvider>
    );
}

export default App;
