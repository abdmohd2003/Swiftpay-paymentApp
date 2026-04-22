import { useNavigate } from "react-router-dom";

export const AppBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20c1.865 0 3.584-.51 5.047-1.397m-7.047-14.503a10.002 10.002 0 0113.12 6.326M12 11Vc0 3.517-1.009 6.799-2.753 9.571m0 0l-1.407-1.407M12 11a10.002 10.002 0 00-6.326-13.12m0 0l1.407 1.407" />
                            </svg>
                        </div>
                        <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            PayTM
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:block text-slate-600 font-medium">
                            Hello, User
                        </div>
                        <div className="rounded-full h-10 w-10 bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200">
                            U
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}