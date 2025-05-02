import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowRight } from "react-icons/fa";

export default function Navbar({ userEmail ,data}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    Swal.fire("Logout!", "Logged Out Successfully", "success");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 relative flex justify-between items-center">
  {/* Left: User Email */}
  <div className="text-gray-700 font-medium text-sm sm:text-base md:text-lg uppercase">
    {userEmail}
  </div>

  {/* Center: Notes Count */}
  <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-600 font-semibold text-sm sm:text-base md:text-lg">
    Notes ( {data.length} ) 
  </div>

  {/* Right: Logout Button */}
  <button
    onClick={handleLogout}
    className="text-red-600 font-semibold text-sm sm:text-base md:text-lg flex items-center"
  >
    <FaArrowRight className="mr-2" />
    Logout
  </button>
</nav>
  );
}
