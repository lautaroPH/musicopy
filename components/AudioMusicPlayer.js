import styles from '../styles/AudioPlayer.module.css';
import { useEffect, useRef, useState } from 'react';
import {
    MusicNoteIcon,
    FastForwardIcon,
    PlayIcon,
    RewindIcon,
    VolumeUpIcon,
    PauseIcon,
    VolumeOffIcon
  } from '@heroicons/react/solid';

const AudioMusicPlayer = ({
  artist,
  audio,
  image,
  timestamp,
  title,
}) => {
    const date = new Date(parseInt(timestamp._seconds * 1000));

    let months = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
  
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [openVolume, setOpenVolume] = useState(false);
    const [volumeIcon, setVolumenIcon] = useState("")
  
  
    // references
    const audioPlayer = useRef(); // reference our audio component
    const progressBar = useRef(); // reference our progress bar
    const animationRef = useRef(); // reference the animation
    const volumenRef = useRef()
  
    useEffect(() => {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar?.current?.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
  
    function openInput(){
      setOpenVolume(true)
    }
  
    function closeInput(){
      setOpenVolume(false)
    }
  
    function moverVolumen(e){
      let volumen = volumenRef?.current?.value;
  
      const audioVolume = document.getElementById("1")
      
      audioVolume.volume = volumen / 100;
      
      if(volumen == 0) setVolumenIcon("muted")
      else setVolumenIcon("normal")
    }
  
    const calculateTime = (secs) => {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}:${returnedSeconds}`;
    };
  
    const togglePlayPause = () => {
      const prevValue = isPlaying;
      setIsPlaying(!prevValue);
      if (!prevValue) {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    };
  
    const whilePlaying = () => {
      progressBar?.current?.value = audioPlayer?.current?.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    };
  
    const changeRange = () => {
      audioPlayer.current.currentTime = progressBar?.current?.value;
      changePlayerCurrentTime();
    };
  
    const backThirty = () => {
      progressBar.current.value = Number(progressBar.current.value - 30);
      changeRange();
    }
  
    const forwardThirty = () => {
      progressBar?.current?.value = Number(parseInt(progressBar.current.value) + parseInt(30));
      changeRange();
    }
  
    
    const changePlayerCurrentTime = () => {
      progressBar?.current?.style.setProperty(
        '--seek-before-width',
        `${(progressBar?.current?.value / duration) * 100}%`
      );
      setCurrentTime(progressBar?.current?.value);
    };
  return (
    <div className="reproductor sm:p-12">
      <div className="cancion">
        <div className="border-purple-900 border-2">
          <img className="h-32 w-32" src={image} alt="Caratula de disco" />
        </div>
      </div>
      <div className="reproduccion text-left">
        <div className="ml-3 mb-5">
          <p className="text-gray-400 text-left uppercase mb-2">Por {artist}</p>
          <p className="uppercase font-semibold">
            {title} - {day} {month} {year}
          </p>
        </div>
        <div className={styles.audioPlayer}>
          <audio
            id="1"
            ref={audioPlayer}
            src={audio}
            preload="metadata"
          ></audio>

          {/* current time */}
          <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

          {/* progress bar */}
          <div className="reproduccion__progreso">
            <input
              type="range"
              className="progreso"
              defaultValue="0"
              ref={progressBar}
              onChange={changeRange}
            />
          </div>

          {/* duration */}
          <div className={styles.duration}>
            {duration && !isNaN(duration) ? calculateTime(duration) : '00:00'}
          </div>
        </div>

        <div className="reproduccion__controles">
          <div className="controles__reproduccion">
            <button>
              <RewindIcon
                onClick={backThirty}
                className="h-8 text-purple-600 transition-all duration-300  hover:text-purple-900"
              />
            </button>
            <button onClick={togglePlayPause} className={styles.playPause}>
              {isPlaying ? (
                <PauseIcon className="play text-purple-700 transition-all duration-300  hover:text-purple-900" />
              ) : (
                <PlayIcon className="play text-purple-700 transition-all duration-300  hover:text-purple-900" />
              )}
            </button>
            <button>
              <FastForwardIcon
                onClick={forwardThirty}
                className="h-8 text-purple-600 transition-all duration-300  hover:text-purple-900"
              />
            </button>
          </div>
          <div className="controles__volumen">
            <button type="button" name="button">
              {volumeIcon === 'muted' ? (
                <VolumeOffIcon
                  onClick={!openVolume ? openInput : closeInput}
                  className="h-5 -mr-8 text-purple-600 transition-all duration-300  hover:text-purple-900"
                />
              ) : (
                <VolumeUpIcon
                  onClick={!openVolume ? openInput : closeInput}
                  className="h-5 -mr-8 text-purple-600 transition-all duration-300  hover:text-purple-900"
                />
              )}
            </button>
            <input
              type="range"
              defaultValue="100"
              min="0"
              max="100"
              step="1"
              className={`${!openVolume && 'hidden'}`}
              ref={volumenRef}
              onChange={moverVolumen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioMusicPlayer;
