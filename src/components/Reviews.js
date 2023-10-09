import React, { useState, useEffect , useContext } from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { reviewRef, db } from "../firebase/firebase";
import { Appstate } from "../App";
import {
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import swal from "sweetalert";
const Reviews = ({ id, userRated, prevRating }) => {
  const useAppstate = useContext(Appstate);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    rating: 0,
    review: "",
  });
  const addReview = async () => {
    setLoading(true);
    try {
      await addDoc(reviewRef, {
        movieid: id,
        name: useAppstate.username,
        rating: form.rating,
        review: form.review,
        timestamp: new Date().getTime(),
      });
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + form.rating,
        rated: userRated + 1,
      });
      useAppstate.setReload(useAppstate.reload + 1);
      swal({
        title: "Review Sent",
        timer: 3000,
        icon: "success",
        buttons: false,
      });
      setForm({
        rating: 0,
        review: "",
      });
      setLoading(false);
    } catch (err) {
      swal({
        title: err.message,
        timer: 3000,
        icon: "error",
        buttons: false,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      setData([]);
      const quer = query(reviewRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setReviewsLoading(false);
    }
    getData();
  }, [useAppstate.reload]);
  return (
    <div className="Reviews mt-20">
      <label for="message" class="leading-7 text-lg text-gray-50">
        Give your feedback ..........
      </label>
      <input
        id="message"
        value={form.review}
        onChange={(e) => {
          setForm({ ...form, review: e.target.value });
        }}
        placeholder="Share your thoughts . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
        name="message"
        class="w-full bg-gray-800 bg-opacity-40 rounded border  mb-1 focus:border-red-00  focus:ring-2 focus:ring-red-50 text-base outline-none focus:text-slate-200 py-1 px-3 resize-none leading-8 transition-all duration-300 ease-in-out"
      />
      <div className=" flex items-center ">
        <p className="inline-block mr-6">Rate this movies :-</p>
        <ReactStars
          className="inline-block"
          count={5}
          value={form.rating}
          size={27}
          onChange={(rate) => setForm({ ...form, rating: rate })}
        />
      </div>
      <button
        onClick={addReview}
        className="addbtn flex mx-auto text-red-900 font-bold py-1 px-8  focus:outline-none rounded text-xl"
      >
        {loading ? <TailSpin height={24} color="red" /> : "SUBMIT"}
      </button>
      <div>
        {reviewsLoading ? (
          <div className=" flex justify-center mt-10">
            <ThreeDots height={25} color="red" />
          </div>
        ) : (
          data.map((e, i) => {
            return (
              <div key={i} className="mt-7 bg-gray-900 py-2 px-4">
                <div className="flex items-center ">
                  <h3 className="text-xl text-blue-400 mr-3">{e.name}</h3>
                  <h4 className="text-sm mt-1">({new Date(e.timestamp).toLocaleString()})</h4>
                </div>
                <ReactStars
                  size={21}
                  edit={false}
                  value={e.rating}
                  className="mt-[-6px]"
                />
                <p>{e.review}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Reviews;
