const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`

console.log("R_A_C_C_N: ", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "Chat-App-File")

    const response = await fetch(url, {
        method: "post",
        body: formData
    })
    const responseData = await response.json()

    return responseData
}

export default uploadFile