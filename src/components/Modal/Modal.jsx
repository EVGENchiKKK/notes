import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

function Modal({ children, onClose, width = '600px', closeOnOutsideClick = true }) {
  const modalRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (closeOnOutsideClick) {
      const handleClickOutside = (e) => {
        if (modalRef.current && !contentRef.current.contains(e.target)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [onClose, closeOnOutsideClick]);

  // Блокировка скролла при открытом модальном окне
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div ref={modalRef} className={styles.modalOverlay}>
      <div 
        ref={contentRef} 
        className={styles.modalContent}
        style={{ maxWidth: width }}
      >
        <button 
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Закрыть модальное окно"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;