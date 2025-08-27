import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DateInput } from '@mantine/dates';
import PhoneInput from 'react-phone-input-2'
import { bloodGroup, bloodGroups } from '../../Data/DropdownData.tsx';
import { useDisclosure } from '@mantine/hooks';
import { getPatient, updatePatient } from '../../Service/PatientProfileService.tsx';
import { formatDate } from '../../Utility/DataUtil.tsx';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil.tsx';
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
  const[profile,setProfile]=useState<any>({});
    useEffect(()=>{
      console.log("User id in profile:",user);
      getPatient(user.profileId).then((data)=>{
        setProfile({
        ...data,
               allergies: Array.isArray(data.allergies)? data.allergies: (data.allergies ? data.allergies.split(",") : []),
               chronicDiseases: Array.isArray(data.chronicDiseases)? data.chronicDiseases: (data.chronicDiseases ? data.chronicDiseases.split(",") : [])
      });
        console.log("getting patinet info" +data);
      }).catch((error)=>
        {console.log(error);
      })
    },[]);
    
    const form = useForm({
    initialValues: {
    dob: profile.dob,
    phone: profile.phone,
    address: profile.address,
    aadhaarNumber: profile.aadhaarNumber,
    bloodGroup: profile.bloodGroup,
    allergies: Array.isArray(profile.allergies) ? profile.allergies : (profile.allergies ? profile.allergies.split(",") : []),
    chronicDiseases: Array.isArray(profile.chronicDiseases) ? profile.chronicDiseases : (profile.chronicDiseases ? profile.chronicDiseases.split(",") : []),
    },
  });
const handleSubmit = (e: any) => {  
    let values=form.values;
    e.preventDefault();
    console.log('Form Values:', values);
    // we can perform further actions with the form values here, such as sending them to a server
    const formData = {
    ...profile,
    ...values,
    allergies: Array.isArray(values.allergies) ? values.allergies.join(",") : values.allergies,
    chronicDiseases: Array.isArray(values.chronicDiseases) ? values.chronicDiseases.join(",") : values.chronicDiseases,
  };
    updatePatient(formData).then((data)=>{
       setProfile(data);
      successNotification("Profile updated successfully");
      console.log(data);
    }).catch((error)=>
      {console.log(error);  
        errorNotification(error.response?.data?.errorMessage || "Login failed. Please try again.");
        console.error("Login failed:", error);
    }).finally(()=>{
      setEditState(false);
    });
   
}
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
            {/* Edit or Save Button */}
          {!editState ? (
            <Button
              leftSection={<IconEdit />}
              className="bg-primary-400 hover:bg-primary-500 text-dark"
              onClick={() => setEditState(true)}
              type="button"
            >Edit Profile
            </Button>
          ) : (
              
            <Button
                className="bg-primary-400 hover:bg-primary-500 text-dark"
                type="submit"
                onClick={ handleSubmit }
              >Save Changes</Button>
          )}

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
          
          <Table.Tbody className='[&>tr]:!mb-3 [&>td]:!w-1/2'>
            <Table.Tr>
              <Table.Th>DOB</Table.Th>
               {editState?<Table.Td><DateInput
                 {...form.getInputProps('dob')}
                placeholder="Date of Birth"
              /></Table.Td>:
              <Table.Td>{formatDate(profile.dob)}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Phone</Table.Th>
               {editState?<Table.Td><NumberInput   {...form.getInputProps('phone')}maxLength={10} clampBehavior='strict' placeholder='Phone Number' hideControls
/></Table.Td>:
              <Table.Td>{profile.phone??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Address</Table.Th>
               {editState?<Table.Td><TextInput
                placeholder="Enter Address"
                
                 {...form.getInputProps('address')}
             /></Table.Td>:
              <Table.Td>{profile.address??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Aadhaar</Table.Th>
               {editState?<Table.Td><NumberInput 
                maxLength={12} clampBehavior='strict'  {...form.getInputProps('aadhaarNumber')} placeholder='Aadhar Number' hideControls
                /></Table.Td>:
              <Table.Td>{profile.aadhaarNumber??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Blood Group</Table.Th>
               {editState?<Table.Td><Select {...form.getInputProps('bloodGroup')} data={bloodGroups}  defaultValue="A+"
             /></Table.Td>:
              <Table.Td>{bloodGroup[profile.bloodGroup]??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Allergies</Table.Th>
               {editState?<Table.Td><TagsInput
                placeholder="Enter Allergies Seperated by comma"
                {...form.getInputProps('allergies')}
             /></Table.Td>:
              <Table.Td>{profile.allergies??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Chronic Diseases</Table.Th>
               {editState?<Table.Td><TagsInput
                placeholder="Enter Diseases Seperated by comma"
                {...form.getInputProps('chronicDiseases')}
             /></Table.Td>:
              <Table.Td>{profile.chronicDiseases??'-'}</Table.Td>}
            </Table.Tr>
          </Table.Tbody>
    </Table>

        </div>

       </div>
       
        {/* Modal for uploading profile picture */}
       <Modal opened={opened} onClose={close} title={<span className='text-xl font-medium'>Upload Profile Picture</span>} centered>
        {/* Modal content */}
      </Modal>

    </div>
    
  )
}
export default Profile