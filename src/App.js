import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Result from './components/Result';
import './App.css';

function App() {
  const [movie, setMovie] = useState([]);
  const [item, setItem] = useState("");
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  const ServiceKey = process.env.REACT_APP_API_KEY;
  const openPopup = (posterUrl) => {
    setSelectedMoviePoster(posterUrl);
  };

  const closePopup = () => {
    setSelectedMoviePoster(null);
  };

  const searchItem = (event) => {
    setItem(event.target.value);
  };

  const fetchMovie = async () => {
    if (!item.trim()) {
      // console.warn("검색 결과가 없습니다.");
      setMovie([]);
      return;
    }

    // const query = encodeURIComponent(item);
    // const actorquery = encodeURIComponent(item);
    const directquery = encodeURIComponent(item);
    const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&director=${directquery}&ServiceKey=${ServiceKey}`;
  
    try {
      const response = await axios.get(url/* , {
        params: {
          ServiceKey: key,
          collection: 'kmdb_new2',
          listCount: 100,
        },
      } */);
  
      console.log('Response:', response.data);
  
      if (response.data?.Data?.length > 0) {
        const newMovieList = response.data.Data[0].Result;
  
        const responseData = newMovieList.map((movie) => ({
          title: movie.title,
          titleEng: movie.titleEng,
          director: movie.directors?.director[0]?.directorNm || '',
          actors: movie.actors?.actor?.map((actor) => actor.actorNm).join(', ') || '',
          genre: movie.genre || '',
          nation: movie.nation || '',
          repRlsDate: movie.repRlsDate || '',
          kmdbUrl: movie.kmdbUrl || '',
          posterUrl: movie.posters || '', // 여기서 수정
          // ... 다른 필요한 속성들
        }));
  
        setMovie(responseData);
      } else {
        setMovie([]);
      }
    } catch (e) {
      // console.warn("검색 결과가 없습니다.");
      setMovie([]);
      return;
    }
  };

  useEffect(() => {
    if (item.trim()) {
      fetchMovie();
    } else {
      setMovie([]);
    }
  }, []);

  function Popup({ posterUrl, onClose }) {

    const firstPosterUrl = posterUrl.split('|')[0];
    return (
      <div className="popup">
        <img src={firstPosterUrl} alt="Movie Poster" />
        <button onClick={onClose}>닫기</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1><img src={process.env.PUBLIC_URL + 'images/logo-kor.png'} alt="KMDb 로고" /></h1>
      <SearchBar onClick={fetchMovie} onChange={searchItem}></SearchBar>
      <Result movie={movie} openPopup={openPopup} />
      {selectedMoviePoster && (
        <Popup posterUrl={selectedMoviePoster} onClose={closePopup} />
      )}
      <footer>
        Copyright 2023. LEE SEOLHWA All rights reserved.<br />
        한국영상자료원의 OPEN API KEY를 활용해 제작한 사이트입니다.
      </footer>
    </div>
  );
}

export default App;