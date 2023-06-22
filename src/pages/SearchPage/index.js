import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import "./SearchPage.css";
import { useDebounce } from '../../hooks/useDebounce';
export default function SearchPage() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm,500);


    useEffect(() => {
        if(searchTerm){
            fetchSearchMovie(debouncedSearchTerm);
        }        
    },[debouncedSearchTerm]) //searchTerm이 변할 때마다 요청을 보낼수 있도록 fetchSearchMovie함수를 다시 콜하도록 설정

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try{
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
            )
            console.log(request);
            setSearchResults(request.data.results);
        }catch(error){
            console.log("error", error);
        }
    }

    const renderSearchResults = () => {
        // 해당 결과가 있을 때
        return searchResults.length > 0? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person"){
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500"+ movie.backdrop_path
                        return (
                            <div className='movie' key={movie.id}>
                                <div
                                onClick={() => navigate(`/${movie.id}`)} //DetailPage로 이동
                                className='movie__column-poster'
                                >
                                    <img
                                    src={movieImageUrl} 
                                    alt='movie image'
                                    className='movie__poster'
                                    />
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ):(
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>
                        찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다
                    </p>
                </div>
            </section>
        );
    };


    return renderSearchResults();
    }
