import React, { useState, useEffect, useContext } from 'react';
import Title from '../Title'
import PageContainer from '../PageContainer'
import ImageAndText from '../ImageAndText';
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';

interface IInstrumentsData {
  pageTitle?: string;
  active: '0' | '1';
  id: number;
  driveId?: string;
  imgAlt?: string;
  imgOnSide?: 'left' | 'right';
  text?: string;
}

interface IInstrument {
}

const Instruments: React.FC<IInstrument> = ({ }) => {

  const [data, setData] = useState<IInstrumentsData[] | null>(null);
  const [loaded, setLoaded] = useState(false);

  const tableId = useContext(TableIdContext)

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'instruments'}`)
      .then((response) => response.json())
      .then((data) => setData(data
        .filter((item: IInstrumentsData) => item.active === '1')))
      .then(() => setTimeout(() => {
        setLoaded(true);
      }, 500));
  }, []);

  useEffect(() => {
    data ? console.log(data[0]?.pageTitle) : null;

    // sort data based on the items id
    data ? setData(
      data?.sort((a, b) => {
        return a.id - b.id;
      })
    ) : null;
  }, [data]);

  return (
    <PageContainer>
      <Title title={data ? data[0]?.pageTitle : ''} />

      {data?.map((item, index) => {
        return (
          <ImageAndText
            key={index}
            driveId={item.driveId}
            alt={item.imgAlt}
            imageLeft={item.imgOnSide?.toLowerCase() === 'left' ? true : false}
            loaded={loaded}
            text={item.text}
          />
        );
      })}
    </PageContainer>
  )
}

export default Instruments