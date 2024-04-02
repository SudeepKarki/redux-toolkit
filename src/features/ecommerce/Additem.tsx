import { Button } from "kwant-ui";
import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { addNewItem } from "./ecommerceSlice";

const FormWrap = styled.div`
    form{
        display: flex;
        gap: 10px;
        flex-direction: row;
        row-gap: 5px;
        flex-wrap: wrap;
        input{
            border-radius: 0.5rem;
            padding: .5rem;
            flex-grow: 1;
            border: 1px solid #ccc;
            width: 100%;
        }
    }
`;
const W50 = styled.div`
    flex: 1 0 calc(50% - 5px);
`;
const W100 = styled.div`
    flex: 1 0 calc(100% - 5px);
`;
function Additem() {
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        amount: 0,
        url: ''
    })
    const dispatch = useAppDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name !== "") {
            dispatch(addNewItem(formData));
            console.log("Form Data", formData);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "amount" ? +value : value,
        }))

    }
    return (
        <FormWrap
            onSubmit={handleSubmit}
        >
            <form >
                <W50>
                    <input
                        required
                        onChange={handleChange}
                        placeholder="Item Name"
                        type="text"
                        id="name"
                        name="name"
                    />
                </W50>
                <W50>
                    <input
                        required
                        onChange={handleChange}
                        placeholder="Amount"
                        type="number"
                        id="amount"
                        name="amount"
                    />
                </W50>
                <W100>
                    <input
                        required
                        onChange={handleChange}
                        placeholder="Image Url"
                        type="text"
                        id="url"
                        name="url"
                    />
                </W100>
                <Button label="Add Item" variant="filled" buttontype="primary"></Button>
            </form>
        </FormWrap>
    );
}

export default Additem;