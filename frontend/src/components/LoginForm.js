import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';
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
`;

const Hr = styled.hr`
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(152, 152, 152, 0.75), rgba(0, 0, 0, 0));
`;

const Error = styled.div`
    color: rgba(255, 60, 60, 0.6);
    background-color: rgba(222,55,55, 0.2);
    padding: 7px;
    margin-left: 50px;
    margin-right: 50px;
    border-radius: 8px;
`;


const LoginForm = () => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    const { handleSubmit, register, errors } = useForm();
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    
    const history = useHistory();
    const toRegister = () => {
        history.push('/register');
    }

    const redirectUrl = '/';
    const postUrl = 'http://localhost:8000/user/login/';
    
    const onSubmit = values => {
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
                    console.log('login successfully');
                    console.log()
                }
            }, (error) => {
                setError(true);
                setErrorMessage('wrong username or password');
            })
        
        history.push(redirectUrl);
    };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>
                <h2>Login</h2>
            </Header>
            <Hr />
            <Container>
                <Label>
                    username
                </Label>
                <Input name='username'
                type='text'
                ref={register({
                    required: 'Required',
                    pattern: {
                        message: "invalid data input"
                    }
                })}
                />
            </Container>
            {errors.players && errors.players.message}
            <Container>
                <Label>
                    password
                </Label>
                <Input name='password'
                type='password'
                ref={register({
                    required: 'Required',
                    pattern: {
                        message: "invalid data input"
                    }
                })}
                />
            </Container>
            {errors.chips && errors.chips.message}
            <Container>
                <Button type='submit'>Login</Button>
            </Container>
            {error && <Error>{ErrorMessage}</Error>}
            <Hr />
            <Container>
                <Button type='button' onClick={toRegister}>Register here</Button>
            </Container>
        </Form>
    );
  }

  export default LoginForm;