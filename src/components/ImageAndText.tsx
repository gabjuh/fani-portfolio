import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from './Image';
import remarkGfm from 'remark-gfm';

interface IImageAndText {
  driveId?: string;
  alt?: string;
  imageLeft?: boolean;
  classNameForImg?: string;
  loaded?: boolean;
  text?: string;
}

interface IImageForText {
  driveId: string;
  alt: string;
  classNameForImg?: string;
}

const ImageForText: React.FC<IImageForText> = ({
  driveId,
  alt,
  classNameForImg,
}) => {
  return (
    <>
      <div className="w-full md:w-1/2">
        <Image driveId={driveId} alt={alt} className={`${classNameForImg} mx-auto mb-12 md:mb-0`} />
      </div>
    </>
  );
};

const ImageAndText: React.FC<IImageAndText> = ({
  driveId,
  alt,
  classNameForImg,
  imageLeft,
  loaded,
  text
}) => {

  const isJustified = true;

  return (
    <>
      <div className={`flex ${imageLeft ? 'flex-col' : 'flex-col-reverse'} md:flex-row my-28`}>
        {imageLeft && <ImageForText driveId={driveId || ''} alt={alt || 'image'} classNameForImg={classNameForImg} />}
        <div className={`w-full md:w-1/2 flex flex-col ${!imageLeft ? 'items-end' : ''} justify-center`}>
          <div className={`${imageLeft ? `${isJustified ? 'md:text-justify' : 'md:text-left'} md:ml-8 lg:ml-0` : `${isJustified ? 'md:text-justify' : 'md:text-right'} md:mr-8 lg:mr-0`} ${imageLeft !== undefined ? 'md:text-justify' : ''} text-center leading-8`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={loaded && text ? text : ''}
            />
          </div>
        </div>
        {!imageLeft && <ImageForText driveId={driveId || ''} alt={alt || ''} classNameForImg={classNameForImg} />}
      </div>

    </>
  );
};

export default ImageAndText;