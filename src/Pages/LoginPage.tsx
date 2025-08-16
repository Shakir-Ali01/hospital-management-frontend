import { Button, PasswordInput, TextInput } from '@mantine/core'
import { IconHeartbeat } from '@tabler/icons-react'

import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/UserService.tsx';
import { errorNotification, successNotification } from '../Utility/NotificationUtil.tsx';
import { useDispatch } from 'react-redux';
import { setJwt } from '../Slices/JwtSlices.tsx';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slices/UserSlice.tsx';
const LoginPage = () => {
     const dispatch=useDispatch();
     const navegate = useNavigate();
     const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    loginUser(values)
      .then((_response) => { 
        console.log(jwtDecode(_response));
        // Handle successful login, e.g., redirect to dashboard
        successNotification("Login successful!");
        // You can also store the token in localStorage or context if needed
        dispatch(setJwt(_response));//seting the jwt token in redux store
        dispatch(setUser(_response));//setUser decoding the  token to  get all the cliams from it
        // window.location.href = '/dashboard'; // Redirect to dashboard
        // navegate('/dashboard'); // Redirect to dashboard using useNavigate
  })
      .catch((error) => {
        errorNotification(error.response?.data?.errorMessage || "Login failed. Please try again.");
        console.error("Login failed:", error);  
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
            <div className='self-center font-medium font-heading text-white text-xl'>Login</div>
            <TextInput {...form.getInputProps('email')}  variant="unstyled" size="md" radius="md" placeholder="Email" />
            <PasswordInput {...form.getInputProps('password')} variant="unstyled" size="md" radius="md" placeholder="Password" />
            <Button radius="md" size="md" type='submit' color="pink"> Login </Button>
            <div className='text-neutral-100 text-sm self-center'>Don't have an account? <Link to="/register">Register</Link></div>
        </form>
     </div>
    </div>
  )
}

export default LoginPage
