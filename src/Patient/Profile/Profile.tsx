import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DateInput } from '@mantine/dates';
import PhoneInput from 'react-phone-input-2'
import { bloodGroups } from '../../Data/DropdownData.tsx';
import { useDisclosure } from '@mantine/hooks';
const patients:any = 
  {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    dob: "1995-04-12",
    phone: "9876543210",
    address: "Chandigarh, India",
    aadhaarNumber: "1234-5678-9101",
    bloodGroup: "O+",
    allergies: "Dust",
    chronicDiseases: "Asthma"
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
                value={patients.id}
             /></Table.Td>:<Table.Td>{patients.id}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
               {editState?<Table.Td><TextInput
                placeholder="Enter Name"
                value={patients.name}
             /></Table.Td>:
              <Table.Td>{patients.name}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Email</Table.Th>
                 {editState?<Table.Td><TextInput
                placeholder="Enter Email"
                value={patients.email}
             /></Table.Td>:
              <Table.Td>{patients.email}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>DOB</Table.Th>
               {editState?<Table.Td><DateInput
                //label="Date input"
                placeholder="Date of Birth"
              /></Table.Td>:
              <Table.Td>{patients.dob}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Phone</Table.Th>
               {editState?<Table.Td><NumberInput value={patients.phone} maxLength={10} clampBehavior='strict' placeholder='Phone Number' hideControls
/></Table.Td>:
              <Table.Td>{patients.phone}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Address</Table.Th>
               {editState?<Table.Td><TextInput
                placeholder="Enter Address"
                value={patients.address}
             /></Table.Td>:
              <Table.Td>{patients.address}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Aadhaar</Table.Th>
               {editState?<Table.Td><NumberInput value={patients.aadhaarNumber}
                maxLength={12} clampBehavior='strict' placeholder='Aadhar Number' hideControls
                /></Table.Td>:
              <Table.Td>{patients.aadhaarNumber}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Blood Group</Table.Th>
               {editState?<Table.Td><Select data={bloodGroups}  defaultValue="A+"
             /></Table.Td>:
              <Table.Td>{patients.bloodGroup}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Allergies</Table.Th>
               {editState?<Table.Td><TagsInput
                placeholder="Enter Allergies Seperated by comma"
             /></Table.Td>:
              <Table.Td>{patients.allergies}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Chronic Diseases</Table.Th>
               {editState?<Table.Td><TagsInput
                placeholder="Enter Diseases Seperated by comma"
             /></Table.Td>:
              <Table.Td>{patients.chronicDiseases}</Table.Td>}
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