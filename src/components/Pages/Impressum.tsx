import React, { useEffect, useState, useContext } from 'react';
import Title from '../Title'
import PageContainer from '../PageContainer'
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';

interface IImpressum {
  pageTitle?: string;
  underTitle?: string;
  name?: string;
  address?: string;
  city?: string;
  zip?: string;
  email?: string;
  handy?: string;
  title?: string;
  paragraph?: string;
}

interface IImpressumProps {
}

const Impressum: React.FC<IImpressumProps> = ({ }) => {

  const [data, setData] = useState<IImpressum[] | null>(null);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'impressum'}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data?.imgLeft);
  }, [data]);

  return (
    <PageContainer>
      <Title title={data ? data[0]?.pageTitle : ''} />

      <div className="my-10">
        <p>{data ? data[0]?.underTitle : ''}</p>
        <p className="font-semibold mt-4">{data ? data[0]?.name : ''}</p>
        <p>{data ? data[0]?.address : ''}</p>
        <p>{data ? data[0]?.city : ''}</p>
        <p>{data ? data[0]?.zip : ''}</p>
        <p>{data ? data[0]?.email : ''}</p>
        <p>{data ? data[0]?.handy : ''}</p>

        <>
          {data && data.map((item, index) => {
            return (
              <div key={index}>
                <h2 className="font-semibold mt-6">{item.title}</h2>
                <p className="text-justify mt-2">{item.paragraph}</p>
              </div>
            );
          })}
        </>
      </div>
    </PageContainer>
  )
}

export default Impressum