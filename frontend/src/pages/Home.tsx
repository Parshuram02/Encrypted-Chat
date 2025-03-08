import { sendIcon } from "../icons/sendIcon";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='w-screen sm:h-screen h-full  flex flex-col justify-start items-center bg-gradient-to-br from-[#6A5ACD] via-[#4682B4] to-[#87CEEB]'>
            <div className="text-5xl  flex justify-center text-center uppercase font-semibold mt-14 font-mono">
                Echo-Chat
            </div>
            <div className="flex flex-wrap-reverse w-full p-4 mt-14 justify-evenly gap-10 items-center">
                <div className="flex flex-col justify-center items-center gap-7">
                    <div>
                        <div className="p-6 font-semibold  text-3xl font-mono flex items-center gap-5">
                            <div>
                                {sendIcon()}
                            </div>
                            Chat Safely ,Stay Close!
                        </div>
                        <div className="p-6 font-semibold  text-3xl font-mono flex items-center gap-5">
                            <div>
                                {sendIcon()}
                            </div>
                            We Do not save your messages.
                        </div>
                        <div className="p-6 font-semibold  text-3xl font-mono flex items-center gap-5">
                            <div>
                                {sendIcon()}
                            </div>
                           Talk Freely, No Login/Register Required
                        </div>
                        <div className="p-6 font-semibold text-3xl font-mono flex items-center gap-5">
                            <div>
                                {sendIcon()}
                            </div>
                            Have secured chats with anyone.
                        </div>
                        <div className="p-6 font-semibold text-3xl font-mono flex items-center gap-5">
                            <div>
                                {sendIcon()}
                            </div>
                            Having fun? Let us Know!
                        </div>
                    </div>
                </div>
                <div className='sm:w-1/3 sm:h-fit pb-7 w-fit px-5 h-fit bg-white/50 shadow-xl rounded-4xl border'>
                    <div className="text-4xl flex justify-center text-center uppercase font-semibold mt-7 font-mono">
                        Start Fun Chat Here
                    </div>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => { navigate("/createroom") }} className="text-2xl flex border px-4 py-2 cursor-pointer rounded-2xl bg-[#007BFF]/50 mt-7 hover:opacity-70"> Create Room</button>
                        <button onClick={() => {navigate("/joinroom") }} className="text-2xl flex border px-4 py-2 cursor-pointer rounded-2xl bg-[#007BFF]/50 mt-7 hover:opacity-70"> Join Room</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
