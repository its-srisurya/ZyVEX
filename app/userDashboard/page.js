import { auth, currentUser } from '@clerk/nextjs/server'
import CoverPhoto from '../components/CoverPhoto'
import React from 'react'

async function userDashboard() {
  // const cover = document.getElementById('cover')
  // cover.src ='./1.gif'
  const user = await currentUser()
  console.log(user)
  
  return (
    <div className='relative'>
      <CoverPhoto />
      <div className='absolute -bottom-[34px] right-[621px] flex items-center gap-3 p-3'>
        <img
          height={85}
          width={85}
          className="w-[115px] h-[115px] object-fill rounded-lg"
          src={user.imageUrl}
          alt={`${user.firstName}'s profile`}
        />
      </div>

      Welcome {`${user.firstName}  ${user.lastName}`}


    </div>
  )
}
export default userDashboard;


