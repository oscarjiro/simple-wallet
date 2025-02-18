import { useContext } from "react";
import WalletContext, { UseWalletContextType } from "../context/WalletContext";

const useWallet = (): UseWalletContextType => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};

export default useWallet;
