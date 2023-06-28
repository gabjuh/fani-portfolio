import { useContext, useEffect, useState } from "react";
import Image from '../Image';
import { Link } from 'react-router-dom';
import { openSheetApiUrl } from "../../helpers/connect";
import TableIdContext from "../../AppProvider";
import { IEventsData } from "../Pages/Events";
import scrollToId from "../../helpers/scrollToId";
import UpcomingEvents from "../UpcomingEvents";

interface IHero1 {}

interface IHero1Data {
  pageTitle?: string;
  driveId?: string;
  imgAlt?: string;
  buttonText?: string;
}

const Hero1: React.FC<IHero1> = ({}) => {

  const [data, setData] = useState<IHero1Data | null>(null);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'hero'}`)
      .then((response) => response.json())
      .then((data) => setData(data[0]));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data);
  }, [data]);

  return (
      <>
        <div className="relative" id="hero">
          <Image
            className="w-full mx-auto"
            driveId={data?.driveId}
            alt={data?.imgAlt}
            type="bg"
          />
        <UpcomingEvents />
        </div>
      </>
  )
}

export default Hero1;