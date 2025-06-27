import React, { useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const SetProfile = () => {
    const handleSubmit = async (e)=>{

    }
  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[400px] h-[400px]  flex justify-center items-center p-2 rounded-xl shadow-lg'
      style={{
        background: "linear-gradient(73deg, rgba(53, 49, 59, 1) 50%, rgba(214, 180, 245, 1) 50%)"
      }}
      >
        <div>
            <section className='text-4xl text-center'> Add Profile </section>
            <form onSubmit={handleSubmit}>

            <input type="text" name="profilename" placeholder='Profile Name'
            className='mt-2 w-full p-1 rounded-sm'
            />
            <input type="text" name="Description" placeholder='Write about yourself'
            className='mt-2 w-full p-1 rounded-sm'
            />
            <button className='w-full bg-gray-900 mt-3 hover:border-none
            hover:bg-slate-800 border-none' onClick={handleRegistration}> Next <EastIcon/> </button>
            </form>
        </div>
      </div>
    </div>
  )
}

const ProfilePhoto = ()=>{
    const [option,setOption] = useState('');
    return (
        <div>

            <select name="pictures"  > <AddAPhotoIcon />
                <option value="img" onClick={()=>{setOption("img")}}>Photo</option>
                <option value="vid" onClick={()=>{setOption("vid")}}>Video</option>

                { option === "img" ? <input type="image" src=''/>:<input type='video'/>
                }
            </select>
        </div>
)}


export default SetProfile
