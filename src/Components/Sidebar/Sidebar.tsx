import { Avatar,Text } from '@mantine/core'
import { IconCalendarCheck, IconHeartbeat, IconLayout2, IconLayoutDashboard, IconMoodHeart, IconPrescription, IconStethoscope, IconVaccine } from '@tabler/icons-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
const links=[
    {name:"Dashboard",url:"/dashboard",icon:<IconLayoutDashboard stroke={1.5}/>},
    {name:"Doctors", url:"/doctors",icon:<IconStethoscope stroke={1.5}/>},
    {name:"Patients", url:"/patients", icon:<IconMoodHeart stroke={1.5}/>},
    {name:"Appointments", url:"/appointments", icon:<IconCalendarCheck stroke={1.5}/>},
    {name:"Pharmacy", url:"/pharmacy", icon:<IconVaccine stroke={1.5}/>},
]
const Sidebar = () => {
  return (
    <div className='w-64 bg-red-200 flex flex-col gap-7 items-center py-3'>
        <div className='text-red-500 flex gap-1 items-center'>
            <IconHeartbeat size={40} stroke={2.5}/>
            <span className='font-heading font-semibold text-3xl'>Pulse</span>
        </div>
        <div className='flex flex-col gap-1 items-center'>
        <div className='bg-black p-1 rounded-full drop-shadow-xl'>
             <Avatar src="avatar.avif" size="xl" alt="it's me" />
             
        </div>
        <span className='font-medium'>Boss</span>
        <Text c="dimmed" size="xs">Admin</Text>
        </div>
        <div className='flex flex-col gap-1'>
            {
                links.map((link)=>{
                    return <NavLink to={link.url} key={link.url} className={({isActive})=>`flex items-center gap-3 w-full font-medium text-neutral-900 px-5 py-5 rounded-lg 
                              ${isActive?"bg-primary-400":"hover:bg-gray-100"}`}>
                            {link.icon}
                            <span>{link.name}</span>
                       
                    </NavLink>
                })
            }
        </div>
    </div>
  )
}

export default Sidebar