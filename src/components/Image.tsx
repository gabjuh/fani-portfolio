import React from 'react';
import portfolioImg from '../assets/images/Musik_am_Wasser_-_August_2020-360_sm.jpg';
import violoneval from '../assets/images/_MG_2826-kicsi2.jpg';
import bassgeige from '../assets/images/Bassgeige2_kicsi.jpg';
import geigenconsort from '../assets/images/Geigenconsort_kicsi.jpg';
import gamba1 from '../assets/images/IMG_20230601_093350_kicsi.jpg';
import gamba2 from '../assets/images/IMG_20230601_093600_kicsi.jpg';
import lyren from '../assets/images/Lyren_03-kicsi.jpg';

// Images object with filenames as keys and paths as values
const images = [
  {
    img: violoneval,
    fileName: '_MG_2826-kicsi2.jpg'
  },
  {
    img: bassgeige,
    fileName: 'Bassgeige2_kicsi.jpg'
  },
  {
    img: geigenconsort,
    fileName: 'Geigenconsort_kicsi.jpg'
  },
  {
    img: gamba1,
    fileName: 'IMG_20230601_093350_kicsi.jpg'
  },
  {
    img: gamba2,
    fileName: 'IMG_20230601_093600_kicsi.jpg'
  },
  {
    img: lyren,
    fileName: 'Lyren_03-kicsi.jpg'
  },
  {
    img: portfolioImg,
    fileName: 'Musik_am_Wasser_-_August_2020-360_sm.jpg'
  }
]

interface IImage {
  driveId?: string;
  alt?: string;
  className?: string;
  type?: string;
}

const Image: React.FC<IImage> = ({
  driveId,
  alt,
  className,
  type,
}) => {

  const isImageSourceLocal = false;
  // const isImageSourceLocal = true;

  // the driveId is actually the filename, check it and return the path
  const getImgPath = (driveId: string | undefined) => {
    if (driveId) {
      const img = images.find((image) => image.fileName === driveId);
      if (img) {
        return img.img;
      }
    }
    return portfolioImg;
  }

  return (
    <div className={`${className} ${type === 'bg' ? 'w-[100%]' : 'drop-shadow-xl lg:max-w-[400px]'}`}>
      {!isImageSourceLocal && type !== 'bg' ?

        <img src={`https://drive.google.com/uc?export=view&id=${driveId}`} alt={alt} loading='lazy' className={`rounded-md mx-auto`} /> :

        <>
          {/* BG on Desktop  */}
          <div className="lg:block hidden">
            <div className="lg:h-[90vh] w-full bg-fixed bg-no-repeat bg-contain lg:bg-cover lg:bg-center" style={{ backgroundImage: `url(https://drive.google.com/uc?export=view&id=${driveId})` }}></div>
          </div>

          {/* BG as img on Mobile  */}
          <div className="lg:hidden mt-10">
            <img src={`https://drive.google.com/uc?export=view&id=${driveId}`} alt={alt} className="w-full" />
          </div>
        </>
      
    }
      {/* {!isImageSourceLocal && <img src={`/images/${driveId}`} alt={alt} />} */}
      {isImageSourceLocal && <img src={getImgPath(driveId)} alt={alt} />}
      {/* <img src={`${portfolioImg}`} alt={alt} /> */}
    </div>
  );
};

export default Image;