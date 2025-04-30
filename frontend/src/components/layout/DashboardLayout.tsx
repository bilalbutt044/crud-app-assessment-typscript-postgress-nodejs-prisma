import { Outlet, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { remove } = useLocalStorage("token", "");

  const logout = () => {
    remove();
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <Header logout={logout} />
        {/* Content */}
        <main className="p-6 overflow-y-auto flex-1 bg-gray-50">{<Outlet />}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
