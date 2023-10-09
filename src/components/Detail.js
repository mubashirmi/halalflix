import React, { useEffect, useState ,useContext} from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { db } from "../firebase/firebase";
import { ThreeDots } from "react-loader-spinner";
import { doc , getDoc } from 'firebase/firestore';
import Reviews from './Reviews';
import { Appstate } from "../App";

const Detail = () => {
  const useAppstate = useContext(Appstate);
  const[ loading , setLoading ] = useState(false);
  const [ data , setData ] = useState({
    title: "",
    year: "",
    description: "",
    image:"",
    rating: 0,
    rated:0
  })
  const {id} = useParams();
  useEffect(()=>{
    async function getData(){ 
      setLoading(true);
      const _doc = doc(db,"movies",id)
      const _data = await getDoc(_doc); 
      setData(_data.data());
      setLoading(false);
    }
    getData();
  },[useAppstate.reload])
  return (
    <>
    { loading ? 
        <div className="flex w-full justify-center h-96 mt-24 items-center">
        <ThreeDots color="red" height={50} />
      </div>
      : 
    <div className='py-7 container m-auto flex justify-center'>
        <div className='m-auto relative flex flex-col md:flex-row  md:w-[90%] w-[100%]'>
          <div className='md:w-[40%] w-full md:sticky md:top-24 h-[30rem]'>
            <img src={data.image} className='h-full object-cover object-top w-full' />
          </div>
          <div className='text md:py-6 py-3 px-0 w-full md:w-[60%] md:pl-10'>
            <h2 className='font-bold text-4xl'>{data.title}<span className='font-bold text-xl' >({data.year})</span></h2>
            <ReactStars count={5} value={data.rating/data.rated} size={27} />
            <p className='mt-4 text-justify text-lg font-semibold'>
            {data.description}
            </p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </div>
    </div>
    }
    </>
  )
}

export default Detail