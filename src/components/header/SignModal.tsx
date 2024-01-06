import {Link} from "react-router-dom";

export function SignModal(
    {
    isModalOpen,
    setIsModalOpen,
    setId,
    setPw,
    signInHandler}:{
    isModalOpen: boolean,
    setIsModalOpen: (valOrUpdater: (((currVal: boolean) => boolean) | boolean)) => void,
    setId: (value: (((prevState: string) => string) | string)) => void,
    setPw: (value: (((prevState: string) => string) | string)) => void,
    signInHandler: (tempValue?: any) => Promise<void>}) {

    const labelFont = () => {
        return "block text-gray-700 mb-2 hover:text-red-400 font-semibold";
    };
    const inputCss = () => {
        return "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 mb-4 focus:border-2";
    };

    function LoginButton() {
        return <div className="flex items-center">
            <button
                className="bg-gray-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded hover:shadow-lg whitespace-nowrap ml-auto"
                onClick={signInHandler}
            >로그인
            </button>
        </div>;
    }

    function SignExtendButton() {
        return <div className="flex justify-between mb-4">
            <Link
                to="/SignUp"
                className={labelFont()}
                onClick={() => {
                    setIsModalOpen(false);
                }}
            >
                ID/PW 찾기
            </Link>
            <Link
                to="/SignUp"
                className={labelFont()}
                onClick={() => {
                    setIsModalOpen(false);
                }}
            >
                회원가입
            </Link>
        </div>;
    }

    function InputPassword() {
        return <>
            <label htmlFor="pw-input" className={labelFont()}>
                Password
            </label>
            <input
                type="password"
                onChange={(e) => {
                    setPw(e.target.value);
                }}
                id="pw-input"
                className={inputCss()}
            />
        </>;
    }

    function InputId() {
        return <>
            <label htmlFor="id-input" className={labelFont()}>
                ID
            </label>
            <input
                onChange={(e) => {
                    setId(e.target.value);
                }}
                id="id-input"
                className={inputCss()}
            />
        </>;
    }

    function ModalHeader() {
        return <div className="modal-header px-4 py-3">
            <div className="flex justify-end items-center">
                <button
                    className="text-gray-400  hover:text-red-700"
                    onClick={() => {
                        setIsModalOpen(false);
                    }}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex justify-center items-center">
                <h2 className="text-lg font-medium text-red-400 font-semibold">
                    로그인
                </h2>
            </div>
        </div>;
    }

    function ModalBody() {
        return <div className="modal-body p-4">
            <div className=" w-[15rem] h-[17rem]">
                <InputId/>
                <InputPassword/>
                <SignExtendButton/>
                <LoginButton/>
            </div>
        </div>;
    }

    return (
        <>
            {isModalOpen ?
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center "
                    style={{backgroundColor: "rgba(128, 128, 128, 0.5)"}}
                >
                    <div className="absolute bg-white shadow-lg rounded-lg">
                        <ModalHeader/>
                        <ModalBody/>
                    </div>
                </div>
            :
            <></>
            }
        </>

    )
}