import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectOption from './components/SelectOption';
import SearchBar from './components/SearchBar';
import Result from './components/Result';
import { isEqual } from 'lodash';
import './App.css';


function App() {
  const [movie, setMovie] = useState([]);
  const [item, setItem] = useState('');
  const [optVal, setOptVal] = useState('1');
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  const ServiceKey = process.env.REACT_APP_API_KEY;
  console.log(ServiceKey);
  
  const openPopup = (posterUrl) => {
    setSelectedMoviePoster(posterUrl);
  };

  const closePopup = () => {
    setSelectedMoviePoster(null);
  };

  const searchItem = (event) => {
    setItem(event.target.value);
  };

  const handleSelectChange = (event) => {
    setOptVal(event.target.value);
  };

  function Popup({ posterUrl, onClose }) {
    const handlePopupClick = () => {
      onClose();
    };
    
    const firstPosterUrl = posterUrl.split('|')[0];

    return (
      <div className="popup" onClick={handlePopupClick}>
        <img src={firstPosterUrl} alt="Movie Poster" />
      </div>
    );
  }

  const fetchMovie = async () => {
    if (!item.trim()) {
      setMovie([]);
      return;
    }

    const query = encodeURIComponent(item);
    

    let url;
    // 옵션에 따라 URL 선택
    if (optVal === '1') {
      url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&query=${query}&ServiceKey=${ServiceKey}&listCount=20`;
    } else if (optVal === '2') {
      url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&title=${query}&ServiceKey=${ServiceKey}&listCount=20&sort=prodYear,1`;
    } else if (optVal === '3') {
      url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&director=${query}&ServiceKey=${ServiceKey}&listCount=20&sort=prodYear,1`;
    } else if (optVal === '4') {
      url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&actor=${query}&ServiceKey=${ServiceKey}&listCount=20&sort=prodYear,1`;
    }
    
    
    try {
      const response = await axios.get(url);

      if (response.data?.Data?.length > 0) {
        const newMovieList = response.data.Data[0].Result;

        const responseData = newMovieList.map((movie) => ({
          title: movie.title,
          titleEng: movie.titleEng,
          directors: movie.directors?.director?.map((director) => director.directorNm).join(', ') || '',
          actors: movie.actors?.actor?.map((actor) => actor.actorNm).join(', ') || '',
          genre: movie.genre || '',
          nation: movie.nation || '',
          repRlsDate: movie.repRlsDate || '',
          kmdbUrl: movie.kmdbUrl || '',
          posterUrl: movie.posters || '',
        }));

        if (!isEqual(movie, responseData)) {
          setMovie(responseData); 
        }
      } else {
        setMovie([]);
      }
    } catch (e) {
      setMovie([]);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (item.trim() && optVal) {
        await fetchMovie();
      } else {
        setMovie([]);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (item.trim() && optVal) {
      await fetchMovie();
    } else {
      setMovie([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleSearch();
    };

    fetchData();
  }, [optVal]);

  return (
    <>
      <div className="App">
        <h1><img src={process.env.PUBLIC_URL + 'images/logo-new.png'} alt="KMDb 로고" /></h1>
        {/* 옵션 선택을 위한 select 요소 */}
        <div className='searchSelect'>
          <SelectOption value={optVal} onChange={handleSelectChange} />
          <SearchBar onClick={handleSearch} onChange={searchItem}></SearchBar>

        </div>
          {/* 옵션에 따라 다른 Result 컴포넌트 렌더링 */}
          {(optVal === '1' || optVal === '2' || optVal === '3' || optVal === '4') && <Result movie={movie} openPopup={openPopup} />}

          {selectedMoviePoster && (
            <Popup posterUrl={selectedMoviePoster} onClose={closePopup} />
          )}
        <footer>
          Copyright 2023. LEE SEOLHWA All rights reserved.<br />
          한국영상자료원의 OPEN API KEY를 활용해 제작한 사이트입니다.
        </footer>
      </div>
    </>
  );
}

export default App;
