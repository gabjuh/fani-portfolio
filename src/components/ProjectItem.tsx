import React from 'react';
import Image from './Image';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';


interface IProjectItem {
  title?: string;
  mediaType?: 'image' | 'video';
  driveId?: string;
  youtubeId?: string;
  driveId2?: string;
  imgAlt?: string;
  loaded?: boolean;
  text?: string;
  // children: React.ReactNode;
}

const ProjectItem: React.FC<IProjectItem> = ({
  title,
  mediaType,
  driveId,
  youtubeId,
  loaded,
  text
  // children,
}) => {
  return (
    <>
      <h3 className="text-2xl text-center lg:text-left font-semibold">{title}</h3>
      <div className={`${!mediaType ? '' : 'flex flex-col lg:flex-row'} mt-2 mb-28`}>
        <div className="w-full lg:w-1/2 flex justify-center mt-2.5">
          {mediaType === 'image' &&
            <div className="lg:w-[300px] w-[450px] mr-0 lg:mr-7">
              <Image driveId={driveId} alt="Project Image" />
            </div>
          }
          {mediaType === 'video' &&
            <>
              {youtubeId &&
                <div className="mr-0 lg:mr-7 w-full">
                  <div className="w-[300px] mx-auto hidden lg:block">
                    <iframe width="300" height="170" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                  </div>
                  <div className="w-full lg:w-full lg:hidden">
                    <div className="w-[450px] mx-auto">
                      <iframe width="450" height="280" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>
              }
            {driveId &&
              <Image driveId={driveId} alt="Project Image" className="!w-[300px]" />}
            </>
          }
        </div>
        <div className="leading-8 lg:mt-0 mt-5 text-center lg:text-justify">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={loaded && text ? text : ''}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectItem;