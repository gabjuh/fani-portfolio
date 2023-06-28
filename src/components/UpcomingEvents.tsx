import { useContext, useEffect, useState } from 'react';
import { IEventsData } from './Pages/Events';
import { openSheetApiUrl } from '../helpers/connect';
import TableIdContext from '../AppProvider';
import scrollToId from '../helpers/scrollToId';
import UpcomingEventsWrapper from './UpcomingEventsWrapper';

const UpcomingEvents = () => {

  const [eventData, setEventData] = useState<IEventsData[] | null>(null);
  const eventLimit = 6;

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'concerts'}`)
      .then((response) => response.json())
      .then((data) => setEventData(data));
  }, []);

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
  };

  return (
    <>
      <UpcomingEventsWrapper>
        <h3 className="text-xl">Upcoming Concerts:</h3>
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
              );
            }
          })}
        </ul>
        <div className="w-full">
          <button onClick={() => scrollToId('concerts')} className="btn btn-secondary btn-sm mt-6">
            see all events
          </button>
        </div>
      </UpcomingEventsWrapper>
    </>
  );
};

export default UpcomingEvents;