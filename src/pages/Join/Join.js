import React, { useState } from 'react';
import SIgnIn from '../SignIn/SIgnIn';
import SignUp from '../SignUp/SignUp';

const Join = () => {
    const [loginForm, setLoginFrom] = useState(true)
    return (
        <div className=''>
            <div className='md:mx-auto md:px-16 p-2    grid grid-cols-1  md:grid-cols-2 gap-6 items-center w-full h-full'>
                <div className='w-full flex justify-center items-center h-full'>
                    <div>

                        <h1 className='text-2xl text-center font-bold'>Join Now!!</h1>

                    </div>
                </div>

                <div>
                    {
                        loginForm ? <SIgnIn setLoginFrom={setLoginFrom} ></SIgnIn> : <SignUp setLoginFrom={setLoginFrom} ></SignUp>
                    }
                </div>

            </div>
        </div>
    );
};

export default Join;