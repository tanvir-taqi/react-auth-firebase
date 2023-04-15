import React, { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='py-32'>
            <h1 className='text-4xl font-bold  text-center my-4'>Welcome</h1>
            {
                user?.uid ? "": <Link to='/join' className=' py-2 px-5 text-lg font-semibold my-4 border border-black duration-500 rounded-lg hover:rounded-2xl hover:scale-105 '>Sign In Now</Link>
            }
            
        </div>
    );
};

export default Home;