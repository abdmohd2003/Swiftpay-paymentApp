export function InputBox({ label, placeholder, onChange, type = "text" }) {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">
                {label}
            </label>
            <input 
                onChange={onChange} 
                placeholder={placeholder} 
                type={type}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all border-solid"
            />
        </div>
    );
} 