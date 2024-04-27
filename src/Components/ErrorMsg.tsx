import {useGlobalContext} from "./GlobalCTX.tsx";

const ErrorMsg = () => {
    const {errorMsg} = useGlobalContext()
    return (
        <p className={"font-bold text-red-500 w-full text-center"}>{errorMsg}</p>
    );
};

export default ErrorMsg;