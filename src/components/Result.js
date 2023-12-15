import React from 'react';
import '../App.css';

function Result({ movie, openPopup }) {
  return (
    <div className="result">
      {movie.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>감독</th>
              <th>배우</th>
              <th>장르</th>
              <th>국가</th>
              <th>연도</th>
            </tr>
          </thead>
          <tbody>
            {movie.map((item, index) => (
              <tr key={index} onClick={() => openPopup(item.posterUrl)}>
                <td>
                  {item.title.replace(/\!HE/g, "").replace(/\!HS/g, "")}
                  <br />
                  {item.titleEng}
                </td>
                <td>{item.directors.replace(/\!HE/g, "").replace(/\!HS/g, "")}</td>
                <td>{item.actors.replace(/\!HE/g, "").replace(/\!HS/g, "")}</td>
                <td>{item.genre}</td>
                <td>{item.nation}</td>
                <td>{item.repRlsDate.slice(0, 4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        movie.length === 0 && <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default Result;