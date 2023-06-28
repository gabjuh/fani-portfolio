import React, { useContext, useEffect, useState } from 'react';
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';
import YoutubeVideo from '../YoutubeVideo';

interface IVideosData {
  pageTitle: string;
  active: string;
  id: number;
  youtubeId: string;
  title: string;
  band?: string;
  bandLink?: string;
  description?: string;
  quality?: 'low' | undefined;
}

const Videos = () => {

  const [data, setData] = useState<IVideosData[] | null>(null);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'videos'}`)
      .then((response) => response.json())
      .then((data) => setData(data
        .filter((item: IVideosData) => item.active === '1')));
  }, []);

  return (
    <div className="flex flex-row overflow-auto max-h-[800px] py-10">
      {data?.map((item, index) => {
        return (

          <div className="mr-10 w-full" key={`video-${index}`}>

            {/* Video */}
            <YoutubeVideo
              key={`video-${index}`}
              youtubeId={item.youtubeId}
              quality={item.quality}
            />

            {/* Title */}
            <p className="text-2xl font-semibold mt-2">{item.title}</p>

            {/* Band */}
            {item.band && (
              item.bandLink === undefined ? <p className="text-lg mt-2">{item.band}</p> :
                <a className="text-primary" href={item.bandLink} target="_blank">
                  <p className="text-lg mt-2">{item.band}</p>
                </a>
            )}

            {/* Description */}
            {item.description && <p className="text-sm mt-2">{item.description}</p>}

          </div>
        );
      })}
    </div>
  );

};

export default Videos;