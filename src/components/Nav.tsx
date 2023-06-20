import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import TableIdContext from '../AppProvider';

interface INavMenuItem {
  index: number;
  title: string;
  link: string;
  selected: boolean;
  handleClick: (index: number) => void;
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
        className={`block hover:bg-base-200 focus:bg-secondary ${selected ? 'bg-secondary text-white focus:text-white active:text-white' : 'text-gray-700'}`}
        onClick={() => handleClick(index)}
      >
        {title}
      </Link>
    </li>
  );
};

interface INav {
  selected: number;
  handleClick: (index: number) => void;
  homepageTitle?: string;
  email?: string;
  emailTooltipText?: string;
}

const Nav: React.FC<INav> = ({
  homepageTitle,
  selected,
  handleClick,
  email,
  emailTooltipText
}) => {

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);

  const tableId = useContext(TableIdContext);

  React.useEffect(() => {
    setTimeout(() => {
      setIsTooltipOpen(true);
    }, 5000);
  }, []);

  const menuItems = [
    {
      title: 'Biographie',
      link: '/biography',
      selected: selected === 0,
    },
    {
      title: 'Instrumente',
      link: '/instruments',
      selected: selected === 1,
    },
    {
      title: 'Projekte',
      link: '/projects',
      selected: selected === 2,
    },
    {
      title: 'Termine',
      link: '/events',
      selected: selected === 3,
    },
  ];

  return (
    <>
      <div className="navbar bg-base-100 shadow-xl z-[1500] sticky top-0 mx-auto">
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
                />
              ))}
            </ul>
          </div>
          <div className="flex-1 whitespace-nowrap">
            {/* Logo/Title */}
            <Link
              to="/"
              className="btn btn-ghost normal-case text-xl"
              onClick={() => handleClick(-1)}
            >{homepageTitle}{tableId.name === 'next' && ' - ' + tableId.name.toUpperCase()}</Link>
          </div>
        </div>
        <div className="hidden lg:flex">
          {/* Horisontal menu */}
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item, index) => (
              <NavMenuItem
                key={index}
                index={index}
                title={item.title}
                link={item.link}
                selected={item.selected}
                handleClick={handleClick}
              />
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className={`md:tooltip md:tooltip-sm ${isTooltipOpen ? `md:tooltip-open` : ''} md:tooltip-bottom`} data-tip={emailTooltipText}>
          <a href={`mailto:${email}`} className="btn btn-secondary text-white">@</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav;