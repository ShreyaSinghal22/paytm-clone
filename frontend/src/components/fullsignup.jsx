import { Heading } from "./headingcomp";
import { Subheading } from "./subheadingcomp";
import { Inputbox } from "./inputbox";
import { Buttoncomponent } from "./buttoncomp";
import { BottomWarning } from "./bottomwarning";


export const singnup = () => {
    return (
        <div className = "flex bg-slate-300 h-screen rounded-md">
            <div className = "flex flex-col justify-center items-center p-3 bg-white p-10 rounded-lg shadow-lg">
                <div className = "bg-white w-80 text-center p-2 h-max px-4 text-serif">
                    <Heading label = {"Sign Up"}/>
                    <Subheading title = {"Create your account"}/>
                    <Inputbox label = {"Full Name"} placeholder = {"Enter your full name"}/>
                    <Inputbox label = {"Email"} placeholder = {"Enter your email address"}/>
                    <Inputbox label = {"Password"} placeholder = {"Create a password"}/>
                    <div className="pt-4">
                        <Buttoncomponent label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />  
                </div>
            </div>
        </div>
    );
}