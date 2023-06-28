import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import getElementWidth from '../helpers/getElementWidth';

interface ISliderImage {
  driveId: string;
  alt: string;
  className?: string;
  containerWidth: number;
  index: number;
}

const SliderImage: React.FC<ISliderImage> = ({
  driveId,
  alt,
  className,
  containerWidth,
  index
}) => {

  console.log(containerWidth);
  // const getElementWidth = (element: HTMLElement) => {

  const getCurrentElementWidth = (id: string) => {
    return document.querySelector(`#${id}`)?.clientWidth;
  };

  // const []

  useEffect(() => {

  });

  return (
    <div
      className="w-full h-[500px] bg-contain bg-center bg-no-repeat max-w-[900px] mx-auto mt-[8rem]"
      style={{
        backgroundImage: `url(https://drive.google.com/uc?export=view&id=${driveId})`,
      }}
    ></div>
    // <img
    //   className={` max-w-[100%] mx-auto ${className}`}
    //   alt={alt}
    //   src={`https://drive.google.com/uc?export=view&id=${driveId}`}
    // />
  );
};

export default SliderImage;