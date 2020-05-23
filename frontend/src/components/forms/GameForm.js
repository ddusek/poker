import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


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

const Header = styled.div`
    margin: 0.6em;
    h2{
        color: rgb(200, 200, 200);
        font-weight: 340;
        letter-spacing: 3px;
        font-size: 32px;
    }
    hr{
        border: 0;
        height: 1px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(152, 152, 152, 0.75), rgba(0, 0, 0, 0));
    }
`

const Error = styled.div`
    color: rgba(255, 60, 60, 0.6);
    background-color: rgba(222,55,55, 0.2);
    padding: 7px;
    margin-left: 50px;
    margin-right: 50px;
    border-radius: 8px;
`;

const GameForm = () => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const { handleSubmit, register, errors } = useForm();
    const history = useHistory();
    const postUrl = 'http://localhost:8000/api/post/game/'
    const onSubmit = values => {
        console.log(values);
        axios
        .post(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: (values)
        })
        .then((response) => {
            if (response.status == 200){
                console.log('game created');
                history.push(response.data.path);
            }
        }, (error) => {
            setError(true);
            setErrorMessage('there was some error creating game');
        })
    };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>
                <h2>Create game</h2>
                <hr />
            </Header>
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
                    starting chips
                </Label>
                <Input name='chips'
                type='number'
                ref={register({
                    required: 'Required',
                    min: 50,
                    max: 1000000,
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

  export default GameForm;