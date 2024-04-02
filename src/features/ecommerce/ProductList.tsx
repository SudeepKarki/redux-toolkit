import { Button, Text } from "kwant-ui";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { addToCart, removeFromCart } from "./ecommerceSlice";

const ContainerBoxWrap = styled.div`
  flex-grow: 1;
  row-gap: 20px;
  display: flex;
  flex-direction: column;
`;
const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background-color: #f9f9f9;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0 15px 5px rgba(0,0,0,.1);
`;
const CardWrapper = styled.div`
    display: flex;
    column-gap: 10px;
    padding: 18px;
`;
const ButtonGroup = styled.div`
    display: flex;
    column-gap: 8px;
`;
const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`;
const ProductImage = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
`;

function ProductList() {
    const { items, carts } = useAppSelector(state => state.ecommerce)
    const dispatch = useAppDispatch();

    const addCart = (id: number) => {
        dispatch(addToCart(id));
    }

    const removeCart = (id: number) => {
        dispatch(removeFromCart(id));
    }

    return (
        <ContainerBoxWrap>
            {items.map(({ name, amount, id, url }) =>
                <ContainerBox key={id}>
                    <CardWrapper>
                        <ProductImage
                            alt="Product Image"
                            src={url}
                        />
                        <CardContent>
                            <Text category='body1'><b>{name}</b> Water Bottle</Text>
                            <Text category='caption'>Rs. {amount}</Text>
                            <ButtonGroup>
                                <AnimatePresence>
                                    {carts.includes(id) ?
                                        <Button label="Remove" buttontype="error" onClick={() => removeCart(id)}></Button>

                                        :
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            <Button label="Add To Cart" buttontype="secondary" onClick={() => addCart(id)}></Button>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </ButtonGroup>
                        </CardContent>
                    </CardWrapper >
                </ContainerBox>
            )}
        </ContainerBoxWrap>
    );
}

export default ProductList;