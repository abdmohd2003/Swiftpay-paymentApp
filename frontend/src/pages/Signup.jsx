import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from "../components/SubHeading";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await api.post("/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 h-screen flex justify-center items-center px-4 overflow-y-auto">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 my-8">
                <div className="text-center space-y-2">
                    <Heading label={"Create Account"} />
                    <SubHeading label={"Join us today to start making secure payments"} />
                </div>

                {error && (
                    <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
                        {error}
                    </div>
                )}

                <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox 
                            onChange={(e) => setFirstName(e.target.value)} 
                            placeholder="John" 
                            label={"First Name"} 
                        />
                        <InputBox 
                            onChange={(e) => setLastName(e.target.value)} 
                            placeholder="Doe" 
                            label={"Last Name"} 
                        />
                    </div>
                    <InputBox 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="john@example.com" 
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
                            onClick={handleSignup} 
                            label={loading ? "Creating account..." : "Sign up"} 
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
}