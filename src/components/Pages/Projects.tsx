import React, { useState, useEffect, useContext } from 'react';
import Title from '../Title';
import PageContainer from '../PageContainer';
import ProjectItem from '../ProjectItem';
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';


interface IProjectsData {
  pageTitle?: string;
  active: '1' | '0';
  id: number;
  projectTitle?: string;
  mediaType?: 'image' | 'video';
  youtubeId?: string;
  driveId?: string;
  imgAlt?: string;
  text?: string;
}

interface IProjects {
}

const Projects: React.FC<IProjects> = ({ }) => {

  const [data, setData] = useState<IProjectsData[] | null>(null);
  const [loaded, setLoaded] = useState(false);

  const tableId = useContext(TableIdContext)

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'projects'}`)
      .then((response) => response.json())
      .then((data) => setData(data.filter((item: IProjectsData) => item.active === '1')))
      .then(() => setTimeout(() => {
        setLoaded(true);
      }, 500));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data);
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

      {data && data.map((item, index) => {
        return (
          <ProjectItem
            key={index}
            title={item.projectTitle}
            mediaType={item.mediaType}
            youtubeId={item.youtubeId}
            driveId={item.driveId}
            imgAlt={item.imgAlt}
            loaded={loaded}
            text={item.text}
          />
        );
      })}
    </PageContainer>
  );
};

export default Projects;