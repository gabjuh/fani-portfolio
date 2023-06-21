import { useContext, useEffect, useState } from "react";
import Image from '../Image';
import { Link } from 'react-router-dom';
import { openSheetApiUrl } from "../../helpers/connect";
import TableIdContext from "../../AppProvider";
import { IEventsData } from "../Pages/Events";
import scrollToId from "../../helpers/scrollToId";

interface IHero1 {}

interface IHero1Data {
  pageTitle?: string;
  driveId?: string;
  imgAlt?: string;
  buttonText?: string;
}

const Hero1: React.FC<IHero1> = ({}) => {

  const [data, setData] = useState<IHero1Data | null>(null);
  const [eventData, setEventData] = useState<IEventsData[] | null>(null);
  const eventLimit = 4

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'hero'}`)
      .then((response) => response.json())
      .then((data) => setData(data[0]));
    
    fetch(`${openSheetApiUrl}${tableId.id}/${'concerts'}`)
      .then((response) => response.json())
      .then((data) => setEventData(data));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data);
  }, [data]);

  const stringToDate = (date: string | undefined) => {
    if (date) {
      const dateArray = date.split('.');
      return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
    }
    return '1900.01.01';
  };

  const comingEventsData = () => eventData?.filter((event) => {
    if (event) {
      const date = new Date(stringToDate(event ? event.startDate : ''));
      const today = new Date();
      return date >= today;
    }
  });

  const onClickEventHandler = (eventId: string) => {
    scrollToId(`event-main-${eventId}`);
  }
  
  return (
      <>
        <div className="relative" id="hero">
          <Image
            className="w-full mx-auto"
            driveId={data?.driveId}
            alt={data?.imgAlt}
            type="bg"
          />
          <div className="hidden lg:block absolute right-[8%] top-[20%] bg-[#0002] rounded-md text-white lg:w-[300px] xl:w-[400px] 2xl:w-[500px] px-5 py-8 box-content">
            <h3 className="text-xl">Upcoming Performances:</h3>
            <ul className="mt-2">

              {comingEventsData()?.map((event, index) => {
                const date = new Date(stringToDate(event ? event.startDate : ''));
                const today = new Date();
                if (index < eventLimit && date >= today) {
                  return (
                    <li className="group text-sm mt-5 cursor-pointer" key={`event-hero-${index}`} onClick={() => onClickEventHandler(event.id)}>
                      {/* Title */}
                      <p className="group-hover:text-secondary transition-all ease-in-out duration-200">
                        <span className="text-xl font-bold uppercase">{event.title}</span>
                      </p>
                      {/* Band */}
                      <p>
                        <span className="text-lg font-semibold">{event.band}</span>
                      </p>
                      {/* Date */}
                      <p>
                        <span className="font-bold">{event.startDate}</span> {event.startTime}, 
                        <span className="font-extralight"> {event.location}</span>
                      </p>
                      {index < eventLimit - 1 && <hr className="mt-4 opacity-40" />}
                    </li>
                  )
                }
              })}
            </ul>
            <div className="w-full">
              <button onClick={() => scrollToId('concerts')} className="btn btn-secondary btn-sm mt-6">
                see all events
              </button>
            </div>

          </div>
        </div>
        <div className="w-full mt-10 text-center">
          <Link
            to="/biography"
            className="btn btn-secondary text-white"
          >
            {data?.buttonText}
          </Link>
        </div>
      </>
  )
}

export default Hero1;