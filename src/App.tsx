import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<>Hello,world</>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
