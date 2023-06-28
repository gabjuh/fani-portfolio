import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from './Image';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

interface IImageAndText {
  driveId?: string;
  alt?: string;
  imageLeft?: boolean;
  classNameForImg?: string;
  loaded?: boolean;
  text?: string;
  textAlign?: 'auto' | 'justify';
  buttonText?: string;
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
  text,
  textAlign,
  buttonText
}) => {

  return (
    <>
      <div className={`flex ${imageLeft ? 'flex-col' : 'flex-col-reverse'} md:flex-row my-16`}>
        {imageLeft && <ImageForText driveId={driveId || ''} alt={alt || 'image'} classNameForImg={classNameForImg} />}
        <div className={`w-full md:w-1/2 flex flex-col ${!imageLeft ? 'items-end' : ''} justify-center`}>
          <div 
            className={`${imageLeft ? textAlign === 'justify' ? 'md:text-justify' : 'md:text-left' : textAlign === 'justify' ? 'md:text-justify' : 'md:text-right'} md:ml-8 lg:ml-0 md:mr-8 lg:mr-0 text-center leading-8`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={loaded && text ? text : ''}
            />
          </div>
          {buttonText &&
            <p className={`flex-none text-center ${imageLeft ? textAlign === 'justify' ? 'md:text-justify' : 'md:text-left' : textAlign === 'justify' ? 'md:text-justify' : 'md:text-right'} mt-5 w-[100%]`}>
              <Link
                className="btn btn-sm btn-secondary text-white"
                to="/cv"
              >
                {buttonText}
              </Link>
            </p>
          }

        </div>
        {!imageLeft && <ImageForText driveId={driveId || ''} alt={alt || ''} classNameForImg={classNameForImg} />}
      </div>

    </>
  );
};

export default ImageAndText;