
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { SegmentedControl } from '@mantine/core';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import { LoadingOverlay, Modal, Select, Textarea, TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import {  Text } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { getDoctorDropdown } from '../../../Service/DoctorProfileService.tsx';
import { DatePicker, DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { appointmentReasons } from '../../../Data/DropdownData.tsx';
import { useSelector } from 'react-redux';
import { cancelAppointment, getAppointmentByDoctorId, getAppointmentByPatientId, scheduleAppointment } from '../../../Service/AppointmentService.tsx';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil.tsx';
import { formatDateWithTime } from '../../../Utility/DataUtil.tsx';
import { ActionIcon} from '@mantine/core';
import { IconEdit,IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { Toolbar } from 'primereact/toolbar';


interface Country {
  name: string;
  code: string;
}

interface Representative {
  name: string;
  image: string;
}

interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string | Date;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

const Appointment=()=> {
     const [loading, setLoading]=useState(false);
     const [opened, { open, close }] = useDisclosure(false);
    
     const [appointment,setAppointment] = useState<any[]> ([]);
     const [tab,setTab] = useState<String> ("Today");
    const user=useSelector((state:any)=>state.user);
    const[doctors,setDoctors]=useState<any[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        doctorName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        patientPhone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        reason: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { value: null, matchMode: FilterMatchMode.IN },
        notes: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
       
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    
    const [statuses] = useState<string[]>(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status: string) => {
        switch (status) {
            case 'CANCELLED':
                return 'danger';

            case 'COMPLETED':
                return 'success';

            case 'SCHEDULED':
                return 'info';

            case 'negotiation':
                return 'warning';

            default:
                return null;
        }
    };

    useEffect(() => {
      //  getting appointment Data of particular patient By Patient Id
       fetchData();
       getDoctorDropdown().then((data)=>{
        console.log("Doctor Date,",data);
        setDoctors(data.map((doctor:any)=>({
          value:""+doctor.id,
          label: doctor.name
        })));
      }).catch((error)=>{
        console.log("Error fetching doctors:",error);
       });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data: Customer[]) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const formatDate = (value: string | Date) => {
        return new Date(value).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters:any = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
     const form = useForm({
         initialValues: {
           doctorId: '',
           patientId: user.profileId,
           appointmentDateTime:new Date(),
           reason:'',
           notes:''
         },
     
         validate: {
           doctorId: (value) => !value  ? 'Doctor is Required' : undefined,
           patientId: (value) => !value  ? 'Patient is Required' : undefined,
           appointmentDateTime: (value)=>!value  ? 'appointmentDateTime is Required' : undefined,
           reason: (value)=>!value  ? 'Reason is Required' : undefined,
         },
       });
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                {/* <h4 className="m-0"></h4> */}
               <Button onClick={open} leftSection=<IconPlus/> variant="filled">Schedule Appoinment</Button>
                    <TextInput leftSection=<IconSearch/> fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                
            </div>
        );
    };

    const countryBodyTemplate = (rowData: Customer) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span>{rowData.country.name}</span>
            </div>
        );
    };

  

    

    

   
    const balanceBodyTemplate = (rowData: Customer) => {
        return formatCurrency(rowData.balance);
    };

    const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const statusBodyTemplate = (rowData: Customer) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e: DropdownChangeEvent) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option: string) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    const activityBodyTemplate = (rowData: Customer) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    };

    
     const handleDelete=(rowData:any)=>{
        modals.openConfirmModal({
        title: <span className='text-xl font-serif font-semibold'>Are You Sure!</span>,
        centered:true,
        children: (
          <Text size="sm">
            You want to delete this appointment?
          </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => {
          console.log('Cancel')
        },
        onConfirm: () => {
           cancelAppointment(rowData.id).then(()=>{
               successNotification("Appointment Cancelled succussfully");
               setAppointment(appointment.map((appo)=>
                appo.id!==rowData.id ? {...appo,status:"CANCELLED"} : appo));
           }).catch((error)=>{
           errorNotification(error?.response?.data?.errorMessage);
           })
        },
      });
     }
    const actionBodyTemplate = (rowData) => {
        return <div>
                  <ActionIcon color='red' onClick={()=>handleDelete(rowData)}>
                      <IconTrash size={20} stroke={1.5}/>
                  </ActionIcon>
                  
               </div>
    }; 
    const fetchData=()=>{
       getAppointmentByDoctorId(user.profileId).then((data)=>{
        console.log("Data ",data);
       setAppointment(getCustomers(data));
      }).catch((error)=>{
        console.log("error")
      })
    }
    const handleSubmit=(values:any)=>{      
       console.log("Appointment Schedule with values:",values);
       setLoading(true);
       scheduleAppointment(values).then((data)=>{
        close();
        form.reset();
        fetchData();
        successNotification("Appointment Scedule Successfully");
       }).catch((error)=>{
          console.log(error);
          errorNotification(error.response?.data?.errorMessage || "Failed to Schedule appointmet");
       }).finally(()=>{
        setLoading(false);
       })
    }
    const header = renderHeader();

    const timeTemplate=(rowData:any)=>{
      return <span>{formatDateWithTime(rowData.appointmentDateTime)}</span>
    }
    const rightToolbarTemplate=()=>{
      
       return  <div><TextInput leftSection=<IconSearch/> fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" /></div>
    } 
    const leftToolbarTemplate=()=>{
       return  <SegmentedControl
      value={tab}
      variant="filled"
      color={tab==="Today" ? "blue": tab==="Upcoming" ? "green":"red"}
      onChange={setTab}
      data={["Today","Upcoming","Past"
      ]}
    />
       
    }
    
    const filterAppointment=appointment.filter((appointment)=>{
        const appointmentDate=new Date (appointment.appointmentDateTime);
        const today= new Date();
        today.setHours(0,0,0,0);
        if(tab ==="Today"){
          return appointmentDate.toDateString()== today.toDateString();
        }else if(tab === "Upcoming"){
            return appointmentDate>today;
        }else if(tab==="Past"){
            return appointmentDate<today;
        }
        return true;//default case show all appointment
    });
    return (
        <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}  right={rightToolbarTemplate}></Toolbar>
            <DataTable value={filterAppointment} size='small' paginator rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id" selectionMode="checkbox" selection={selectedCustomers} 
          
                    filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'reason', 'notes', 'balance', 'status']}
                    emptyMessage="No Appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                
                <Column field="patientName" header="Patient" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="patientPhone" header="Phone"  sortable filter   style={{ minWidth: '14rem' }}   dataType="text"  />
                <Column field="appointmentDateTime" header="Appointment Time" sortable   style={{ minWidth: '14rem' }} body={timeTemplate} />
                <Column field="reason" header="Reason" sortable filter  style={{ minWidth: '14rem' }}  />
                <Column field="notes" header="Notes" sortable filter  style={{ minWidth: '14rem' }}  />
                <Column field="status" header="Status" sortable filter filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter  />
                
               
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>
             <Modal opened={opened} size="md"onClose={close} title={<div className='text-xl font-semobold text-primary-500'>Schedule Appointment</div>} centered>
                    {/* Modal content */}
                    <form onSubmit={form.onSubmit(handleSubmit)} className='grid grid-cols-1 gap-5'>
                       <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                      <Select {...form.getInputProps('doctorId')}withAsterisk data={doctors} label="Doctor" placeholder='Select Doctor'/>
                      <DateTimePicker minDate={new Date()} 
                         valueFormat="DD/MM/YYYY hh:mm A"
                         valueFormatter={(value) =>
                                value
                                ? value.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                                : ""
                            }
                      {...form.getInputProps('appointmentDateTime')} withAsterisk label="Appointment" placeholder="Pick Date And Time"/>
                      <Select {...form.getInputProps('reason')} withAsterisk label="Reason" data={appointmentReasons} placeholder='Reason For Appointment'/>
                      <Textarea {...form.getInputProps('notes')}   label="Additionla Notes" placeholder='Enter any adintional Note'/>
                      <Button type="submit" variant='filled' fullWidth >Book Apointment</Button>
                    </form>
        
              </Modal>
        </div>
    );
}
              
export default Appointment


