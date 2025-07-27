import { ActionIcon } from '@mantine/core'
import {IconBellRinging, IconLayoutSidebarLeftCollapseFilled } from '@tabler/icons-react'
import ProfleMenu from './ProfleMenu.tsx'

const Header = () => {
  return (
    <div className=' bg-cyan-200 w-full h-16 flex justify-between px-8 items-center'>
         <ActionIcon variant="transparent" size="lg" aria-label="Settings">
          <IconLayoutSidebarLeftCollapseFilled style={{ width: '90%', height: '90%' }} stroke={1.5} />
         </ActionIcon>
         <div className='flex gap-5 items-center'>
          <ActionIcon variant="transparent" size="md" aria-label="Settings">
             <IconBellRinging style={{ width: '90%', height: '90%' }} stroke={1.5} />
          </ActionIcon>
         
         <ProfleMenu/>
         </div>
    </div>
  )
}

export default Header