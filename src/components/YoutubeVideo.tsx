import { useTransition, useState, lazy, useEffect } from "react";
// Use React.lazy to create a new chunk.
const Player = lazy(() => import("./Player"));

interface IYoutubeVideo {
  youtubeId: string;
  quality: 'low' | undefined;
}

const YoutubeVideo: React.FC<IYoutubeVideo> = ({
  youtubeId,
  quality,
}) => {

  // useTransition is used to let React know there will be a
  // rerender when the button is pressed.
  const [, startTransition] = useTransition();

  // These two states handle the button press, and
  // the loading of the YouTube iframe.
  const [showVideo, setShowVideo] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const thumbnailProvider = 'https://i.ytimg.com/vi/';

  // If the quality of the video is low, use the low quality thumbnail.
  const thumbnailUrl = quality === 'low' ?
    `${thumbnailProvider}${youtubeId}/hqdefault.jpg` :
    `${thumbnailProvider}${youtubeId}/maxresdefault.jpg`;

  return (
    <div className="max-w-[700px] min-w-[400px]">
      <div className="overflow-x-scroll mt-7 p-0 pt-[56.25%] relative w-full">
        {
          // If the button has not been pressed, and the YouTube
          // video is not loading - keep the button rendered.
        }
        {(!showVideo || !hasLoaded) && (
          <button
            className="bottom-0 height-full left-0 absolute right-0 top-0 w-full bg-transparent border-0 cursor-pointer block m-0 p-0 no-underline"
            onClick={() => {
              startTransition(() => {
                setShowVideo(true);
              });
            }}
          >
            <div className="bottom-0 h-[100%] left-0 absolute right-0 top-0 w-full">
              <img
                alt="Fwar - Mushrooms video thumbnail"
                src={thumbnailUrl}
                className="w-full"
                loading="lazy"
              />
              <img
                alt="Play Video"
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg"
                loading="lazy"
                className="h-[42px] absolute transition-all duration-[.3s] ease-in-out w-[60px] top-[50%] -translate-y-[25%] left-0 right-0 mx-auto"
              />
            </div>
          </button>
        )}
        {showVideo && (
          <Player videoId={youtubeId} setHasLoaded={setHasLoaded} />
        )}
      </div>
    </div>
  );
};

export default YoutubeVideo;