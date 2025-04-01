import React, { useState, useEffect } from 'react';
import './task-timer.css';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const TaskTimer = function TaskTimer({ timeLeftProp, toggleDone, done, startTimer, stopTimer, isPlay }) {
  const [timeLeft, setTimeLeft] = useState(timeLeftProp);
  const [activeInterval, setActiveInterval] = useState(null);

  useEffect(() => {
    setTimeLeft(timeLeftProp);
  }, [timeLeftProp]);

  useEffect(() => {
    if (isPlay) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(interval);
            stopTimer();
            toggleDone();
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setActiveInterval(interval);
    }
    return () => clearInterval(activeInterval);
  }, [toggleDone, timeLeft]);

  const onPlayClick = () => {
    if (!isPlay) {
      startTimer();
    }
  };

  const onPauseClick = () => {
    if (isPlay) {
      stopTimer();
    }
  };

  const playButton = <button className="icon icon-play" type="button" aria-label="play" onClick={onPlayClick} />;
  const pauseButton = <button className="icon icon-pause" type="button" aria-label="pause" onClick={onPauseClick} />;
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
  timeLeftProp: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
};

export default TaskTimer;
