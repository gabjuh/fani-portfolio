import { useContext, useEffect, useState } from 'react';
import TableIdContext from '../../AppProvider';
import { openSheetApiUrl } from '../../helpers/connect';
import SliderImage from '../SliderImage';
import getElementWidth from '../../helpers/getElementWidth';

interface ISliderData {
  pageTitle?: string;
  active: '0' | '1';
  id: number;
  driveId: string;
  imgAlt: string;
}

const ImageSlider = () => {

  const [data, setData] = useState<ISliderData[] | null>(null);
  const [loaded, setLoaded] = useState(false);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'slider'}`)
      .then((response) => response.json())
      .then((data) => setData(data
        .filter((item: ISliderData) => item.active === '1')))
      .then(() => setTimeout(() => {
        setLoaded(true);
      }, 500));
  }, []);

  return (
    <>
      <div className="carousel" id="carousel">
        {data?.map((item, index) => {
          return (
            <div
              key={`slider-img-${index}`}
              id={`carousel-item-${index}`}
              className={`carousel-item w-full drop-shadow-xl`}
            >
              <SliderImage
                driveId={item.driveId}
                alt={item.imgAlt}
                // className={``}
                containerWidth={getElementWidth('#carousel')}
                index={index}
              />

            </div>
          );
        })
        }
      </div>

      {/* Buttons */}
      <div className="flex justify-center w-full py-10 gap-2">
        {data?.map((_, index) => {
          return (
            <a href={`#carousel-item-${index}`} className="btn btn-xs">{index + 1}</a>
          );
        }
        )}
      </div>
    </>
  );
};

export default ImageSlider;