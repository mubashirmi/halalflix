import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { moviesRef } from "../firebase/firebase";
import swal from "sweetalert";
const Addmovie = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rating : 0,
    rated :0
  });
  const [loading, setLoading] = useState(false);
  const addMovie = async () => {
    setLoading(true);
    try {
      await addDoc(moviesRef, form);
      swal({
        title: "Successfully Added",
        timer: 3000,
        icon: "success",
        buttons: false,
      });
      setform({
        title: "",
        year: "",
        description: "",
        image: "",
      });
      setLoading(false);
      navigate('/');
    } catch (err) {
      swal({
        title: err,
        timer: 3000,
        icon: "error",
        buttons: false,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <section class="text-gray-400  body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h2 class="sm:text-3xl text-2xl font-medium title-font text-white">
              Add New Movie
            </h2>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto font-bold text-white">
            <div class="flex flex-wrap -m-2 ">
              <div class="p-2 sm:w-1/2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-400">
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => {
                      setform({ ...form, title: e.target.value });
                    }}
                    id="name"
                    name="name"
                    class="w-full bg-gray-800  bg-opacity-40 rounded border  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 leading-8 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 sm:w-1/2 w-full">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-400">
                    Year
                  </label>
                  <input
                    type="email"
                    value={form.year}
                    onChange={(e) => {
                      setform({ ...form, year: e.target.value });
                    }}
                    id="email"
                    name="email"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 leading-8 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
              <label for="message" class="leading-7 text-sm text-gray-400">
                Image URL
              </label>
              <input
                id="message"
                value={form.image}
                onChange={(e) => {
                  setform({ ...form, image: e.target.value });
                }}
                name="message"
                class="w-full bg-gray-800 bg-opacity-40 rounded border  mb-5 focus:border-red-00  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 resize-none leading-8 transition-all duration-300 ease-in-out"
              />
              <label for="message" class="leading-7 text-sm text-gray-400">
                Description
              </label>
              <textarea
                id="message"
                value={form.description}
                onChange={(e) => {
                  setform({ ...form, description: e.target.value });
                }}
                name="message"
                class="w-full bg-gray-800 bg-opacity-40 rounded border  mb-7 focus:border-red-00 focus:ring-2 focus:ring-red-50 h-32 text-base outline-none focus:text-slate-200 py-1 px-3 resize-none leading-6 transition-all duration-300 ease-in-out"
              ></textarea>
            </div>
          </div>
          <div class="p-2 w-full">
            <div class="relative">
              <div class="p-2 w-full">
                <button
                  onClick={addMovie}
                  className="addbtn flex mx-auto text-red-900 font-bold py-1 px-4 md:py-2 md:px-8  focus:outline-none rounded md:text-2xl text:xl"
                >
                  {loading ? <TailSpin height={27} color="red" /> : "SUBMIT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
