import React from "react";

interface IUpcomingEventsWrapper {
  children?: React.ReactNode;
}

const UpcomingEventsWrapper: React.FC<IUpcomingEventsWrapper> = ({ children }) => {

  return (
    <>
      <div className={`hidden lg:block absolute right-[8%] top-[15%] bg-[#0002] rounded-md text-white lg:w-[300px] xl:w-[400px] 2xl:w-[500px] px-5 py-8 box-content max-h-[70%] overflow-auto`}>
        {children}
      </div>
      <div className="lg:hidden container mx-auto text-center my-16">
        {children}
      </div>
    </>
  );
};

export default UpcomingEventsWrapper;