import { useEffect, useState } from "react";
import { Button } from "./Button";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(true);
            api.get("/user/bulk?filter=" + filter)
                .then(response => {
                    setUsers(response.data.user);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching users:", err);
                    setLoading(false);
                });
        }, 300); // Debounce for 300ms

        return () => clearTimeout(timeoutId);
    }, [filter])

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="font-bold text-xl text-slate-800">
                Users
            </div>
            <div className="my-4 relative">
                <input 
                    onChange={(e) => setFilter(e.target.value)} 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-4 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                />
                {loading && (
                    <div className="absolute right-3 top-2.5">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>
            <div className="space-y-4">
                {users.length > 0 ? (
                    users.map(user => <User key={user._id} user={user} />)
                ) : (
                    <div className="text-center text-slate-500 py-4">No users found.</div>
                )}
            </div>
        </div>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    const initials = (user.firstName?.[0] || "") + (user.lastName?.[0] || "");

    return (
        <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 flex justify-center items-center text-white font-semibold text-lg shadow-sm">
                    {initials.toUpperCase()}
                </div>
                <div className="flex flex-col ml-4">
                    <div className="font-semibold text-slate-800">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-slate-500">
                        @{user.username.split('@')[0]}
                    </div>
                </div>
            </div>
            <div>
                <Button 
                    onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)} 
                    label={"Send Money"} 
                />
            </div>
        </div>
    );
}