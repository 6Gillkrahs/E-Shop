import React from 'react'
import './Admin.css'
import Silebar from '../../Components/Sidebar/Silebar'
import Addproduct from '../../Components/Addproduct/Addproduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import {Route, Routes} from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'>
      <Silebar/>
      <Routes>
        <Route path='/addproduct' element={<Addproduct/>}></Route>
        <Route path='/listproduct' element={<ListProduct/>}></Route>
      </Routes>
    </div>
  )
}

export default Admin
