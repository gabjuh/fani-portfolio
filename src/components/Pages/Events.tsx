import React, { useEffect, useState, useContext } from 'react';
import Title from '../Title';
import EventItem from '../EventItem';
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';

export interface IEventsData {
  id: string;
  pageTitle?: string;
  active?: string;
  title?: string;
  category?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  locationLink?: string;
  band?: string;
  bandLink?: string;
  link?: string;
  description?: string;
}

interface IEvents {
}

const Events: React.FC<IEvents> = ({ }) => {

  const [data, setData] = useState<IEventsData[] | null>(null);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'concerts'}`)
      .then((response) => response.json())
      .then((data) => setData(data));
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

  const getActualEvents = () => data?.filter((event) => {
    if (event) {
      const date = new Date(stringToDate(event ? event.startDate : ''));
      const today = new Date();
      return date >= today;
    }
  });

  const getPastEvents = () => data?.filter((event) => {
    if (event) {
      const date = new Date(stringToDate(event ? event.startDate : ''));
      const today = new Date();
      return date < today;
    }
  });

  return (
      <>
        <Title title={data ? data[0]?.pageTitle : ''} />
        <>
        <div className="lg:w-[900px] xl:w-[1200px] w-full mx-auto" id="concerts">
            <h2 className="text-lg mb-10 text-center sm:text-left">Aktuelle Veranstaltungen</h2>
            {data && getActualEvents()?.map((event, index) => (
              <React.Fragment key={`actual-${index}`}>
                {event.active === '1' && (
                  <EventItem
                    id={event.id}
                    title={event.title}
                    category={event.category}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    startTime={event.startTime}
                    // endTime={event.endTime}
                    location={event.location}
                    locationLink={event.locationLink}
                    band={event.band}
                    bandLink={event.bandLink}
                    isPast={false}
                  />
                )}
              </React.Fragment>
            ))}

            <h2 className="text-lg mb-10 text-center sm:text-left">Vergangene Veranstaltungen</h2>
            {data && getPastEvents()?.map((event, index) => (
              <React.Fragment key={`past-${index}`}>
                {event.active === '1' && (
                  <EventItem
                    id={event.id}
                    title={event.title}
                    category={event.category}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    startTime={event.startTime}
                    // endTime={event.endTime}
                    location={event.location}
                    locationLink={event.locationLink}
                    band={event.band}
                    bandLink={event.bandLink}
                    isPast={true}
                  />
                )}
              </React.Fragment>
          ))}
          </div>
        </>
      </>
  );
};

export default Events;