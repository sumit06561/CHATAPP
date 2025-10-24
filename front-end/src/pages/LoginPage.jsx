import React, { useState } from 'react'
// import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
// import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';
// import { PiUserCircle } from "react-icons/pi";

const LoginPage = () => {
  const [data, setData] = useState({
    email : "",
    password: ""
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/login`
    console.log("URL", URL)

    try {
        const response = await axios({
          method :'post',
          url : URL,
          data : {
            email : data.email,
            password : data.password
          },
          withCredentials : true
        })

        toast.success(response.data.message)

        console.log("Login response", response)


        if(response.data.success){
          dispatch(setToken(response?.data?.token))
          localStorage.setItem("token", response?.data?.token)
          
          setData({
            email : "",
            password : ""
          })
          navigate('/',{
            state : response?.data?.data
          })
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }


  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

            {/* <div className='w-fit mx-auto mb-2'>
                <PiUserCircle
                  size={80}
                />
            </div> */}

          <h3>Welcome to Chat app!</h3>

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>

              <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Email :</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='enter your email' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor='password'>Password :</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='enter your password' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Let's Go
              </button>

          </form>

          <div className='flex flex-row justify-between'>
            <p className='my-3 text-center'>New User ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
            <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password ?</Link></p>
          </div>
        </div>
    </div>
  )
}

export default LoginPage
