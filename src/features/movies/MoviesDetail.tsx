import { useParams } from "react-router-dom";
import { MovieApiResponse, useGetMovieDetailsMutation } from "./moviesApiSlice";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MovieWrap = styled.div<{ $bg?: string; }>`
    display: flex;
    background-image: url('${props => props.$bg}');
    background-repeat: no-repeat;
    background-size: cover;
    column-gap: 20px;
    position: relative;
    z-index: 9;
    padding: 15px;
    border-radius: 1rem;
    &:before{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.65) 100%);
        z-index: -9;
        border-radius: 1rem;
    }
`;
const MovieMedia = styled.div`
img{

    border-radius: .75rem;
    box-shadow: 0 10px 20px -8px rgba(0,0,0,.8);
}

`;
const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    h2{
        color: #fff;
        font-size: 1.75rem;
        line-height: 1;
        margin-top: 15px;
    }
    p{
        color: #fff;
        margin: 0;
        font-size: .75rem;
        font-weight: normal;
        text-align: justify;
    }
`;
const MovieOverview = styled.div`
    width: 300px;
    display: flex;
    column-gap: 10px;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    h5{
        color: #fff;
        margin: 0;
        font-size: .75rem;
        font-weight: normal;
    }
    h6{
        color: #fff;
        margin: 0;
        font-size: .75rem;
        font-weight: normal;
        
    }
    span{
        color: #fff;
        margin: 0;
        font-size: .75rem;
        font-weight: normal;
    }
    div{
        display: flex;
        align-items: center;
        column-gap: 5px;
    }
`;

function MoviesDetail() {
    const { movieId } = useParams();
    const [getMovieDetails] = useGetMovieDetailsMutation()
    const [movieInfo, setMovieInfo] = useState<MovieApiResponse | null>(null);

    const fetchMovieDetails = async (movieId: number) => {
        try {
            const result = await getMovieDetails(+movieId).unwrap()
            if (result) {
                setMovieInfo(result);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (movieId) fetchMovieDetails(+movieId)
    }, [movieId])
    return (
        <div>
            {movieInfo ? (
                <MovieWrap $bg={movieInfo.data.movie.background_image}>
                    <MovieMedia>
                        <img src={movieInfo.data.movie.medium_cover_image} />
                    </MovieMedia>
                    <MovieInfo>
                        <h2>{movieInfo.data.movie.title}</h2>
                        <MovieOverview>
                            <div>
                                <img src="https://yts.mx/assets/images/website/logo-imdb.svg" />
                                <span>{movieInfo.data.movie.rating} Rating</span>
                            </div>
                            <h5>{movieInfo.data.movie.runtime} min</h5>
                            <h6>Year : {movieInfo.data.movie.year}</h6>
                        </MovieOverview>
                        <p>{movieInfo.data.movie.description_full}</p>
                    </MovieInfo>
                </MovieWrap>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MoviesDetail;