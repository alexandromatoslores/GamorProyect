import React, { useEffect, useState } from 'react';
import styles from '../mainboard/styles.module.css';

/**
 * Componente de cuenta regresiva (cronómetro).
 * Muestra el tiempo restante en formato mm:ss.
 * @param {object} props
 * @param {number} [props.duration=30] - Duración inicial en segundos
 * @param {string} [props.joinedRoom] - Nombre de la sala
 * @returns {JSX.Element}
 */
export default function Clock({ duration = 30, joinedRoom }) { 
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reiniciar el cronómetro cuando se cambia de sala
  useEffect(() => {
    if (joinedRoom) {
      setTimeLeft(duration);
    } else {
      setTimeLeft(duration);
    }
  }, [joinedRoom, duration]);

  useEffect(() => {
    if (!joinedRoom) return; // Solo contar si hay sala
    if (timeLeft <= 0) {
      setTimeLeft(duration); 
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, joinedRoom, duration]);

  // Formatear a mm:ss
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  if (!joinedRoom) return null;

  return (
    <div className={styles.clock}>
      {minutes}:{seconds}
    </div>
  );
} 