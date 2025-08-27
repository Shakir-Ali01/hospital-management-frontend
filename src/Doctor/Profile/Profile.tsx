import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DateInput } from '@mantine/dates';
import PhoneInput from 'react-phone-input-2'
import { bloodGroups, doctorDepartments, doctorSpecializations } from '../../Data/DropdownData.tsx';
import { useDisclosure } from '@mantine/hooks';
import { getDoctors, updateDoctors } from '../../Service/DoctorProfileService.tsx';
import { useForm } from '@mantine/form';
import { formatDate } from '../../Utility/DataUtil.tsx';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil.tsx';
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
  const[profile,setProfile]=useState<any>({});
  useEffect(()=>{
    getDoctors(user.profileId).then((data)=>{
      setProfile(data);
      console.log(data);
    }).catch((error)=>
      {console.log(error);
    })
  },[])
   const handleEdit=()=>{
    form.setValues({...profile,dob: profile.dob? new Date(profile.dob):null});
    setEditState(true); 
    }
  const form = useForm({
      initialValues: {
      dob: profile.dob,
      phone: profile.phone,
      address: profile.address,
      licenceNumber: profile.licenceNumber,
      department: profile.department,
      specialization: profile.specialization,
      totalExp: profile.totalExp
      },
    });
  const handleSubmit = (e: any) => {  
      let values=form.values;
      e.preventDefault();
      console.log('Form Values:', values);
      // we can perform further actions with the form values here, such as sending them to a server
      const formData = {
      ...profile,
      ...values
    };
      updateDoctors(formData).then((_data)=>{
         setProfile({...profile,...values});
        successNotification("Profile updated successfully");
        console.log("DATA:", _data);
      }).catch((error)=>
        {console.log(error);  
          errorNotification(error.response?.data?.errorMessage || "profile not Updated. Please try again.");
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
                    onClick={ handleEdit }  
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
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>DOB</Table.Th>
               {editState?<Table.Td><DateInput
                 {...form.getInputProps('dob')}
                placeholder="Date of Birth"
                // value={profile.dob}
              /></Table.Td>:
              <Table.Td>{formatDate(profile.dob)??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Phone</Table.Th>
               {editState?<Table.Td><NumberInput value={profile.phone} {...form.getInputProps('phone')}  maxLength={10} clampBehavior='strict' placeholder='Phone Number' hideControls
/></Table.Td>:
              <Table.Td>{profile.phone??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Address</Table.Th>
               {editState?<Table.Td><TextInput
                placeholder="Enter Address"
                {...form.getInputProps('address')}
                value={profile.address}
                
             /></Table.Td>:
              <Table.Td>{profile.address??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Licence Number</Table.Th>
               {editState?<Table.Td><TextInput {...form.getInputProps('licenceNumber')} 
                maxLength={20}  placeholder='Licence Number' 
                value={profile.licenceNumber}
                /></Table.Td>:
              <Table.Td>{profile.licenceNumber??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Specialization</Table.Th>
               {editState?<Table.Td><Select  value={form.values.specialization || profile.specialization || ''} data={doctorSpecializations} {...form.getInputProps('specialization')} defaultValue="Cardiologist"
             /></Table.Td>:
              <Table.Td>{profile.specialization??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Departments</Table.Th>
               {editState?<Table.Td><Select  value={form.values.department || profile.department || ''} {...form.getInputProps('department')} data={doctorDepartments}  defaultValue="Cardiology"
             /></Table.Td>:
              <Table.Td>{profile.department??'-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Total Experience</Table.Th>
               {editState?<Table.Td><NumberInput value={profile.totalExp} {...form.getInputProps('totalExp')}  maxLength={2} max={50}clampBehavior='strict' placeholder='Total Experience' hideControls
/></Table.Td>:
              <Table.Td>{profile.totalExp??'-'} years</Table.Td>}
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