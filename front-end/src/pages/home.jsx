import React, {useEffect} from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setOnlineUser, setScoketConnection, setUser } from '../redux/userSlice'
import SideBar from '../components/SideBar'
import logo from "../assets/logo1.png"
import {io} from "socket.io-client"

const Home = () => {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log("Redux user", user)

  const fetchUserDetails = async()=>{
    try {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/userDetails`
        const response = await axios({
          url : URL,
          withCredentials : true
        })

        dispatch(setUser(response.data.data))

        if(response.data.data.logout){
            dispatch(logout())
            navigate("/login")
        }
        console.log("current user Details", response)
    } catch (error) {
        console.log("error", error)
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  }, [])
  // fetchUserDetails()

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token")
      }
    })

    socketConnection.on("onlineUser", (data) => {
      console.log("data: ", data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setScoketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
  }, [])

  console.log("location", location)
  const basePath = location.pathname === '/'

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>

      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <SideBar/>
      </section>

      {/* Message Component */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet/>
      </section>

      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
        <div>
          <img
            src={logo}
            width={250}
            alt='logo'
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
      
    </div>
  )
}

export default Home
