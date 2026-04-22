export const Balance = ({ value }) => {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-6 rounded-xl shadow-lg text-white">
            <div className="text-sm font-medium opacity-80 uppercase tracking-wider">
                Your Balance
            </div>
            <div className="flex items-baseline mt-2">
                <span className="text-xl font-semibold mr-1">₹</span>
                <span className="text-4xl font-bold">{value}</span>
            </div>
            <div className="mt-4 flex space-x-2">
                <div className="bg-white/20 p-2 rounded-lg text-xs backdrop-blur-sm">
                    Safe & Secure
                </div>
                <div className="bg-white/20 p-2 rounded-lg text-xs backdrop-blur-sm">
                    Instant Transfers
                </div>
            </div>
        </div>
    );
}