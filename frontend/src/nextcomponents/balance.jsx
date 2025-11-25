import { Subheading } from "../components/subheadingcomp";  
import { Heading } from "../components/headingcomp";
import { CurrencyrupeeIcon } from "@heroicons/react/24/outline";

export const Balance = () => {
    return (
        <div className = "shadow h-14 flex">
            <div className = "flex flex-col text-bold text-sans justify-left">
                <Heading label = {"Your Balance"} />
                <CurrencyrupeeIcon className="h-3 w-3 text-gray-600"/>
                <Subheading title = {value} />
            </div>
        </div>
    );
}