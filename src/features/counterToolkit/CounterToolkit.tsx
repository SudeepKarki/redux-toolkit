import { Button } from "kwant-ui";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount } from "./counterToolkitSlice";
import { useState } from "react";

const Wrapper = styled.div`
    display: flex;
    column-gap: 10px;
    input{
            border-radius: 0.5rem;
            padding: .5rem;
            flex-grow: 1;
            border: 1px solid #ccc;
            max-width: 100px;
        }
`;
function CounterToolkit() {

    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const [incrementAmount, setIncrementAmount] = useState('2')
    const incrementValue = Number(incrementAmount) || 0

    const addCount = () => {
        dispatch(increment());
    }
    const removeCount = () => {
        dispatch(decrement());
    }
    const addByAmount = () => {
        dispatch(incrementByAmount(incrementValue))
    }
    const addAsync = () => {
        dispatch(incrementAsync(incrementValue))
    }
    const addOdd = () => {
        dispatch(incrementIfOdd(incrementValue))
    }
    return (
        <div>
            <>
                <h3>{count}</h3><br />
                <Wrapper>
                    <Button label="+" onClick={addCount} />
                    <Button label="-" onClick={removeCount} />
                    <input
                        required
                        // onChange={handleChange}
                        placeholder="Number"
                        type="number"
                        id="name"
                        name="name"
                        value={incrementAmount}
                        onChange={e => {
                            setIncrementAmount(e.target.value)
                        }}
                    />
                    <Button label="Add Amount" buttontype="secondary" onClick={addByAmount} />
                    <Button label="Add Async" buttontype="secondary" onClick={addAsync} />
                    <Button label="Add If Odd" buttontype="secondary" onClick={addOdd} />
                </Wrapper>
            </>
        </div>
    );
}

export default CounterToolkit;