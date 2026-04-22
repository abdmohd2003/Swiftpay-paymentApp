import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignin = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await api.post("/user/signin", {
                username,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 h-screen flex justify-center items-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <div className="text-center space-y-2">
                    <Heading label={"Welcome Back"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                </div>
                
                {error && (
                    <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
                        {error}
                    </div>
                )}

                <div className="mt-6 space-y-4">
                    <InputBox 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="name@example.com" 
                        label={"Email"} 
                    />
                    <InputBox 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••" 
                        label={"Password"} 
                        type="password" 
                    />
                    
                    <div className="pt-4">
                        <Button 
                            onClick={handleSignin} 
                            label={loading ? "Signing in..." : "Sign in"} 
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
}
