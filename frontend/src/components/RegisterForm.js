import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Form = styled.form`
    width: 620px;
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
`;

const Input = styled.input`
    border-radius: 0.6em;
    outline: none;
    padding-left: 6px;
    size: 5;
    width: 300px;
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
    width: 300px;
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
    padding: 0.6em;
    h2{
        color: rgb(200, 200, 200);
        font-weight: 340;
        letter-spacing: 3px;
        font-size: 32px;
    }
`

const Hr = styled.hr`
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(152, 152, 152, 0.75), rgba(0, 0, 0, 0));
`

const Error = styled.div`
    color: rgba(255, 60, 60, 0.6);
    background-color: rgba(222,55,55, 0.2);
    padding: 7px;
    margin-left: 50px;
    margin-right: 50px;
    border-radius: 8px;
`;

const Info = styled.div`
    color: rgba(60, 255, 60, 0.6);
    background-color: rgba(55,222,55, 0.2);
    padding: 7px;
    margin-left: 50px;
    margin-right: 50px;
    border-radius: 8px;
`;

const RegisterForm = () => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    const { handleSubmit, register, errors } = useForm();
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [info, setInfo] = useState(false);
    const [InfoMessage, setInfoMessage] = useState('');
    const history = useHistory();
    const toLogin = () => {
        history.push('/login');
    }

    const GetError = (errorMessage) => {
        if (errorMessage === 'Request failed with status code 409'){
            return 'username already exists';
        }
        else {
            return errorMessage;
        }
    }

    const redirectUrl = '/';
    const postUrl = 'http://localhost:8000/user/register/'
    const onSubmit = values => {
        // TODO vypsat error normalne
        if (values.password != values.password_repeat){
            setInfo(false);
            setError(true);
            setErrorMessage('password does not match');
            return;
        }
        axios.post(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: (values)
        })
        .then((response) => {
            if (response.status == 201){
                setError(false);
                setInfo(true);
                setInfoMessage('user created successfully')
                console.log('cool');
            }
            else{
                setInfo(false);
                setError(true);
                console.log('not cool');
            }
        }, (error) => {
            setInfo(false);
            setError(true);
            setErrorMessage(GetError(error.message));
        })
        //history.push(redirectUrl);
    };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>
                <h2>Registration</h2>
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
            {errors.username && errors.username.message}
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
            {errors.password && errors.password.message}
            <Container>
                <Label>
                    repeat password
                </Label>
                <Input name='password_repeat'
                type='password'
                ref={register({
                    required: 'Required',
                    pattern: {
                        message: "invalid data input"
                    }
                })}
                />
            </Container>
            {errors.password && errors.password.message}
            <Container>
                <Button type='submit'>Register</Button>
            </Container>
            {error && <Error>{ErrorMessage}</Error>}
            {info && <Info>{InfoMessage}</Info>}
            <Hr />
            <Container>
                <Button type='button' onClick={toLogin}>Already registered? Log in</Button>
            </Container>
        </Form>
    );
  }

  export default RegisterForm;