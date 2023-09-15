import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox } from 'react-icons/md'



function Home() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:4000/api/book")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, []);

  return (
    <div className='p-4'>

      <div className="flex justify-between items-center">
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='test-sky-800 text-4xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          
          {/* Headers for the table */}
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Publish year</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>

          <tbody>

            {books.map((book, index)=>(
              <tr key={books._id} className='h-8'>
                
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>

                <td className='border border-slate-700 rounded-md text-center'>
                  {book.title}
                </td>         

                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.author}
                </td>  

                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.publishYear}
                </td>  

                <td className='border border-slate-700 rounded-md text-center'>
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${books._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>

                    <Link to={`/books/edit/${books._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>

                    <Link to={`/books/delete/${books._id}`}>
                        <MdOutlineAddBox className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>       
              </tr>
            ))}

          </tbody>

        </table>
      )}

    </div>
  )
}

export default Home
