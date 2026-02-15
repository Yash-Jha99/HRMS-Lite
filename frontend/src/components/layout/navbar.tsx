import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <div className="py-3 px-8 justify-between flex gap-8 text-lg max-w-7xl mx-auto">
      <div className="justify-start flex gap-8">
        <Link
          to="/"
          activeProps={{
            className: "font-semibold text-primary",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/employees"
          activeProps={{
            className: "font-semibold text-primary",
          }}
          activeOptions={{ exact: true }}
        >
          Employees
        </Link>
      </div>
      <span>Admin</span>
    </div>
  );
};

export default Navbar;
