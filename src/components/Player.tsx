import YouTube from "react-youtube";

interface IPlayer {
  setHasLoaded: any;
  videoId: string;
}

const Player: React.FC<IPlayer> = ({ setHasLoaded, videoId }) => {
  // Once the YouTube package (react-youtube) has loaded
  // tell the thumbnail it is no longer needed.
  // Play the video.
  const _onReady = (event: any): void => {
    setInterval(() => {
      setHasLoaded(true);
    }, 1000);
    event.target.playVideo();
  };

  return (
    <YouTube
      videoId={videoId}
      onReady={_onReady}
      className="bottom-0 h-full left-0 absolute right-0 top-0 w-full"
      iframeClassName="bottom-0 h-full left-0 absolute right-0 top-0 w-full"
    />
  );
};

export default Player;
