import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useState } from "react";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleTransfer = async () => {
        if (!amount || amount <= 0) {
            setStatus("error");
            setMessage("Please enter a valid amount");
            return;
        }

        setStatus("loading");
        try {
            await api.post("/account/transfer", {
                to: id,
                amount: parseFloat(amount)
            });
            setStatus("success");
            setMessage("Transfer Successful!");
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setStatus("error");
            setMessage(err.response?.data?.message || "Transfer failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
                    <h2 className="text-3xl font-bold">Send Money</h2>
                    <p className="opacity-80 mt-2">Transfer funds instantly to anyone</p>
                </div>

                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold mb-4 shadow-inner">
                            {name?.[0].toUpperCase()}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">{name}</h3>
                        <p className="text-slate-500 text-sm">Verified Recipient</p>
                    </div>

                    {status === "success" && (
                        <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-xl text-center font-medium border border-green-100 animate-bounce">
                            ✓ {message}
                        </div>
                    )}

                    {status === "error" && (
                        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100">
                            ⚠ {message}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="amount">
                                Amount (in ₹)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-slate-400 font-medium">₹</span>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    id="amount"
                                    placeholder="0.00"
                                    value={amount}
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button 
                                onClick={() => navigate("/dashboard")}
                                className="flex-1 h-12 rounded-xl text-slate-600 font-semibold border border-slate-200 hover:bg-slate-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleTransfer}
                                disabled={status === "loading"}
                                className={`flex-[2] h-12 rounded-xl text-white font-bold transition-all shadow-lg ${
                                    status === "loading" ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                                }`}
                            >
                                {status === "loading" ? "Processing..." : "Initiate Transfer"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}