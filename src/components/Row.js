import React, {useEffect, useState} from 'react'
import axios from '../api/axios';
import "./Row.css";

export default function Row({isLargeRow, title, id, fetchUrl}) {
    const[movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMovieData(); //fetchMovieData를 콜해줌 1. 처음 렌더링 된 후에 실행
    }, [fetchUrl]);
    
    const fetchMovieData = async () => {
        try{
            const request = await axios.get(fetchUrl);
            console.log('request-fetchMovieData', request)
            setMovies(request.data.results);
            // return request;
            
        }catch(error){
            console.error('Error fetching movie data : ', error)
        }
    }


  return (
    // <section className='row'>
    <section>
        <h2>{title}</h2>
        <div className='slider'>
            <div className='slider__arrow-left'>
                <span className='arrow'>
                    {"<"}
                </span>
            </div>
            <div id={id} className='row__posters'>
        {/* 원본 삽입 */}
            {movies.map((movie) => (
            <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                alt={movie.name}
                // onClick={() => handleClick(movie)}
            />
            ))}
        {/* 원본 삽입 */}
        {/* 방어코드작성 */}
        {/* {movies && movies.length > 0 ? (
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
        )} */}
        {/* 방어코드작성 */}

                {/* {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original/${isLargeRow? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                    ))} */}
            </div>
            <div className='slider__arrow-right'>
                <span className='arrow'>
                    {">"}
                </span>
            </div>
        </div>
    </section>
    // <div></div>
)
}
