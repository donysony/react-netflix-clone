import React, { useEffect , useState} from 'react';
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

export default function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // const request = axios.get(requests.fetchNowPlaying); //pandding이라고 나오는 이유 : 요청을 기다리지 않고 바로 가져왔기 때문
        // 현재 상영중인 영화 정보를 가져오기(여러 영화)
        const request = await axios.get(requests.fetchNowPlaying); //정상적으로 datafmf rkwudha
        console.log(request);
        // 여러개의 영화중 영화 하나의 id를 골라 가져오도록함
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;
        // 특정 영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)
        // get()으로 가져온 값 중 data안에 movieDetail이므로
        const {data:movieDetail} = await axios.get(`movie/${movieId}`, {
            params:{append_to_response : "videos"},

        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        //str이 있다면
        return str?.length > n ? str.substr(0, n-1) +"..." : str;
    }

    return (
        <header
        className='banner'
        style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: "top center",
            backgroundSize: "cover",
        }}
        >
            <div
            className='banner__contents'
            >
                <h1>{movie.title || movie.name || movie.original_name}</h1>
                <div className='banner__buttons'>
                    <button className='banner__button play'>Play</button>
                    <button className='banner__button info'>More Information</button>
                </div>
            <h1 className='banner__description'>{truncate(movie.overview)}</h1>

            </div>
            <div className='banner--fadeBottom'/>
        </header>
    )
}
