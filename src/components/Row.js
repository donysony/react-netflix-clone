import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    console.log("row의 useEffect()실행");
    fetchMovieData(); //fetchMovieData를 콜해줌 1. 처음 렌더링 된 후에 실행
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request-fetchMovieData", request);
    setMovies(request.data.results);

    // try{
    //     const request = await axios.get(fetchUrl);
    //     console.log('request-fetchMovieData', request)
    //     setMovies(request.data.results);
    //     // return request;

    // }catch(error){
    //     console.error('Error fetching movie data : ', error)
    // }
  };
  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
        
      >
        <div id={id} className="row__posters">
        {movies.map((movie) => (      
            <SwiperSlide key={movie.id} > 
              <img
                style={{ padding: "25px 0" }}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}

{
  /* 방어코드작성 */
}
{
  /* {movies && movies.length > 0 ? (
    movies.map((movie) => (
        <img
        key={movie.id}
        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
        src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
        alt={movie.name}
        />
        ))
        ) : (
            <p>No movies available</p>
        )} */
}
{
  /* 방어코드작성 */
}
