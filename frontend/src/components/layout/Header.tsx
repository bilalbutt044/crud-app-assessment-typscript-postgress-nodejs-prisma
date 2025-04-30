interface HeaderProps {
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ logout }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">User Management System</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Hi, Admin</span>
        <button onClick={logout} className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
