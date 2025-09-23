import { MultiSelect, Textarea, TextInput } from '@mantine/core'
import { Fieldset } from 'primereact/fieldset'
import React from 'react'
import { symptoms, tests } from '../../../Data/DropdownData.tsx'

const ApReports = () => {
  return (
    <div>
        <Fieldset className='grid gap-4 grid-cols-2' legend={<span className='text-lg font-medium text-primary-500'> Personal Information</span>}>
           <MultiSelect className='col-span-2' withAsterisk label="Symptoms" placeholder="Pick Symtoms" data={symptoms} hidePickedOptions/>
           <MultiSelect  className='col-span-2' withAsterisk label="Tests" placeholder="Pick Tests" data={tests} hidePickedOptions/>
            <TextInput   withAsterisk label="Diagnosis" placeholder="Diagnosis"/>
            <TextInput   withAsterisk label="Refferal" placeholder="Enter Refferal Details"/>
           <Textarea className='col-span-2' withAsterisk label="Notes" placeholder="Enter Notes"/>
       </Fieldset>
    </div>
  )
}

export default ApReports
/**
  private Long id ;
    private Long patientId;
    private Long doctorId;
    private Long  appointmentId;
    private List<String> symptoms;
    private String diagnosis;
    private List<String> tests;
    private String notes;
    private String referral;
    private PrescriptionDTO prescription;
    private LocalDate followUpDate;
    private LocalDateTime createdAt;
 */