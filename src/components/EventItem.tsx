import React from 'react';
import MapIco from './icos/MapIco.tsx';
// import ClockIco from './icos/ClockIco.tsx';

interface IEventItem {
  title?: string;
  category?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  location?: string;
  locationLink?: string;
  band?: string;
  bandLink?: string;
  isPast?: boolean;
}

const EventItem: React.FC<IEventItem> = ({
  title,
  category,
  startDate,
  endDate,
  startTime,
  location,
  locationLink,
  band,
  bandLink,
  isPast
}) => {

  const getDay = (date: string) => date.toString().slice(0, 2);
  const getYear = (date: string) => date.toString().slice(6, 10);

  const getDayOfWeek = (date: string) => {
    const day = date.toString().slice(0, 2);
    const month = date.toString().slice(3, 5);
    const year = date.toString().slice(6, 10);
    const dateObj = new Date(`${year}-${month}-${day}`);
    const dayOfWeek = dateObj.toLocaleString('de', { weekday: 'short' });
    return dayOfWeek;
  };

  const getNameOfMonth = (date: string) => {
    const day = date.toString().slice(0, 2);
    const month = date.toString().slice(3, 5);
    const year = date.toString().slice(6, 10);
    const dateObj: any = new Date(`${year}-${month}-${day}`);
    const monthName = dateObj.toLocaleString('de', { month: 'long' });
    return monthName;
  };

  return (
    <>
      <div className="relative mb-24 cursor-default">
        <div className="sm:flex sm:flex-row mx-auto max-w-[900px]">
          {/* DATE */}
          <div className={`relative py-4 lg:w-[50px] sm:pl-2 ${isPast ? 'sm:border-gray-400' : 'border-primary'} sm:border-l-[25px] sm:border-b-[0px] sm:rounded-[10px] sm:min-h-[8rem] text-center`}>
            <div className="sm:w-[140px] mx-auto text-center sm:text-left">
              <div className="absolute inline-block origin-center -rotate-90 text-xl -left-[37px] text-white top-[50%] -translate-y-[50%] mt-[2px]">
                {getYear(startDate)}
              </div>

              {/* Start date */}
              <div className="sm:flex">
                {/* Date-Desktop */}
                <div className="hidden sm:block">
                  <div className="uppercase text-[1.3rem]">
                    {getDayOfWeek(startDate)}
                  </div>
                  <div className="text-[2.7rem] font-extrabold leading-[2.5rem]">
                    {getDay(startDate)}
                  </div>
                  <div className="text-[1.3rem]">
                    {getNameOfMonth(startDate)}
                  </div>
                  {/* Time */}
                  <p className="whitespace-nowrap text-[1.3rem]">
                    <span className="leading-17 mb-2">{startTime}</span>
                  </p>
                </div>

                {/* End date */}
                {endDate &&
                  <div className="grow hidden sm:block">
                    <div className="uppercase text-[1rem] text-right">
                      {getDayOfWeek(endDate)}
                    </div>
                    <div className="text-[1.9rem] font-extrabold leading-[1.7rem] text-right whitespace-nowrap">
                      <span className="mr-[4px]">-</span>{getDay(endDate)}
                    </div>
                    <div className="text-[1rem] text-right">
                      {getNameOfMonth(endDate)}
                    </div>
                  </div>}
              </div>
            </div>
          </div>
          {/* TEXTS */}
          <div className="sm:ml-6 py-4 lg:ml-[150px] sm:text-left text-center max-w-[900px]">
            {/* Band and Title */}
            <h3 className={`text-4xl uppercase font-semibold ${isPast ? 'border-gray-400' : 'border-primary'} border-b-[5px] sm:border-none pb-2`}>{title}</h3>
            <h3 className="text-2xl font-semibold sm:mb-0 mb-2 mt-2">
              {!bandLink ? band :
                <a className="text-secondary font-semibold hover:underline" href={bandLink} target="_blank">{band}</a>
              }
            </h3>

            {/* Date-Mobile */}
            <div className="text-[2rem] mt-0 sm:hidden block w-[90vw] mx-auto">
              {startDate}{endDate && <span className="ml-2">-</span>} {endDate
                ? endDate
                : ''}
            </div>

            <div className="mb-2">

              {/* Time */}
              {startTime &&
                <div className="relative h-[1.6rem] my-2.5 sm:mt-0 sm:hidden">
                  <div className="absolute left-[50%] -translate-x-[50%] sm:left-0 sm:translate-x-0">
                    {/* <div className="flex">
                      <div className="translate-y-[1px]">
                        <ClockIco />
                      </div> */}
                    <span className="text-2xl">{startTime}</span>
                    {/* </div> */}
                  </div>
                </div>
              }

              {/* Location */}
              {location &&
                <div className="min-h-[2rem] font-extralight mt-4 mb-5 mx-auto">
                  <div className="inine-block">
                    <div className="">
                      {!locationLink ?
                        // Text only
                        <>
                          <div className="inline-block translate-y-[5px]">
                            <MapIco />
                          </div>
                          <span className="text-2xl ml-3">{location}</span>
                        </>
                        :

                        // Link
                        <>
                          <div className="inline-block translate-y-[5px]">
                            <MapIco />
                          </div>
                          <a href={locationLink} className="text-2xl text-secondary hover:underline translate-y-[5px]">
                            <span className="ml-3">{location}</span>
                          </a>
                        </>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>

            {/* Category */}
            <div className={`badge text-sm ${isPast ? 'bg-gray-400 border-gray-400' : 'badge-primary'} rounded-full font-semibold`}>{category}</div>
          </div>
        </div>
      </div>

    </>
  );
};

export default EventItem;