import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import swal from "sweetalert";

const Login = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [btnHandler, setbtnHandler] = useState(false);
  const [loading, setLoading] = useState(false);
  const submissionHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setbtnHandler(true);
    signInWithEmailAndPassword(auth , form.email,form.password)
    .then(async(res)=>{
    swal({
        title: "LogIn Successfully",
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
    navigate('/');
  })
  };

  return (
    <div className="mt-11 w-[80%] md:w-[33%]  m-auto ">
      <fieldset className="red-50">
        <legend className="text-red-50 text-4xl font-bold text-center">Login</legend>
      <label for="message" class="leading-6 text-sm text-gray-400">
        E-mail
      </label>
      <input
        type="email"
        placeholder=" Enter your Number i.e; 0300-0000000"
        id="message"
        value={form.email}
        onChange={(e) => {
          setform({ ...form, email: e.target.value });
        }}
        name="message"
        class="w-full bg-gray-800 bg-opacity-40 rounded border  mb-5 focus:border-red-00  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 resize-none leading-8 transition-all duration-300 ease-in-out"
      />
      <label for="message" class="leading-6 text-sm text-gray-400">
        Password
      </label>
      <input
        id="message"
        value={form.password}
        placeholder="Enter your password . . . . . . . . . . . . . ."
        onChange={(e) => {
          setform({ ...form, password: e.target.value });
        }}
        name="message"
        class="w-full bg-gray-800 bg-opacity-40 rounded border  mb-5 focus:border-red-00  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 resize-none leading-8 transition-all duration-300 ease-in-out"
      />
      <button
        className="addbtn flex mx-auto text-red-900 font-bold py-2 px-7 my-4 focus:outline-none rounded text-xl"
        disabled = {btnHandler}
        onClick={submissionHandler}
      >
        {loading ? <TailSpin height={28} color="red" /> : "LOGIN"}
      </button>
      <p className="text-center">
        Don't have account ?
        <Link to={'/signup'}>
                <span className="text-blue-500"> Sign Up</span>
        </Link> 
      </p>
      </fieldset>
    </div>
  );
};

export default Login;
