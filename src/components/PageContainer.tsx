import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

interface IPageContainerProps {
  children: React.ReactNode
}


const PageContainer: React.FC<IPageContainerProps> = ({children}) => {

  const [isLoading, setIsLoading] = useState(true);


  const showWithDelay = (delay: number) => {
    setTimeout(() => {
      const classList = document.querySelector('#page-container-hidden')?.classList;
      classList?.add('opacity-100');
      setIsLoading(false);
    }, delay);
  };

  useEffect(() => {
    showWithDelay(2000);
  }, []);

  return (
    <>
      <div className={`container mx-auto px-4 py-10 w-full`}>
        <div className={`transition-all ease-in-out duration-[.6s] ${isLoading ? 'opacity-100' : 'opacity-0'}`}><Spinner /></div>
        <div id="page-container-hidden" className="opacity-0 transition-all ease-in-out duration-[.6s]">
          {children}
        </div>

      </div>
    </>
  )
}

export default PageContainer