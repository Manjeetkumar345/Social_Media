import React from 'react'
import Status from '../status/Status'

import HomePost from './HomePost';


const Home = () => {
  return (
    <>
    <div className='overflow-y-auto'><Status/></div>
    <div className='flex items-center justify-center  '>
        <div className='mt-10 '>
            <HomePost/>
        </div>
    </div>
                </>
  )
}

export default Home;