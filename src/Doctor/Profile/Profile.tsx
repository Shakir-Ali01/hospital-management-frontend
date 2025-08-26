import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DateInput } from '@mantine/dates';
import PhoneInput from 'react-phone-input-2'
import { bloodGroups, doctorDepartments, doctorSpecializations } from '../../Data/DropdownData.tsx';
import { useDisclosure } from '@mantine/hooks';
const doctor: any = {
  id: 1,
  name: "Dr. Anjali Mehta",
  email: "anjali.mehta@example.com",
  dob: "1980-06-22",
  phone: "9876501234",
  address: "Chandigarh, India",
  licenceNo: "DOC-CHD-4521",
  specialization: "Cardiologist",
  department: "Cardiology",
  totalExp: 15
};
const Profile = () => {
   const [opened, { open, close }] = useDisclosure(false);//modal
   const[editState,setEditState]=useState(false);
  const user=useSelector((state:any) => state.user);
  return (
    <div className='p-10'>
      <div className='flex justify-between items-center mb-5'>
       <div className='flex gap-5 items-center'>
         <div className='flex flex-col gap-2 items-center'>
          <Avatar src="/avatar.avif" size="120" alt="it's me" />
          {editState && <Button size="sm" onClick={open} className='bg-primary-400 hover:bg-primary-500 text-dark'>upload</Button>  }
         </div>
         
         <div className='flex flex-col gap-2'>
              <div className='text-3xl font-medium text-neutral-900'> {user.name}</div>
              <div className='text-xl  text-neutral-700'>{user.email}</div>
         </div>
       </div>
       {!editState?<Button leftSection={<IconEdit/>}className='bg-primary-400 hover:bg-primary-500 text-dark' onClick={()=>setEditState(true)}>Edit Profile</Button>  
       :<Button leftSection={<IconEdit/>}className='bg-primary-400 hover:bg-primary-500 text-dark' onClick={()=>setEditState(false)}>Save Changes</Button>  }
       </div>
       <Divider my="xl" />
       <div>
          <div className='text-2xt font-medium text-neutral-900'>Personal Information</div>
        <div className="overflow-x-auto">
      <Table
      striped
      stripedColor='primary.1'
      
      withColumnBorders={false}
   
      >
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              {editState?<Table.Td><TextInput
                placeholder="Input placeholder"
                value={doctor.id}
             /></Table.Td>:<Table.Td>{doctor.id}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
               {editState?<Table.Td><TextInput
                placeholder="Enter Name"
                value={doctor.name}
             /></Table.Td>:
              <Table.Td>{doctor.name}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Email</Table.Th>
                 {editState?<Table.Td><TextInput
                placeholder="Enter Email"
                value={doctor.email}
             /></Table.Td>:
              <Table.Td>{doctor.email}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>DOB</Table.Th>
               {editState?<Table.Td><DateInput
                //label="Date input"
                placeholder="Date of Birth"
              /></Table.Td>:
              <Table.Td>{doctor.dob}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Phone</Table.Th>
               {editState?<Table.Td><NumberInput value={doctor.phone} maxLength={10} clampBehavior='strict' placeholder='Phone Number' hideControls
/></Table.Td>:
              <Table.Td>{doctor.phone}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Address</Table.Th>
               {editState?<Table.Td><TextInput
                placeholder="Enter Address"
                value={doctor.address}
             /></Table.Td>:
              <Table.Td>{doctor.address}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Licence Number</Table.Th>
               {editState?<Table.Td><TextInput value={doctor.licenceNo}
                maxLength={20}  placeholder='Licence Number' 
                /></Table.Td>:
              <Table.Td>{doctor.licenceNo}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Specialization</Table.Th>
               {editState?<Table.Td><Select data={doctorSpecializations}  defaultValue="Cardiologist"
             /></Table.Td>:
              <Table.Td>{doctor.specialization}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Departments</Table.Th>
               {editState?<Table.Td><Select data={doctorDepartments}  defaultValue="Cardiology"
             /></Table.Td>:
              <Table.Td>{doctor.department}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Total Experience</Table.Th>
               {editState?<Table.Td><NumberInput value={doctor.phone} maxLength={2} max={50}clampBehavior='strict' placeholder='Total Experience' hideControls
/></Table.Td>:
              <Table.Td>{doctor.totalExp} years</Table.Td>}
            </Table.Tr>
          </Table.Tbody>
    </Table>

        </div>

       </div>
       <Modal opened={opened} onClose={close} title={<span className='text-xl font-medium'>Upload Profile Picture</span>} centered>
        {/* Modal content */}
      </Modal>

     
    </div>
    
  )
}
export default Profile