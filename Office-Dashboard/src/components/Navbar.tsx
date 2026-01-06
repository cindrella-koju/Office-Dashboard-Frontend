import { FaHome } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

export default function NavBar() {
    const navInfo = {
        "Home" : <FaHome/>,
        "Event" : <MdEmojiEvents />,
        "Users" : <FiUsers />,
        "Logout": <IoIosLogOut/>
    }
  return (
    <div className="h-screen">
      <div className="h-full w-full bg-[#1a083f]">
        
        <div className="h-40 w-full bg-red-100" />

        <div className="flex flex-col items-center gap-10 w-full flex-1 mt-10">
            {Object.entries(navInfo).map(([key, value]) => (


          <div className="w-4/5 h-16 flex items-center justify-center
                          rounded-lg cursor-pointer flex
                          transition-all duration-300 text-white text-xl
                          hover:bg-[#382951] hover:scale-105 active:bg-[#382951]">
                <div className="w-10 pl-10">
                        {value}
                </div>
                <div className="w-85 text-center">
                    {key}
                </div>
          </div>
            ))}
        </div>

      </div>
    </div>
  );
}
