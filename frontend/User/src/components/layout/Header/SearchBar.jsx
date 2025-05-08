import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update suggestions when the query changes
  useEffect(() => {
    if (query.trim()) {
      // Here you would normally fetch suggestions from an API
      // For now, we'll just filter from history
      const filtered = searchHistory.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, searchHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Add to search history if it doesn't already exist
      if (!searchHistory.includes(query.trim())) {
        // Keep only the last 10 searches
        const newHistory = [query.trim(), ...searchHistory.slice(0, 9)];
        setSearchHistory(newHistory);
      }
      
      onSubmit(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSubmit(suggestion);
    setShowSuggestions(false);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    setSuggestions([]);
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Bạn tìm gì..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <i className="fas fa-search"></i>
        </button>
      </form>

      {showSuggestions && (
        <div className={styles.suggestionsContainer}>
          {query.trim() === '' && searchHistory.length > 0 && (
            <>
              <div className={styles.suggestionHeader}>
                <span>Lịch sử tìm kiếm</span>
                <button 
                  onClick={handleClearHistory}
                  className={styles.clearButton}
                >
                  Xóa tất cả
                </button>
              </div>
              <ul className={styles.suggestionsList}>
                {searchHistory.map((item, index) => (
                  <li 
                    key={`history-${index}`}
                    onClick={() => handleSuggestionClick(item)}
                    className={styles.suggestionItem}
                  >
                    <i className="fas fa-history"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {query.trim() !== '' && (
            <ul className={styles.suggestionsList}>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <li 
                    key={`suggestion-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={styles.suggestionItem}
                  >
                    <i className="fas fa-search"></i>
                    <span>{suggestion}</span>
                  </li>
                ))
              ) : (
                <li className={styles.noResults}>
                  Không có kết quả cho "{query}"
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 