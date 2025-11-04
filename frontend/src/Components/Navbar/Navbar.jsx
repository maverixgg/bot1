import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/logo.jpg'

const Navbar = () => {
    const links = <>
        <NavLink to='/' className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-500"}>Home</NavLink>
        <NavLink to='/properties' className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-500"} >Properties</NavLink>
        <NavLink to='/profile' className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-500"} >Invest</NavLink>
    </>

    return (
        <div className="shadow-sm bg-[#FFFFFF]">
            <div className='navbar max-w-11/12 m-auto text-black'>
                <div className="navbar-start">
                    <Link className='flex gap-3 items-center' to='/'>
                        <img src={logo} alt="" className='max-w-12' />
                        <h1 className='text-2xl text-[#372467] font-bold'>Nexaur Properties</h1>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-6 text-lg">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end">
                    <Link className='btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] border-none text-white'
                        to='/host'>
                        Host Property
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;