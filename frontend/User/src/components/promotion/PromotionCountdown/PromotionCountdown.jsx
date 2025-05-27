import React, { useEffect, useState } from 'react';

const PromotionCountdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = new Date(endDate) - new Date();
      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimeLeft('00:00:00');
      } else {
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        setTimeLeft(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return <span>{timeLeft}</span>;
};

export default PromotionCountdown;
