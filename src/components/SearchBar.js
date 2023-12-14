// SearchBar.js

import React from 'react';
import '../App.css';

function SearchBar({ onClick, onChange }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      
      // Enter 키가 눌리면 onClick 함수 호출
      onClick();
    }
  };
  
  return (
    <>
      <div className="input-group">
        <input
          type="search"
          className="form-control rounded"
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
        <button type="button" id="search_btn" onClick={onClick}>
          검색
        </button>
      </div>
    </>
  );
}

export default SearchBar;
