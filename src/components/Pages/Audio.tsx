import { useContext, useEffect, useState } from 'react';
import { openSheetApiUrl } from '../../helpers/connect';
import TableIdContext from '../../AppProvider';

import ReactH5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface IAudioData {
  pageTitle?: string;
  domain: string;
  active: '1' | '0';
  id: number;
  fileName: string;
  folderName?: string;
  title?: string;
  label?: string;
  band?: string;
  bandLink?: string;
  description: string;
  year?: string;
}

const Audio = () => {

  const [data, setData] = useState<IAudioData[] | null>(null);
  // const [loaded, setLoaded] = useState(false);

  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);

  // const [domain, setDomain] = useState('https://discography.franciskahajdu.de');
  const domain: string = 'https://discography.franciskahajdu.de';

  const tableId = useContext(TableIdContext);

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'audio'}`)
      .then((response) => response.json())
      .then((data) => setData(data
        .filter((item: IAudioData) => item.active === '1')));
    // .then(() => setTimeout(() => {
    //   setLoaded(true);
    // }, 500));

    // override domain only if there is another value given. if not, use the default domain

  }, []);

  const handleSelectLabel = (title: string | undefined) => {
    title && title !== selectedLabel ? setSelectedLabel(title) : setSelectedLabel(undefined);
  };

  useEffect(() => {
    // console.log(selectedLabel);
  }, [selectedLabel]);


  const getTrackTitle = (fileName: string | null | undefined) => {
    // Split strings by '-_-'
    const trackTitles = fileName?.split('-_-');

    // Remove file extension
    const trackTitle = trackTitles && trackTitles[1].split('_sample')[0].split('_').join(' ').split('-').join(' ');

    // Between two numbers put a - (dash)
    const trackTitleWithDash = trackTitle?.replace(/(\d+)(\s)(\d+)/g, '$1-$3');

    return trackTitleWithDash;
  };

  return (
    <div className="mt-24">
      <>
        <div className="flex">
          {/* Labels, titles */}
          {data?.map((item, index) => {
            return (
              <div key={`audio-${index}`} className="pb-10">

                {/* CD Title */}
                {/* {item.title && <p className="text-3xl mt-12 mb-6 text-center">{item.title}</p>} */}

                {/* CD Label */}
                {item.label &&
                  <div
                    className={`transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:-translate-y-[15px] md:mx-3 xl:mx-10 cursor-pointer hover:scale-[1.09] ${selectedLabel && selectedLabel === item.title ? 'scale-[1.09] -translate-y-[15px] !shadow-xl' : ''}`}
                    onClick={() => handleSelectLabel(item.title)}
                  >
                    <img className={`mx-auto ${selectedLabel && selectedLabel !== item.title ? 'grayscale-[1] opacity-[.6]' : ''} transition-all duration-[.6s] ease-in-out`} src={`${domain}/${item.folderName}/${item.label}`} alt={`${item.title} label image`} />
                  </div>}

                {/* Release year */}
                {item.year && <p className="uppercase text-center text-xs md:text-md lg:text-lg  my-3">{'Release year:'} <strong>{`${item.year}`}</strong></p>}

              </div>
            );
          })}
        </div>

        {/* Tracks */}
        <div className="relative transition-all duration-300 ease-in-out h-[100%]">
          <div className={`left-0 right-0 transition-all duration-300 ease-in-out ${selectedLabel !== undefined ? 'opacity-1' : 'opacity-0'}`}>
            {data?.map((item, index) => {
              return (
                <div key={`audio-${index}`} className={`flex-none ${selectedLabel === item.title ? 'block' : 'hidden'}`} id={item.title}>
                  <div className="flex flex-row max-w-[550px] mx-auto">

                    {/* Audio player */}
                    <div className="container w-[50px] -translate-y-[7px]">
                      <ReactH5AudioPlayer
                        src={`${domain}/${item.folderName}/${item.fileName}`}
                        volume={0.7}
                        preload="none"
                        showJumpControls={false}
                        showFilledVolume={true}
                        layout="horizontal-reverse"
                        customProgressBarSection={[]}
                        customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
                      />
                    </div>

                    {/* Track name */}
                    <div className="">{getTrackTitle(item.fileName)}</div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </>
    </div>
  );
};

export default Audio;