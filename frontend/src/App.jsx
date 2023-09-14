import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import EditBook from './Pages/EditBook'
import CreateBook from './Pages/CreateBook'
import ShowBook from './Pages/ShowBook'
import DeleteBook from './Pages/DeleteBook'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/books/create' element={ <CreateBook /> } />
        <Route path='/books/details/:id' element={ <ShowBook /> } />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
      </Routes>
    </>
  )
}

export default App
