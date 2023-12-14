// SelectOption.js
import React from 'react';

function SelectOption({ value, onChange }) {
  return (
    <>
      <select value={value} onChange={onChange} className='selectOption'>
        <option value="1">전체검색</option>
        <option value="2">영화제목</option>
        <option value="3">감독</option>
        <option value="4">배우</option>
      </select>
    </>
  );
}

export default SelectOption;
