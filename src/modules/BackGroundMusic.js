import React, { useState, useEffect } from 'react';
import music from '../music/bg-music.mp3';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(
    localStorage.getItem('isMuted') === 'true'
  );

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    localStorage.setItem('isMuted', isMuted);
  }, [isMuted]);

  const handleMusicEnd = (event) => {
    event.target.play();
  };

  return (
    <div>
      <button id='music-btn' onClick={handleToggleMute}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <audio src={music} autoPlay loop muted={isMuted} onEnded={handleMusicEnd} />
    </div>
  );
};

export default BackgroundMusic;