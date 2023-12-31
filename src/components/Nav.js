import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Nav = () => {
  let Links = [
    { name: 'HOME', link: '/space_x_dashboard/#/home' },
    { name: 'DASHBOARD', link: '/space_x_dashboard/#/dashboard' },
  ];

  let [open, setOpen] = useState(false);
  return (
    <div className=" shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-5">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <a href="https://www.spacex.com/human-spaceflight/" className="h-14">
            <span className="text-indigo-600 mr-2 pt-0 mt-0">
              <img
                src={require('../assets/icon.png')}
                className="h-16 w-[30]"
                alt=""
              />
            </span>
          </a>
        </div>
        <div
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-5 transition-all duration-500 ease-in ${
            open
              ? 'top-16 opacity-100'
              : 'top-[-490px] md:opacity-100 opacity-0'
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-xl md:my-0 my-7"
              onClick={() => setOpen(false)}
            >
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
