import { useState } from "react";
import { useGetMoviesQuery } from "./moviesApiSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const options = [5, 10, 20, 30]

const ContainerBoxWrap = styled.div`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
`;
const ContainerBox = styled.div`
  flex: 0 0 calc(20% - 20px);
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 1rem;
  padding: 5px;
  box-shadow: 0 0 15px 5px rgba(0,0,0,.1);
  cursor: pointer;
  p{
    border-radius: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    color: #fff;
    font-weight: 700;
    font-size: 12px;
    padding: 12px 15px;
    z-index: 999;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.8);
    background: linear-gradient(to bottom, rgba(0,0,0,.2) 0%,rgba(0,0,0,.6) 100%);
  }
`;
const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: .75rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;
const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 50px;
  align-items: center;
  h3{
    white-space: nowrap;
    position: relative;
    font-size: 1rem;
    margin-bottom: 10px;
    &:before{
        position: absolute;
        left: 0;
        bottom: 0;
        content: "";
        width: 40px;
        height: 2px;
        background-color: red;
    }
  }
  select{
    width: 70px;
        height: 40px;
  text-align: center;
  }
  input{
        border-radius: 0.5rem;
        padding: .5rem;
        flex-grow: 1;
        border: 1px solid #ccc;
        width: 100%;
        height: 40px;
    }
    div{
        display: flex;
        gap: 10px;
    }
`;

export const Movies = () => {
    const navigate = useNavigate()
    const [numberOfMovies, setNumberOfMovies] = useState(10)
    const { data, isError, isLoading, isSuccess } = useGetMoviesQuery(numberOfMovies);
    const [searchInput, setSearchInput] = useState('');

    if (isError) {
        return (
            <div>
                <h1>There was an error!!!</h1>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    if (isSuccess) {
        const movieDetail = (id: number) => {
            navigate(`/movies/${id}`)
        }
        const handleSearch = (e) => {
            setSearchInput(e.target.value);
        }
        const filteredMovies = data.data.movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        return (
            <>
                <Heading>
                    <h3>Latest Movies</h3>
                    <div>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search Movie"
                            value={searchInput}
                            onChange={handleSearch} />
                        <select
                            value={numberOfMovies}
                            onChange={e => {
                                setNumberOfMovies(Number(e.target.value))
                            }}
                        >
                            {options.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </Heading>
                <ContainerBoxWrap>
                    {filteredMovies.map(({ id, title, medium_cover_image }) => (
                        <ContainerBox key={id} onClick={() => movieDetail(id)}>
                            <ProductImage
                                alt="Product Image"
                                src={medium_cover_image}
                            />
                            <p>{title}</p>
                        </ContainerBox>
                    ))}
                </ContainerBoxWrap>
            </>
        )
    }
    return null
}

export default Movies;