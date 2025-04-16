import { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ searchTerm, setSearchTerm }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Фокус на поле поиска при монтировании
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current.focus();
  };

  return (
    <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''}`}>
      <div className={styles.searchIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск заметок..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchTerm && (
        <button 
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="Очистить поиск"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;