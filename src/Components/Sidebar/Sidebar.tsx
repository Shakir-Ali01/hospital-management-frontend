import { Avatar,Text } from '@mantine/core'
import { IconCalendarCheck, IconHeartbeat, IconLayout2, IconLayoutDashboard, IconMoodHeart, IconPrescription, IconStethoscope, IconVaccine } from '@tabler/icons-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
const links=[
    {name:"Dashboard",url:"/dashboard",icon:<IconLayoutDashboard stroke={1.5}/>},
    {name:"Doctors", url:"/doctors",icon:<IconStethoscope stroke={1.5}/>},
    {name:"Patients", url:"/patients", icon:<IconMoodHeart stroke={1.5}/>},
    {name:"Appointments", url:"/appointments", icon:<IconCalendarCheck stroke={1.5}/>},
    {name:"Pharmacy", url:"/pharmacy", icon:<IconVaccine stroke={1.5}/>},

]
const Sidebar = () => {
    const user=useSelector((state:any)=>state.user);
  return (
    <div className='flex'>
        <div className='w-64'>

        </div>
    <div className='w-64 fixed h-screen hide-scrollbar overflow-y-auto bg-dark flex flex-col gap-7 items-center '>
        <div className='fixed z-[500] py-3 bg-dark text-primary-400 flex gap-1 items-center'>
            <IconHeartbeat size={40} stroke={2.5}/>
            <span className='font-heading font-semibold text-3xl'>Pulse</span>
        </div>
        {/* start menu(Navlink) of the sideBar icluding profile icon */}
        <div className='flex flex-col gap-5 mt-20'>
        <div className='flex flex-col gap-1 items-center'>
        <div className='bg-primary-400  p-1 rounded-full drop-shadow-xl'>
             <Avatar src="avatar.avif" size="xl" alt="it's me" />
        </div>
        <span className='font-medium text-light'>{user.name}</span>
        <Text c="dimmed" size="xs" className='text-light'>{user.role}</Text>
        </div>
        <div className='flex flex-col gap-1'>
            {
                links.map((link)=>{
                    return <NavLink to={link.url} key={link.url} className={({isActive})=>`flex items-center gap-3 w-full font-medium text-neutral-900 px-5 py-5 text-light rounded-lg 
                              ${isActive?"bg-primary-400 text-dark":"hover:bg-gray-100 hover:text-dark"}`}>
                            {link.icon}
                            <span>{link.name}</span>
                       
                    </NavLink>
                })
            }
        </div>
    </div>
    </div>
    </div>
  )
}

export default Sidebar