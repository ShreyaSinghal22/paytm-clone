export function Inputbox({ label, placeholder }) {
    return (
        <div>
            <div className="font-bold text-2xl pt-6">
                {label}
            </div>
            <input placeholder={placeholder} className="border-2 border-gray-300 rounded-lg p-2 mt-2 w-96" />
        </div>
    );
}