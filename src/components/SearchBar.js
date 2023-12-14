import React from 'react'
import '../App.css';

function SearchBar({ onClick, onChange }) {
  
  return (
    <>
      <div className="input-group">
        <input
          type="search"
          className="form-control rounded"
          placeholder="검색어를 입력하세요"
          onChange={onChange}
        />
        <button type="button" id="search_btn" onClick={onClick}>
          검색
        </button>
      </div>
    </>
  );
}

export default SearchBar;