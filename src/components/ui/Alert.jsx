import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from '../mainboard/styles.module.css';

export default function Alert({ message, onClose }) {
  const alertRef = useRef();

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  const alertJSX = (
    <div className={styles.alertOverlay} onClick={handleOverlayClick}>
      <div className={styles.alert} ref={alertRef}>
        <button className={styles.alertCloseBtn} onClick={onClose}>close</button>
        <span>{message}</span>
      </div>
    </div>
  );

  return ReactDOM.createPortal(alertJSX, document.body);
}

