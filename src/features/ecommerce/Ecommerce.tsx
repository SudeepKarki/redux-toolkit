import styled from "styled-components";
import Additem from "./Additem";
import ProductList from "./ProductList";
import Total from "./Total";

const Wrapper = styled.div`
    display: flex;
    column-gap: 20px;
`;
const LeftWrap = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    flex-grow: 1;
`;
function Ecommerce() {
    return (
        <Wrapper>
            <LeftWrap>
                <Additem />
                <ProductList />
            </LeftWrap>
            <Total />
        </Wrapper>
    );
}

export default Ecommerce;