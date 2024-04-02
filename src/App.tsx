import { Button } from 'kwant-ui';
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import CounterToolkit from './features/counterToolkit/CounterToolkit';
import Dashboard from './features/dashboard/Dashboard';
import { Quotes } from "./features/quotes/Quotes";
import Ecommerce from './features/ecommerce/Ecommerce';
import Movies from './features/movies/Movies';
import MoviesDetail from './features/movies/MoviesDetail';

const Wrapper = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  min-width: 250px;
  display: flex;
  row-gap: 10px;
  flex-direction: column;
  padding: 20px;;
  button{
    width: 100%;
  }
`;
const Main = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  flex-grow: 1;
  min-height: 100vh;
`;

const App = () => {
  return (
    <>
      <Wrapper>
        <Sidebar>
          <Link to="/"><Button label='Dashboard' buttontype='success' /></Link>
          <Link to="/quotes"><Button label='Quotes' buttontype='secondary' /></Link>
          <Link to="/counter"><Button label='Counter' buttontype='secondary' /></Link>
          <Link to="/counter-toolkit"><Button label='Counter Toolkit' buttontype='secondary' /></Link>
          <Link to="/ecommerce"><Button label='Ecommerce' buttontype='secondary' /></Link>
          <Link to="/movies"><Button label='Movies' buttontype='secondary' /></Link>
        </Sidebar>
        <Main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="counter" element={<Counter />} />
            <Route path="counter-toolkit" element={<CounterToolkit />} />
            <Route path="ecommerce" element={<Ecommerce />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId" element={<MoviesDetail />} />
          </Routes>
        </Main>
      </Wrapper>
    </>
  )
}

export default App
