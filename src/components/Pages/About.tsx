import React, { useState, useEffect, useContext } from 'react';
import Title from '../Title'
import ImageAndText from '../ImageAndText';
import { Link } from 'react-router-dom';
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';

interface IAbout {
  handleClick?: (index: number) => void;
}

interface IAboutData {
  pageTitle?: string;
  driveId?: string;
  imgAlt?: string;
  imgLeft?: 'TRUE' | 'FALSE';
  text?: string;
  textAlign?: 'auto' | 'justify';
  buttonText?: string;
}

const About: React.FC<IAbout> = ({
  handleClick
}) => {

  const [data, setData] = useState<IAboutData | null>(null);
  const [loaded, setLoaded] = useState(false);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'about'}`)
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
    <>
      <Title title={data?.pageTitle} />

      <ImageAndText
        driveId={data?.driveId}
        alt={data?.imgAlt}
        imageLeft={data?.imgLeft === 'TRUE' ? true : false}
        classNameForImg="rounded-full"
        loaded={loaded}
        text={data?.text}
        textAlign={data?.textAlign}
      />

      <p className="text-center mt-24">
        <Link
          className="btn btn-secondary text-white ml-4"
          to="/cv"
          onClick={handleClick ? () => handleClick(1) : () => null}
        >
          {data?.buttonText}
        </Link>
      </p>
    </>
  )
}

export default About;