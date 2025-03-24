import React, { useState, useEffect } from 'react';
import './task-timer.css';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const TaskTimer = function TaskTimer({ timeLeftProp, toggleDone, done }) {
  const [timeLeft, setTimeLeft] = useState(timeLeftProp);
  const [isPlay, setIsPlay] = useState(false);
  const [activeInterval, setActiveInterval] = useState('');

  const stopTimer = () => {
    clearInterval(activeInterval);
    setIsPlay(false);
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(interval);
          setIsPlay(false);
          toggleDone();
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);
    setActiveInterval(interval);
    setIsPlay(true);
  };

  const onPlayClick = () => {
    if (!isPlay) {
      startTimer();
    }
  };

  useEffect(() => {
    if (format(timeLeft, 'mm:ss') === '00:01') {
      setTimeout(() => {
        clearInterval(activeInterval);
        setIsPlay(false);
        toggleDone();
      }, 1000);
    }
  }, [activeInterval, toggleDone, timeLeft]);

  useEffect(() => () => clearInterval(activeInterval), [activeInterval]);

  const playButton = <button className="icon icon-play" type="button" aria-label="play" onClick={onPlayClick} />;
  const pauseButton = <button className="icon icon-pause" type="button" aria-label="pause" onClick={stopTimer} />;
  const formatTimeLeft = format(timeLeft, 'mm:ss');

  const button = isPlay ? pauseButton : playButton;

  return (
    <span className={formatTimeLeft === '00:00' || done ? 'hidden' : 'description'}>
      {button}
      {formatTimeLeft}
    </span>
  );
};

TaskTimer.propTypes = {
  toggleDone: PropTypes.func.isRequired,
  timeLeftProp: PropTypes.instanceOf(Date).isRequired,
  done: PropTypes.bool.isRequired,
};

export default TaskTimer;
