import { AnimatePresence, motion } from "framer-motion";
import { Text } from "kwant-ui";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";

const TotalBoxWrap = styled.div`
  width: 400px;
  row-gap: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0 15px 5px rgba(0,0,0,.1);
`;

const Title = styled.div`
    background-color: #E5E5E5;
  border-radius: 1rem;
  padding: 1rem 1.5rem ;
  margin: -1rem -1rem 0;
`;

const SubTotalItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    row-gap: 10px;
    div{
    display: flex;
    width: 100%;
        p{
            flex: 1 0 50%;
            &:first-child{
                font-weight: 600;
            }
            &:last-child{
                text-align: right;
            }
        }
    }
    
`;

const TotalItems = styled(SubTotalItems)`
    border-radius: .5rem;
    border: 1px solid #E5E5E5;
    background-color: #f5f5f5;
    padding: 15px;
    p{
        flex: 1 0 50%;
        &:nth-child(2n-1){
            font-weight: 600;
            font-size: 1rem;
        }
        &:nth-child(2n){
            text-align: right;
            font-weight: 600;
            font-size: .75rem;
        }
    }
`;

function Total() {
    const { items, carts } = useAppSelector(state => state.ecommerce)
    const [products, setProducts] = useState([])
    console.log(products)

    useEffect(() => {
        const cartProducts = items.filter(product => carts.includes(product.id));
        setProducts(cartProducts)
    }, [carts, items])

    const generateSubtotal = useMemo(() => {
        return products.reduce((b, a) => b + a.amount, 0)
    }, [products]);

    const generateTax = useMemo(() => {
        return generateSubtotal * .13;
    }, [generateSubtotal]);

    const generateTotal = () => {
        return generateSubtotal + generateTax;
    }
    return (
        <TotalBoxWrap>
            <Title>
                <Text category='body1'>Total Items In Your Cart</Text>
            </Title>
            <SubTotalItems>
                <AnimatePresence>
                    {products.map((product) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, x: 200 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 200 }}
                                key={product.id}
                            >
                                <div>
                                    <Text category='caption'>{product.name}</Text>
                                    <Text category='caption'>Rs. {product.amount}</Text>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </SubTotalItems>
            <TotalItems>
                <Text category='caption'>Subtotal</Text>
                <Text category='caption'>Rs.
                    {generateSubtotal}
                </Text>
                <Text category='caption'>Tax</Text>
                <Text category='caption'>Rs.
                    {generateTax}
                </Text>
                <Text category='caption'>Total</Text>
                <Text category='caption'>Rs.
                    {generateTotal()}
                </Text>
            </TotalItems>
        </TotalBoxWrap >
    );
}

export default Total;