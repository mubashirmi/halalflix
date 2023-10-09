import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeDots } from "react-loader-spinner";
import { moviesRef } from "../firebase/firebase";
import { getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
const Cards = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="cardSection container m-auto flex flex-wrap justify-between mt-7">
      {loading ? (
        <div className="flex w-full justify-center h-96 mt-24 items-center">
        <ThreeDots color="red" height={50} />
      </div>
      ) : (
        data.map((e, i) => {
          return (
            <div className="card lg:w-[23%] w-[32%]  rounded-2xl mt-9 hover:-translate-y-3 cursor-pointer shadow-2xl duration-300">
              <Link to={`/detail/${e.id}`}>
              <div
                key={i}
                className=" py-3 px-3 transition-all hover:-translate-y-2 duration-300  ease-in-out text-gray-800  "
              >
                <img
                  src={e.image}
                  className="w-full object-top rounded-xl h-80 object-cover mb-2"
                />
                <h3 className="font-bold text-xl text-gray-600">
                  <span className="text-slate-200">{e.title}</span>
                </h3>
                <h3 className="font-bold text-xl text-gray-600">
                  {" "}
                  Year : <span className="text-slate-200">{e.year}</span>
                </h3>
                <h2 className="font-bold text-lg text-gray-600 flex items-start">
                  Rating : &nbsp;
                  <span className="text-slate-200">
                    <ReactStars
                      count={5}
                      color={"#ffd700"}
                      size={22}
                      value={e.rating/e.rated}
                      className="inline-block"
                    />
                  </span>
                </h2>
              </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Cards;
