import React, { useEffect, useState } from 'react'
import './form.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Form = () => {
    const [name,setname]=useState('')
    const [email,setEmail]=useState('')
    const [number,setNumber]=useState('')
    const [data,setData]=useState([])
    const [edit,setEdit]=useState(false)

    useEffect(()=>{
        getData()
    },[])

    const getData=async()=>{
        try {
            const res=await axios.get('http://localhost:6677/api/user/getitems')
            setData(res.data.data)
            console.log(data)
            
            
        } catch (error) {
            console.log(error)
            toast.error('server error')
        }

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
        const res=await axios.post('http://localhost:6677/api/user/items',{
            name:name,
            mobile:number,
            email:email
        })
        if(!res.data.success){
            toast.error(res.data.message)      
        }else{

            toast.success(res.data.message)  
      getData();
        }
       setname('')
       setEmail('')
       setNumber('')
    }catch(error){
        console.log(error)
    }
}





const handleDelete=async(id)=>{
   
    try{
    const res=await axios.delete(`http://localhost:6677/api/user/items/${id} `
    
    )
      console.log(res)
      if(res.data.success){
          toast.success(res.data.message)      
      }
 getData();
   
   
}catch(error){
    console.log(error)
    toast.error('server error')
}
}

  return (
    <div >
        <form onSubmit={handleSubmit} method='post'>
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
    
       <button type="submit">Submit</button>
        
    
    
</div>
        </form>

        <div>
            {data &&
            <>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {
                data?.map((item,i)=>(

                <tr>
                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td className='edit'>
                      <Link to={`/items/${item._id}`}>
                       <button
                      
                    >Edit</button>
                    </Link> 
                    </td>
                    <td className='delete'><button onClick={()=>handleDelete(item._id)}>Delete</button></td>
                </tr>
                ))
                }
            </table>
            </>
}
        </div>
            
    </div>
  )
}

export default Form