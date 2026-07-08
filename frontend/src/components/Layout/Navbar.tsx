import React, { useContext, useState } from "react";
import { Context } from "../../Context";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { authService } from "../../api/authService";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const data = await authService.logout();
      toast.success(data.message);
      setIsAuthorized(false);
      queryClient.setQueryData(["user"], null);
      navigateTo("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  if (!isAuthorized) return null;

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="logo flex-shrink-0">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-gradient">
            CareerConnect
          </Link>
        </div>
        
        <ul className={`${show ? "flex flex-col absolute top-20 left-0 w-full glass p-6 gap-6 shadow-xl" : "hidden md:flex"} md:items-center md:gap-8 transition-all duration-300 font-medium text-sm text-foreground/80`}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)} className="hover:text-primary transition-colors">
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)} className="hover:text-primary transition-colors">
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)} className="hover:text-primary transition-colors">
              {user && user.role === "Employer" ? "APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)} className="hover:text-primary transition-colors">
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)} className="hover:text-primary transition-colors">
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}
          <li>
            <button 
              onClick={handleLogout} 
              className="bg-primary/90 hover:bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
            >
              LOGOUT
            </button>
          </li>
        </ul>
        
        <div className="md:hidden text-2xl cursor-pointer text-foreground hover:text-primary transition-colors" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
