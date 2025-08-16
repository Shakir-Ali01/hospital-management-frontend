import { ActionIcon, Button, rem } from '@mantine/core'
import {IconBellRinging, IconLayoutSidebarLeftCollapseFilled } from '@tabler/icons-react'
import ProfleMenu from './ProfleMenu.tsx'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { use, useEffect } from 'react'
import { removeJwt } from '../../Slices/JwtSlices.tsx'
import { removeUser } from '../../Slices/UserSlice.tsx'

const Header = () => {
  
  const jwt=useSelector((state:any)=>state.jwt);
 const dispatch=useDispatch();
  const handleLogout = () => {
    dispatch(removeJwt()); // Calling  action to remove JWT
    dispatch(removeUser());// Remove user from the store
    // Optionally, you can redirect to the login page or perform other actions
  };
  return (
    <div className=' bg-light-200 shadow-lg w-full h-16 flex justify-between px-8 items-center'>
         <ActionIcon variant="transparent" size="lg" aria-label="Settings">
          <IconLayoutSidebarLeftCollapseFilled style={{ width: '90%', height: '90%' }} stroke={1.5} />
         </ActionIcon>
         <div className='flex gap-5 items-center'>
          {jwt?<Button color='red' onClick={handleLogout}>Logout</Button>:<Link to="login"><Button>Login</Button></Link>}
          {jwt &&<><ActionIcon variant="transparent" size="md" aria-label="Settings">
             <IconBellRinging style={{ width: '90%', height: '90%' }} stroke={1.5} />
          </ActionIcon>
         <ProfleMenu/></>}
         </div>
    </div>
  )
}

export default Header