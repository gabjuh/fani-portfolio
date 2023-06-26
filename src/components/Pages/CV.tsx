import { useContext, useEffect, useState } from "react";
import PageContainer from "../PageContainer"
import Title from "../Title"
import { openSheetApiUrl } from "../../helpers/connect";
import TableIdContext from "../../AppProvider";
import ImageAndText from "../ImageAndText";
import { Link } from "react-router-dom";

interface ICVData {
  pageTitle?: string;
  active: '0' | '1';
  id: number;
  driveId?: string;
  imgAlt?: string;
  imgOnSide?: 'left' | 'right';
  text?: string;
  buttonText?: string;
}

const CV = () => {

  const [data, setData] = useState<ICVData[] | null>(null);
  const [loaded, setLoaded] = useState(false);

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'cv'}`)
      .then((response) => response.json())
      .then((data) => setData(data
        .filter((item: ICVData) => item.active === '1')))
      .then(() => setTimeout(() => {
        setLoaded(true);
      }, 500));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data?.imgLeft);
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

      <p className="text-center mt-24">
        <Link
          className="btn btn-secondary text-white ml-4"
          to="/#about"
          // onClick={handleClick ? () => handleClick(1) : () => null}
        >
          {data ? data[0]?.buttonText : ''}
        </Link>
      </p>

    </PageContainer>
  )
}

export default CV