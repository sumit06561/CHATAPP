import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Avatar = ({userId, name, imageUrl, width, height}) => {

    const onlineUser = useSelector((state) => state?.user?.onlineUser)

    let avatarName = ""

    if(name){
        const splitName = name?.split(" ")
        if(splitName.length > 1){
            avatarName = splitName[0][0] + splitName[1][0]
        }
        else{
            avatarName = splitName[0][0]
        }
    }

    const bgColor = [
        'bg-slate-300',
        'bg-teal-300',
        'bg-red-300',
        'bg-green-300',
        'bg-yellow-300',
        'bg-gray-300',
        "bg-cyan-300",
        "bg-sky-300",
        "bg-blue-300",
        "bg-purple-300"
    ]

    // const randomNumber = Math.floor(Math.random * 9)
    const randomNumber = Math.floor(Math.random() * 10)

    const isOnline = onlineUser.includes(userId)


    return (
        <div className={`text-slate-800 rounded-full font-bold relative`} style={{width : width+"px", height : height+"px" }}>
            {
                imageUrl ? (
                    <img
                        src={imageUrl}
                        width={width}
                        height={height}
                        alt={name}
                        className='overflow-hidden rounded-full w-full h-full object-cover'
                    />
                ) : (
                    name ? (
                        <div style={{width : width+"px", height : height+"px" }} className={`overflow-hidden rounded-full bg-u flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                            {avatarName}
                        </div>
                    ) :(
                        <FaRegCircleUser size={width} />
                    )
                )
            }

            {
                isOnline && (
                    <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full'></div>
                )
            }
            
        </div>
    )
}

export default Avatar
