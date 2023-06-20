import React, { useContext, useEffect, useState } from 'react';
import Title from '../Title'
import PageContainer from '../PageContainer'
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';


interface IAgbData {
  pageTitle?: string;
  underTitle?: string;
  title?: string;
  paragraph?: string;
}

interface IAgb {
}

const Agb: React.FC<IAgb> = ({ }) => {

  const [data, setData] = useState<IAgbData[] | null>(null);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'agb'}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data[0]);
  }, [data]);

  return (
    <PageContainer>
      <Title className="text-center uppercase tracking-[.4rem] mb-3" title={data ? data[0]?.pageTitle : ''} />
      <h2 className="text-lg text-center">{data ? data[0]?.underTitle : ''}</h2>

      <div className="lg:max-w-[1000px] mx-auto">
        {data && data.map((item, index) => {
          return (
            <div key={index}>
              <h3 className="md:text-center text-lg font-semibold underline mt-12" id="geltungsbereich">
                {item.title}
              </h3>
              <p className="md:text-center mt-5">
                {item.paragraph}
              </p>
            </div>
          );
        })}
      </div>
    </PageContainer>
  )
}

export default Agb