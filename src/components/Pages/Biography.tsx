import React, { useState, useEffect, useContext } from 'react';
import Title from '../Title'
import PageContainer from '../PageContainer'
import ImageAndText from '../ImageAndText';
import { Link } from 'react-router-dom';
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';

interface IBiography {
  handleClick: (index: number) => void;
}

interface IBiographyData {
  pageTitle?: string;
  driveId?: string;
  imgAlt?: string;
  imgLeft?: 'TRUE' | 'FALSE';
  text?: string;
  question?: string;
  buttonText?: string;
}

const Biography: React.FC<IBiography> = ({
  handleClick
}) => {

  const [data, setData] = useState<IBiographyData | null>(null);
  const [loaded, setLoaded] = useState(false);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'biography'}`)
      .then((response) => response.json())
      .then((data) => setData(data[0]))
      .then(() => setTimeout(() => {
        setLoaded(true);
      }, 500));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data?.imgLeft);
  }, [data]);

  return (
    <PageContainer>
      <Title title={data?.pageTitle} />

      <ImageAndText
        driveId={data?.driveId}
        alt={data?.imgAlt}
        imageLeft={data?.imgLeft === 'TRUE' ? true : false}
        classNameForImg="rounded-full"
        loaded={loaded}
        text={data?.text}
      />

      <p className="text-center mt-24">
        {data?.question}
        <Link
          className="btn btn-secondary text-white ml-4"
          to="/instruments"
          onClick={() => handleClick(1)}
        >
          {data?.buttonText}
        </Link>
      </p>

    </PageContainer>
  )
}

export default Biography;