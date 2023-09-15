import axios from 'axios';
import { response } from 'express';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner';


function ShowBook() {

  const [book, setBook] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(()=>{

    setLoading(true);
    axios
    .get(`http://localhost:4000/api/book/${id}`)
    .then((response) => {
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })

  }, [])

  return (
    <div className='p-4'>
      <BackButton />

      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
          <Spinner />
      )
      :
      (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>
                  Id
                </span>

                <span>
                  
                </span>
              </div>
          </div>
      )}
    </div>
  )
}

export default ShowBook
