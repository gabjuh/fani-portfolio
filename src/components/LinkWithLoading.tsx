import React from 'react';
// import Loading from './Loading';
import { Link, Navigate } from 'react-router-dom';

interface ILinkWithLoading {
  url: string;
  text: string;
}

const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  console.log(e);
  setTimeout(() => {
    return <Navigate to="/instruments" />;
  }, 2000);

};

const LinkWithLoading: React.FC<ILinkWithLoading> = ({ url, text }) => {
  return (
    <div className="mx-auto w-[100px] h-[30px] bg-purple-500">
      <Link onClick={handleClick} to={url}>{text}</Link>
    </div>
  );
};

export default LinkWithLoading;