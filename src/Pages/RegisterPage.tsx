import { Button, PasswordInput, Progress, SegmentedControl, TextInput, Text } from '@mantine/core'
import { IconHeartbeat } from '@tabler/icons-react'

import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import React, { use, useState } from 'react';
import { registerUser } from '../Service/UserService.tsx';
import { errorNotification, successNotification } from '../Utility/NotificationUtil.tsx';

// const getPasswordStrength = (password: string): number => {
//   let strength = 0;
//   if (password.length >= 8) strength += 20;
//   if (/[A-Z]/.test(password)) strength += 20;
//   if (/[a-z]/.test(password)) strength += 20;
//   if (/\d/.test(password)) strength += 20;
//   if (/[@$!%*?&]/.test(password)) strength += 20;
//   return strength;
// };
function getPasswordStrength(password) {
  let score = 0;

  // Conditions for scoring
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&]/.test(password)) score += 1;

  return (score / 5) * 100; // return percentage
}

const RegisterPage = () => {
     const navigate=useNavigate();
     const form = useForm({
    initialValues: {
      name: '',
      role:"PATIENT",
      email: '',
      password: '',
      confirmPassword:''
    },
     validateInputOnChange: true, // ✅ live validation on every keystroke
     //validateInputOnChange: ["password", "confirmPassword"] , // ✅ live validation only for these fields
    validate: {
      name: (value) => (value.trim() ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => {
        if (!value) return "Password is required";
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

        return !passwordRegex.test(value)
          ? "Password must be 8–15 characters and include uppercase, lowercase, number, and special character"
          : null;
      },
      confirmPassword:(value,values)=>(value===values.password?null:"Password not Match"
      ),

    },
  });

  const [strength, setStrength] = useState(0);

  const handlePasswordChange = (event) => {
    const newValue = event.currentTarget.value;
    setStrength(getPasswordStrength(newValue));
    form.setFieldValue('password', newValue);
  };

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    registerUser(values).then((response) => {
      console.log("User registered successfully:", response)
      successNotification("User registered successfully!");
      navigate('/login'); // Redirect to login page after successful registration
    }).catch((error) => {
      errorNotification(error.response.data.errorMessage);
    })};
  return (
    <div style={{ background:'url("/login-bg.png")' }} className='h-screen w-screen !bg-cover !bg-center
    !bg-no-repeat flex flex-col items-center justify-center'>
         <div className='py-3 text-pink-500 flex gap-1 items-center'>
            <IconHeartbeat size={40} stroke={2.5}/>
            <span className='font-heading font-semibold text-4xl'>Pulse</span>
        </div>
     <div className='w-[650px] backdrop-blur-md p-10 py-8 rounded-lg'>
        <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-5 [&__input]:placeholder-neutral-100
         [&_.mantine-Input-input]:!border-white [&_.mantine-Input-input]:!border
         focus-within:[&_.mantine-Input-input]:!border-pink-400 
            [&__input]:!pl-2 [&_svg]:text-white    [&__input]:!text-white
            '>
            <div className='self-center font-medium font-heading text-white text-xl'>Register</div>
            <SegmentedControl {...form.getInputProps('role')} bg='none' className='[&_*]:text-white border border-white' color='pink' fullWidth size="md" radius="md" data={[{label:'Patient',value:'PATIENT'},
                {label:'Doctor',value:'DOCTOR'},{label:'Admin',value:'ADMIN'}]} />
            <TextInput {...form.getInputProps('name')}  variant="unstyled" size="md" radius="md" placeholder="Name" />
            <TextInput {...form.getInputProps('email')}  variant="unstyled" size="md" radius="md" placeholder="Email" />
            {/* <PasswordInput {...form.getInputProps('password')} variant="unstyled" size="md" radius="md" placeholder="Password" /> */}
            {/* Password field with live strength meter */}
          <div>
            <PasswordInput
              value={form.values.password}
              onChange={handlePasswordChange}
              variant="unstyled"
              size="md"
              radius="md"
              placeholder="Password"
              error={form.errors.password}
            />
            {form.values.password && (
              <>
                <Progress value={strength} color={strength < 60 ? 'red' : strength < 80 ? 'yellow' : 'green'} mt="xs" size="sm" radius="md" />
                <Text size="xs" mt={4} color={strength < 60 ? 'red' : strength < 80 ? 'yellow' : 'green'}>
                  {strength < 60 ? 'Weak' : strength < 80 ? 'Medium' : 'Strong'}
                </Text>
              </>
            )}
          </div>
            <PasswordInput {...form.getInputProps('confirmPassword')} variant="unstyled" size="md" radius="md" placeholder="confirmPassword" />
            <Button radius="md" size="md" type='submit' color="pink"> Register </Button>
            <div className='text-neutral-100 text-sm self-center'>Have an account? <Link to="/login">Login</Link></div>
        </form>
     </div>
    </div>
  )
}

export default RegisterPage;
