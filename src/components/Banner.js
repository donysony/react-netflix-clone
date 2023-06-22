import React, { useEffect , useState} from 'react';
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";
import styled from 'styled-components';

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    console.log("banner실행")
    useEffect(() => {
        console.log("useEffect 실행")
        //컴포넌트가 실행될 떄 정보를 가지고 있어야하므로 fetchData를 콜함
        fetchData();
    }, []);

    const fetchData = async () => {
        // const request = axios.get(requests.fetchNowPlaying); //pandding이라고 나오는 이유 : 요청을 기다리지 않고 바로 가져왔기 때문
        // 현재 상영중인 영화 정보를 가져오기(여러 영화)
        const request = await axios.get(requests.fetchNowPlaying); //정상적으로 data를 가져옴 
        //↑ axios 라이브러리를 이용해 더보기 db api서버에 요청을 날림
        //비동기로 요청을 보내기 때문에 요청을 보낸 뒤 바로 영화정보가 오는 것이 아니라, 받을것을 처리 하는 텀이 있어야함 -> await으로 기다렸다 받고 난 뒤 request에 담음
        console.log('request',request); //여러개의 영화
        // 여러개의 영화중 영화 하나의 id를 골라 가져오도록함
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id; //movieId로 세세한 정보를 가져올 것임
        console.log('movieID',movieId)
        // 특정 영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)
        // get()으로 가져온 값 중 data안에 movieDetail이므로
        //movieDetail변수 안에 data를 넣어가져옴
        const {data:movieDetail} = await axios.get(`movie/${movieId}`, {
            params:{append_to_response : "videos"},
        }); //받아온 response에 videos도 함께 보내달라
        setMovie(movieDetail); //상세정보를 movies라는 state안에 넣어줌
        console.log('movieDetail',movieDetail);
    };

    const truncate = (str, n) => {
        //str이 있다면
        return str?.length > n ? str.substr(0, n-1) +"..." : str;
    }
    if(!isClicked){
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
                        <button className='banner__button play' onClick={()=> setIsClicked(true)}>Play</button>
                        <button className='banner__button info'>More Information</button>
                    </div>
                <h1 className='banner__description'>{truncate(movie.overview)}</h1>
    
                </div>
                <div className='banner--fadeBottom'/>
            </header>
        )

    }else{
        return (
        
            <Container>
                <HomeContainer>
                <Iframe 
                width="640" 
                height="360" 
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`} 
                title="YouTube video player" 
                frameborder="0" 
                allow="autoplay; fullscreen" 
                allowfullscreen></Iframe>
                </HomeContainer>
            </Container>

        )
    }
}
const Iframe = styled.iframe`
    width:100%;
    height:100%;
    z-index : -1;
    opacity: 0.65;
    border: none;

    &::after{
        content:"";
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
`;

const Container = styled.div`
    display:flex;
    justify-contnet: center;
    align-items : center;
    flex-direction : column;
    width:100%;
    height:100vh;
`;
const HomeContainer = styled.div`
    width:100%;
    height:100%;
`;