import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CreateBook() {

  const [title, setTitle] = useState('');
  const [author,setAuthor] = useState('')
  const [publishYear , setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title, 
      author,
      publishYear
    }

    axios
    .post('http://localhost:4000/api/book')
  }


  return (
    <div>
      
    </div>
  )
}

export default CreateBook
