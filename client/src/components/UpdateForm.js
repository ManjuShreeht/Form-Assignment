import React, { useEffect, useState } from 'react'
import './form.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = () => {

    const [name,setname]=useState('')
    const [email,setEmail]=useState('')
    const [number,setNumber]=useState('')
    
    const [edit,setEdit]=useState(false)
const {id}=useParams()
const navigate=useNavigate()


useEffect(()=>{
    getData();
},[id])
const getData=async()=>{
    try {
        const res=await axios.get(`http://localhost:6677/api/user/items/${id}`)
        console.log(res.data.data)
      
        setname(res.data.data.name)
        setEmail(res.data.data.email)
        setNumber(res.data.data.mobile)
       toast.success(res.data.message)
        
    } catch (error) {
        console.log(error)
        toast.success('server error')
    }
}

    const handleUpdate=async(e)=>{
        console.log('hi')
        e.preventDefault()
        try {
                
        const res=await axios.put(`http://localhost:6677/api/user/items/${id}`,{
            name:name,
            mobile:number,
            email:email
        })
        console.log(res)
        toast.success(res.data.message)
        navigate('/')
      
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div><form method='post' onSubmit={handleUpdate}>
    <h1>Web Form</h1>
    <div className='col1'>

    <label htmlFor='name'>Name:</label>
    <input type="text" placeholder='entername' name="name" id="name" required value={name} onChange={(e)=>
    setname(e.target.value)}/>
    </div>
    <div className='col1'>

    <label htmlFor='mobile'>Mobile:</label>
    <input type="number" placeholder='enter number'required name="number" id="mobile" value={number}
          onChange={(e)=>
        setNumber(e.target.value)}/>
    </div>
    <div className='col1'>

<label htmlFor='email'>Email:</label>
<input type="email" placeholder='enter email' required  name="email" id="email" value={email}
onChange={(e)=>
setEmail(e.target.value)} />
</div>
<div className='btn'>

<button type='submit'>edit</button>



</div>
</form></div>
  )
}

export default UpdateForm