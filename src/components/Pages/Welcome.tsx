import React, { useState, useEffect, useContext } from 'react';
import PageContainer from '../PageContainer'
import Image from '../Image';
import { Link } from 'react-router-dom';
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';

interface IWelcome {
  handleClick: (index: number) => void;
}

interface IHomeData {
  pageTitle?: string;
  driveId?: string;
  imgAlt?: string;
  buttonText?: string;
} 

const Welcome: React.FC<IWelcome> = ({
  handleClick
}) => {

  const [data, setData] = useState<IHomeData | null>(null);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'home'}`)
      .then((response) => response.json())
      .then((data) => setData(data[0]));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data);
  }, [data]);

  return (
    <PageContainer>
      <div className="mt-12">
        <Image
          className="max-w-[800px] w-full mx-auto"
          driveId={data?.driveId}
          alt={data?.imgAlt}
        />
      </div>
      <div className="w-full mt-10 text-center">
        <Link
          to="/biography"
          className="btn btn-secondary text-white"
          onClick={() => handleClick(0)}
        >
          {data?.buttonText}
        </Link>
      </div>
    </PageContainer>
  )
}

export default Welcome