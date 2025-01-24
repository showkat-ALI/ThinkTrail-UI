import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/logo.png";
import GeneralStyles from "../../../styles/GeneralStyles.module.css";
import SigninForm from "./SigninForm";

const Signin = () => {
    return (
        <div className={`${GeneralStyles.SigninBg} pb-4 min-h-screen bg-[#E5E5E5] relative`}>
            <Link href="/">
                <a className="flex max-w-[110px] basis-0 p-4 justify-start items-center gap-1">
                    <Image
                        src={logo}
                        width={35}
                        height={35}
                        className="h-5 w-6"
                        alt={"logo"}
                    />
                    <h3 className="uppercase font-semibold text-xl m-0">FITA</h3>
                </a>
            </Link>
            <div className="grid grid-cols-12 h-[80vh]">
                <div className="col-span-12 lg:col-span-6 hidden md:block">
                </div>
                <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
                    <SigninForm />
                </div>
            </div>
        </div>
    );
};

export default Signin;