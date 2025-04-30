import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:text-blue-400">
          Users
        </Link>
        <Link to="/settings" className="hover:text-blue-400">
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
