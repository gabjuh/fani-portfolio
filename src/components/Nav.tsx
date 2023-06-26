import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import TableIdContext from '../AppProvider';
import scrollToId from '../helpers/scrollToId';
import { IMenuItem } from '../App';
import SunIco from './icos/SunIco';
import MoonIco from './icos/MoonIco';

interface INavMenuItem {
  index: number;
  title: string;
  link: string;
  selected: boolean;
  handleClick: (index: number) => void;
  // handleClick: () => void;
}

const NavMenuItem: React.FC<INavMenuItem> = ({
  index,
  title,
  link,
  selected,
  handleClick
}) => {
  return (
    <li>
      <Link
        to={link}
        className={`mx-4 whitespace-nowrap cursor-pointer px-1 py-3`}
        onClick={() => handleClick(index)}
      >
        {title}
      </Link>
      <div className={`h-[4px] ${selected ? 'w-[95%]' : 'w-[0%]'}  hover:w-[95%] bg-secondary mx-auto mt-1 transition-all duration-200 ease-in-out`}></div>
    </li>
  );
};

interface INav {
  menuItems: IMenuItem[];
  selected: number;
  handleClick: (index: number) => void;
  homepageTitle?: string;
  email?: string;
  emailTooltipText?: string;
  darkTheme?: string;
  lightTheme?: string;
}

const Nav: React.FC<INav> = ({
  menuItems,
  homepageTitle,
  // selected,
  handleClick,
  email,
  emailTooltipText,
  darkTheme,
  lightTheme
}) => {

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  
  // Get the current system theme
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme);

  // Listen for changes to the prefers-color-scheme media query
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
  useEffect(() => {
    // document.documentElement.dataset.theme = lightTheme;

    // Check if the media query matches
    mediaQuery.addEventListener('change', handleChange);

    // Return a cleanup function to remove the listener
    return () => mediaQuery.removeEventListener('change', handleChange);
  })
  
  useEffect(() => {    
    if (theme === 'dark') {
      document.documentElement.dataset.theme = darkTheme;
    } else {
      document.documentElement.dataset.theme = lightTheme;
    }
  }, [theme]);

  const handleToggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  const tableId = useContext(TableIdContext);

  React.useEffect(() => {
    setTimeout(() => {
      setIsTooltipOpen(true);
    }, 5000);
  }, []);
  return (
    <>
      <div className="navbar bg-base-100 z-[1500] fixed top-0 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            {/* Dropdown menu */}
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems.map((item, index) => (
                <NavMenuItem
                  key={index}
                  index={index}
                  title={item.title}
                  link={item.link}
                  selected={item.selected}
                  handleClick={handleClick}
                  // handleClick={() => scrollToId(item.link.slice(2))} 
                />
              ))}
            </ul>
          </div>
          <div className="flex-1 whitespace-nowrap">
            {/* Logo/Title */}
            <Link
              to="/"
              className="btn btn-ghost normal-case text-xl"
              onClick={() => scrollToId('hero')}
              // onClick={() => handleClick(-1)}
            >{homepageTitle}{tableId.name === 'next' && ' - ' + tableId.name.toUpperCase()}</Link>
          </div>
        </div>
        <div className="hidden lg:flex">
          {/* Horisontal menu */}
          <ul className="flex flex-row px-1">
            {menuItems.map((item, index) => (
              <NavMenuItem
                key={index}
                index={index}
                title={item.title}
                link={item.link}
                selected={item.selected}
                handleClick={handleClick}
                // handleClick={() => scrollToId(item.link.slice(2))} 
              />
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className={`md:tooltip md:tooltip-sm mx-1 ${isTooltipOpen ? `md:tooltip-open` : ''} md:tooltip-bottom`} data-tip={emailTooltipText}>
            <a href={`mailto:${email}`} className="btn btn-secondary text-white">@</a>
          </div>
          <div className={`md:tooltip md:tooltip-sm mx-1 ${isTooltipOpen ? `md:tooltip-open` : ''} md:tooltip-bottom`} data-tip={emailTooltipText}>
            <button className="btn btn-secondary text-white" onClick={handleToggleTheme}>
              {theme === 'light' ? <MoonIco /> : <SunIco />}
            </button>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Nav;