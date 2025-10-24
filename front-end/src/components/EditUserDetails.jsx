import React, { useRef, useState } from 'react'
import Avatar from './Avatar'
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import uploadFile from '../helpers/UploadFile'

const EditUserDetails = ({onClose, userData}) => {

    const uploadPhotoRef = useRef()
    const dispatch = useDispatch()

    const [data, setData] = useState({
        name: userData?.name,
        profile_pic: userData?.profile_pic
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }   
        })
    }

    const handleOpenUploadPhoto = (e)=>{
        e.preventDefault()
        e.stopPropagation()

        uploadPhotoRef.current.click()
    }

    const handleUploadPhoto = async (e)=>{
        const file = e.target.files[0]

        const uploadPhoto = await uploadFile(file)

        setData((preve)=>{
            return{
                ...preve,
                profile_pic : uploadPhoto?.url
            }
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        e.stopPropagation()

        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/updateUser`

            const response = await axios({
                method : 'post',
                url : URL,
                data : data,
                withCredentials : true
            })

            console.log('response', response)
            toast.success(response?.data?.message)
            
            if(response.data.success){
                dispatch(setUser(response.data.data))
                onClose()
            }
         
        } catch (error) {
            console.log(error)
            toast.error()
        }
    }


  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-800 bg-opacity-40 flex justify-center items-center z-10'>
      <div className='bg-white p-6 m-1 rounded w-full max-w-sm flex flex-col gap-2'>
        <h2 className='font-semibold'>Profile Details</h2>
        <p className='text-sm'>Edit User Details</p>

        <form className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name : </label>
                <input 
                    type="text"
                    id='name'
                    name='name'
                    value={data?.name}
                    onChange={handleOnChange}
                    className='w-full py-1 px-2 focus:outline-primary border-2'
                />
            </div>

            <div>
                <div>Photo:</div>
                <div className='my-1 flex items-center gap-4'>
                    <Avatar
                        width={40}
                        height={40}
                        name={data?.name}
                        imageUrl={data?.profile_pic}
                    />
                    <label htmlFor='profile_pic'>
                        <div className=' p-2 rounded border border-primary hover:bg-slate-400'>
                            <button className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
                        </div>
                        {/* <button className='font-semibold bg-red-500' onClick={handleOpenUploadPhoto}>Change Photo</button> */}
                        <input
                            type='file'
                            id='profile_pic'
                            className='hidden'
                            onChange={handleUploadPhoto}
                            ref={uploadPhotoRef}
                        />
                    </label>
                </div>
            </div>

            <Divider />

            <div className='flex gap-2 w-fit ml-auto '>
                <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
            </div>
                    
        </form>
      </div>
    </div>
  )
}

export default EditUserDetails
