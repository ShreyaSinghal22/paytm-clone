import { Subheading } from "../components/subheadingcomp";  
import { Heading } from "../components/headingcomp";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const Appbar = () => {
    return (
        <div className = "shadow h-14 flex justify-between">
            <div className = "flex flex col justify-center h-full ml-4">
                <Heading label = {"PayTM App"} />
            </div>
            <div className = "flex flex col justify-center h-full mr-4">
                <Subheading title = {"Hello"} />
                <UserCircleIcon className="h-6 w-6 text-gray-600"/>
            </div>
        </div>
    );
}