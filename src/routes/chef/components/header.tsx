import { Icon } from "@iconify/react/dist/iconify.js";

import { useNameContext } from "./context";
import { Link } from "react-router";

function Header() {
  const { name } = useNameContext();

  return (
    <div className="flex  justify-center bg-blue items-center bg-cyan-950 pt-4 pb-4  mb-0">
      <Link to="/contact">Go to Contact</Link>
      <Icon
        icon="simple-icons:codechef"
        width="60"
        height="50"
        style={{ color: "white" }}
      />
      <h1 className="text-4xl cursor-pointer font-thin bg-clip-text text-transparent bg-gradient-to-r  from-cyan-300 to-blue-500">
        {name}
      </h1>
    </div>
  );
}

export default Header;
