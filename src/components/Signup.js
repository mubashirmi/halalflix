import React from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnHandler, setbtnHandler] = useState(false);
  const submissionHandler = (e) => {
    e.preventDefault();
    setbtnHandler(true);
    setLoading(true);
    createUserWithEmailAndPassword(auth , form.email,form.password)
    .then(async(res)=>{
    const user = res.user;
    await updateProfile(user,{
      displayName : form.name
    })  
    swal({
      title: "Sign Up Successfully",
      timer: 3000,
      icon: "success",
      buttons: false,
    });
    setbtnHandler(false);
    setLoading(false);
    navigate('/');
    }
    )
    .catch((err)=>{
      swal({
        title: err,
        timer: 3000,
        icon: "error",
        buttons: false,
      });
      setbtnHandler(false);
      setLoading(false);
  })
  };

  return (
    <div className="w-full mt-10 flex flex-col items-center">
        <form className="w-full flex items-center flex-col" onSubmit={submissionHandler} >
          <h2 className="text-red-50 text-4xl font-bold text-center">Sign Up</h2>
          <div className="p-2 md:w-1/3 w-4/5 my-2 login1-input">
            <label className="leading-7 text-sm  form-heading">Name:</label>
            <input
              type={"text"}
              required={true}
              id="name"
              name="userName"
              value={form.name}
              placeholder="username"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-800 bg-opacity-40 rounded border focus:border-red-00  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 resize-none leading-8 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="p-2 w-4/5 md:w-1/3 my-2 login2-input">
            <label className="leading-7 text-sm  form-heading">
              Email 
            </label>
            <input
              type={"email"}
              required={true}
              id="email"
              name="email"
              value={form.email}
              placeholder="userxyz@email.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-gray-800 bg-opacity-40 rounded border focus:border-red-00  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 resize-none leading-8 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="md:w-1/3 w-4/5 p-2 my-2 login1-input">
            <label className="leading-7 text-sm  form-heading">Password:</label>
            <input
              type={"password"}
              required={true}
              id="password"
              name="password"
              value={form.password}
              placeholder="flimy@1234"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-gray-800 bg-opacity-40 rounded border focus:border-red-00  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 resize-none leading-8 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="w-auto p-2">
            <button
              type={"submit"}
              disabled = {btnHandler}
              className="addbtn flex mx-auto text-red-900 font-bold py-2 px-8 my-4 focus:outline-none rounded text-xl "
            >
              {loading ? <TailSpin height={28} color="red" /> : "Sign Up"}
            </button>
          </div>
        </form>
      <div className="mt-2 animated-line">
        Already have an account?
        <Link to={"/login"}>
          <span className="text-blue-500"> Log In</span>
        </Link>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignUp;
