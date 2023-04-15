import React, { useContext, useState } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp = ({ setLoginFrom }) => {
    const { createUser, setLoading, loading } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || "/";

    const handleSignUp = (event) => {
        event.preventDefault()
        setLoading(true)
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value


        if (password !== confirm) {
            return setErrorMsg("Password did not match")
        } else {
            createUser(email, password)
                .then(result => {
                    const user = result.user;
                    if(user?.uid){

                        navigate(from, { replace: true });
                        setLoading(false)
                    }
                })
                .catch(error => {
                    setLoading(false)
                    if (error) {
                        setErrorMsg("Password should be at least 6 characters")
                    }

                });
        }
    }

    if (loading) {
        return <h5 className='fixed top-1/2 left-1/2 animate-bounce'>Loading...</h5>

    }

    return (
        <div className=" py-32 w-full flex justify-center">
            <div className='p-10 bg-gray-400 w-96'>
                <h1 className="text-center font-bold text-2xl">Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <div className='flex flex-col my-3 items-start'>
                        <label htmlFor="email" className='font-bold'>Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" className="p-2 border-none outline-none duration-500 w-5/6 focus:w-full" />
                    </div>
                    <div className='flex flex-col my-3'>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="password" className='font-bold'>Password</label>

                        </div>
                        <input type='password' name="password" id="password" placeholder="Password" className="p-2 border-none outline-none duration-500 w-5/6 focus:w-full" />
                    </div>
                    <div className='flex flex-col my-3'>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="confirm" className='font-bold'>Confirm Password</label>

                        </div>
                        <input type='password' name="confirm" id="confirm" placeholder="Confirm Password" className="p-2 border-none outline-none duration-500 w-5/6 focus:w-full" />
                    </div>
                    <p className='text-red-500 font-semibold'>{errorMsg}</p>

                    <input type="submit" className='md:mx-3 my-3 py-2 px-5 text-lg font-semibold  border border-black duration-500 rounded-lg hover:rounded-2xl hover:scale-95' value="Sign Up" />
                </form>
                <h4>Already have an account?   <button onClick={() => setLoginFrom(true)} className='text-black font-semibold underline'>Sign In Now</button></h4>
            </div>

        </div>
    );
};

export default SignUp;