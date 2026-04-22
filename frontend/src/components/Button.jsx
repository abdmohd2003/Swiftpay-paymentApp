export function Button({ label, onClick, disabled }) {
    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            type="button" 
            className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-sm px-5 py-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
        >
            {label}
        </button>
    );
}