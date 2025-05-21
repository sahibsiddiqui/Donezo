import React from 'react'
import logo from '../assets/letter-d.png'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-2'>
      <div className="logo flex p-4">
        <img src={logo} alt="logo" className="h-10 w-10 rounded-lg"/>
        <span className="font-bold text-xl mx-8 my-1">Donezo</span>
      </div>
      <ul className="flex gap-8 mx-8 my-5 center">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
