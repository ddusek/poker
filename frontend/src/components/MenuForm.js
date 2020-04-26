import React from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import Cookies from 'js-cookie';


const Form = styled.form`
    width: 500px;
    background-color: rgb(25, 25, 35);
    border: 2.3px outset rgb(152,152,152);
    border-radius: 0.8em;
`;

const Container = styled.div`
    margin: 0.6em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70px;
`;

const Label = styled.label`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    border-radius: 0.6em;
    outline: none;
    padding-left: 6px;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
`;

const Button = styled.button`
    width: 200px;
    background-color: rgb(107, 107, 107);
    border-radius: 0.6em;
    color: white;
    padding: 4px;
    
    :focus{
        outline: none;
    }

    :hover{
        background-color: rgb(185,185,185);
        color: rgb(55,55,55);
    }
`;

const MenuForm = () => {
    var csrftoken = Cookies.get('csrftoken');
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        console.log(values);
        fetch('http://localhost:8000/api/post/game/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(values),
        })
    };
    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Label>
                    players
                </Label>
                <Input name='players'
                type='number'
                ref={register({
                    required: 'Required',
                    pattern: {
                        value: /[2-8]/i,
                        message: "invalid data input"
                    }
                })}
                />
            </Container>
            {errors.players && errors.players.message}
            <Container>
                <Label>
                    chips
                </Label>
                <Input name='chips'
                type='number'
                ref={register({
                    required: 'Required',
                    pattern: {
                        value: /[0-9]{2,7}/i,
                        message: "invalid data input"
                    }
                })}
                />
            </Container>
            {errors.chips && errors.chips.message}
            <Container>
                <Button type='submit'>Start</Button>
            </Container>
        </Form>
    );
  }

  export default MenuForm;