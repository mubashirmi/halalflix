import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Appstate } from "../App";
const Header = () => {
const useAppstate = useContext(Appstate);
  return (
    <div className="header flex justify-between sticky top-0 z-30 container m-auto items-center py-3">
      <Link to={"/"}>
        <h1 className="md:text-4xl text-3xl font-bold">
          <span className="text-red-500">Halal</span>
          <span className="text-red-50">Flix</span>
        </h1>
      </Link>
      {useAppstate.login ? (
        <Link to={"/addmovie"}>
          <h2 className="text-red-600 addbtn md:py-1 md:px-3 px-2 flex items-center">
            <AddIcon />
            <span className="text-lg font-semibold">Add New</span>
          </h2>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h2 className="text-red-600 addbtn py-1 px-4 flex items-center">
            <span className="text-lg font-semibold">LOGIN</span>
          </h2>
        </Link>
      )}
    </div>
  );
};

export default Header;
