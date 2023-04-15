import React, { useContext, useState } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';

const SIgnIn = ({ setLoginFrom }) => {
    const { login, setLoading, loading, socialLogin } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const googleProvider = new GoogleAuthProvider()


    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                if(user?.uid){

                    setLoading(false)
                    navigate(from, { replace: true });
                }

            })
            .catch(error => {

                setLoading(false)
                setErrorMsg("Wrong email or password")
            })
    }



    const handleSocialLogin = (provider) => {
        socialLogin(provider)
            .then(result => {
                const user = result.user;
                if(user.uid){

                    navigate(from, { replace: true });
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            });

    }

    

    if (loading) {
        return <h5 className='fixed top-1/2 left-1/2 animate-bounce'>Loading...</h5>

    }
    return (
        <div className=" py-32 w-full flex justify-center">
            <div className='p-10 bg-gray-400 w-96'>
                <h1 className="text-center font-bold text-2xl">Sign In</h1>
                <form onSubmit={handleLogin}>
                    <div className='flex flex-col my-3 items-start'>
                        <label htmlFor="email" className='font-bold'>Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" className="p-2 border-none outline-none duration-500 w-5/6 focus:w-full" />
                    </div>
                    <div className='flex flex-col my-3'>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="password" className='font-bold'>Password</label>
                            <span onClick={() => setShowPass(!showPass)} className='cursor-pointer'>
                                {
                                    showPass ?
                                        <h5 className='text-red-600'>Hide</h5>
                                        :
                                        <h5 className='text-stone-600' >Show</h5>

                                }
                            </span>
                        </div>
                        <input type={showPass ? 'text' : 'password'} name="password" id="password" placeholder="Password" className="p-2 border-none outline-none duration-500 w-5/6 focus:w-full" />
                    </div>
                    <p className='text-red-500 font-semibold'>{errorMsg}</p>

                    <input type="submit" className='md:mx-3 my-3 py-2 px-5 text-lg font-semibold  border border-black duration-500 rounded-lg hover:rounded-2xl hover:scale-95' value="Sign In" />
                </form>
                <h4>New Here?  <button onClick={() => setLoginFrom(false)} className='text-black font-semibold underline'>Create Account</button></h4>
                <button onClick={() => handleSocialLogin(googleProvider)} className='flex items center justify-center px-5 py-2 rounded-full my-5 bg-gray-600 text-white'>Sign In With Google</button>
            </div>

        </div>
    );
};

export default SIgnIn;