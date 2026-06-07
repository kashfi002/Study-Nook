"use client"
import Link from 'next/link';
import React from 'react';
import { authClient } from "@/lib/auth-client"
import { Avatar } from '@heroui/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout=async()=>{
    await authClient.signOut();
    router.push('/');
    router.refresh();
  }
  const { data: session, } = authClient.useSession() 
    const user = session?.user
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link href={'/'} className='font-semibold'>Home</Link></li>
      <li><Link href={'/rooms'} className='font-semibold'>Rooms</Link></li>
      <li><Link href={'/add-room'} className='font-semibold'>Add Rooms</Link></li>
      </ul>
    </div>
    <h1 className="text-[#2563EB] font-bold text-xl">Study-Nook</h1>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link href={'/'} className='font-semibold'>Home</Link></li>
      <li><Link href={'/rooms'} className='font-semibold'>Rooms</Link></li>
      <li><Link href={'/add-room'} className='font-semibold'>Add Rooms</Link></li>
      <li><Link href={'/my-bookings'} className='font-semibold'>My Bookings</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <ul className="menu menu-horizontal px-1 gap-4">
    {
      user?
      <>
      <li>
         <Link href={'/signup'}>Profile</Link>
      </li>
      <li>
         <Avatar className='rounded-full'>
       <Avatar.Image
       referrerPolicy="no-referrer"
        alt="John Doegi" src={user?.image} />
        <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
      </Avatar>
      </li>
      <li>
        <button 
        onClick={handleLogout}
        className='btn btn-error'>Logout</button>
      </li>
      </>
       :<>
  <li><Link href={'/signup'}>Sign Up</Link></li>
   <li><Link href={'/login'}>Log In</Link></li>
 </>
    }
</ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;