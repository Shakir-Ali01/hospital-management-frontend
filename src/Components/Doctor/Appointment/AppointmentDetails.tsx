import { Badge, Breadcrumbs,Text, Card, Group, Title, Tabs, Divider } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getAppointmentById, getAppointmentWithName } from '../../../Service/AppointmentService.tsx';
import { formatDateWithTime } from '../../../Utility/DataUtil.tsx';
import { IconClipboardHeart, IconMessageCircle, IconPhoto, IconSettings, IconStethoscope } from '@tabler/icons-react';
import ApReports from './ApReports.tsx';

const AppointmentDetails = () => {
    const {id} = useParams();
    const[appointment,setAppointment]=useState<any>({});
    useEffect(()=>{
        //fetch appointment details by id
       getAppointmentWithName(id).then((res)=>{
        console.log("Appointment Details ",res);
        setAppointment(res);
       }).catch((err)=>{
        console.log("Error Fetching Appointment Details ",err);
       });
       },[])
  return (
    <div>
          <Breadcrumbs my="md">
            <Link className="text-primary-400 hover:underline" to="/doctor/dashboard">Dashboard</Link>
             <Link className="text-primary-400 hover:underline" to="/doctor/appointments">Appointments</Link>
             <span className="text-primary">Appointment Details</span>
          </Breadcrumbs>
          <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Title order={4} > #{appointment.patientName}</Title>
        <Badge color={appointment.status === "SCHEDULED" ? "green" : "red"}>
          {appointment.status}
        </Badge>
      </Group>

      
        <div className='grid grid-cols-2 gap-6 mb-2'>
         <Text size="sm" color="dimmed"><b>Name :</b> {appointment.patientName}</Text>
         <Text size="sm" color="dimmed"><b>Email:</b> {appointment.patientEmail}</Text>
        </div>
         <div className='grid grid-cols-2 gap-6 mb-2'>
         <Text size="sm" color="dimmed"><b>Reason :</b> {appointment.reason}</Text>
         <Text size="sm" color="dimmed"><b>Appointment Date :</b> {formatDateWithTime(appointment.appointmentDateTime)}</Text>
        </div>
      {appointment.notes && (
        <div className='grid grid-cols-2 gap-6 mb-2'>
        <Text size="sm" color="dimmed"><b>Notes:</b> {appointment.notes}</Text>
        </div>
      )}
    </Card>
    <div className='py-4 '>
     <Tabs variant="pills" defaultValue="medical">
      <Tabs.List>
        <Tabs.Tab value="medical" leftSection={<IconStethoscope size={20} />}>
          Medical History
        </Tabs.Tab>
        <Tabs.Tab value="prescriptions" leftSection={<IconClipboardHeart size={20} />}>
          Prescriptions
        </Tabs.Tab>
        <Tabs.Tab value="report" leftSection={<IconClipboardHeart size={20} />}>
          Reports
        </Tabs.Tab>
      </Tabs.List>
       <Divider my="md" />
      <Tabs.Panel value="medical">
        Medical
      </Tabs.Panel>

      <Tabs.Panel value="prescriptions">
        Prescription
      </Tabs.Panel>

      <Tabs.Panel value="report">
        <ApReports/>
      </Tabs.Panel>
    </Tabs>
    </div>
          </div>
    </div>
  )
}

export default AppointmentDetails

