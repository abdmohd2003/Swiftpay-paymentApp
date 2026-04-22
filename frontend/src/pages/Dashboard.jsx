import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import api from "../api";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        api.get("/account/balance")
            .then(response => {
                setBalance(response.data.balance);
            })
            .catch(err => {
                console.error("Error fetching balance:", err);
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <AppBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <Balance value={balance.toLocaleString()} />
                    </div>
                    <div className="md:col-span-2">
                        <Users />
                    </div>
                </div>
            </div>
        </div>
    );
}