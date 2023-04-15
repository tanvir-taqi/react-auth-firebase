import React, { useContext, useState } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [display, setDisplay] = useState(false)

    const { user, logOut,loading,setLoading } = useContext(AuthContext);

    console.log('====================================');
    console.log(user?.email);
    console.log('====================================');


    const handleLogOut = () => {
        const agreeToLogout = window.confirm("Are You Sure?")
        if (agreeToLogout) {
            logOut()
                .then(res => {
                    setLoading(false)
                 })
                .catch(err => console.log(err))
        }
    }

    if (loading) {
        return <h5 className='fixed top-1/2 left-1/2 animate-bounce'>Loading...</h5>

    }

    return (
        <div>
            <div className='' >
            <div className={`fixed top-0 bg-gray-200 z-50 w-full py-1 flex flex-col md:flex-row justify-around items-center `}>
                <div className="header-logo flex justify-around around items-center w-full  md:w-1/6">

                    

                    <Link to='/' className={`font-bold flex  text-xl `}>
                        <h1 className='text-gray-800 '>React Auth</h1>
                    </Link>

                    <button className='block md:hidden font-bold text-black text-xl' onClick={() => setDisplay(!display)}>B</button>
                </div>
                
                <div className={`nav-menu flex  md:items-center flex-col md:flex-row   ${display ? 'flex' : 'hidden md:flex'}`} >
                    <div onClick={() => setDisplay(false)} className="nav-menu-link items-start flex flex-col md:flex-row py-12 md:py-1 ">
                          <NavLink className={({ isActive }) => (isActive ? ' underline mr-4 text-lg font-semibold   my-2 text-gray-700 ' : 'mr-4 text-lg font-semibold text-gray-500   my-2')} to='/'>Home</NavLink>
                        {
                            user?.uid ? <>
                                <NavLink className={({ isActive }) => (isActive ? 'underline mr-4 text-lg font-semibold   my-2 text-gray-700 ' : 'mr-4 text-lg font-semibold text-gray-500   my-2')} to='/dashboard'>Dashboard</NavLink>

                                <button onClick={handleLogOut} className='md:mx-4 py-2 px-5 text-lg font-semibold  border border-black duration-500 rounded-lg hover:rounded-2xl hover:scale-105 '>Sign Out</button>

                            </>
                                : <NavLink to='/join' className={({ isActive }) => (isActive ? ' md:mx-3 py-2 px-5 text-lg font-semibold  border border-black duration-500 rounded-lg hover:rounded-2xl hover:scale-105 ' : 'mr-4 md:mx-3 text-lg font-semibold text-gray-500 py-2 px-5 border border-transparent ')}>Sign In </NavLink>
                        }

                    </div>





                </div>
            </div>

        </div>
        </div>
    );
};

export default Header;