import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Label, Button, Input, Header, Hr, Error } from './BaseForm';

const MyForm = styled(Form)`
    width: 620px;
`;

const MyInput = styled(Input)`
    width: 300px;
`;

const MyButton = styled(Button)`
    width: 300px;
`;

const RegisterForm = () => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    const { handleSubmit, register, errors } = useForm();
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const toLogin = () => {
        history.push('/login');
    };

    const redirectUrl = '/';
    const postUrl = 'http://localhost:8000/user/register/';
    const onSubmit = (values) => {
        // TODO vypsat error normalne
        if (values.password !== values.password_repeat) {
            setError(true);
            setErrorMessage('password does not match');
            return;
        }
        axios
            .post(postUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: values,
            })
            .then(
                (response) => {
                    console.log(response);
                    if (response.status === 201) {
                        console.log('cool');
                        history.push(redirectUrl);
                    } else {
                        console.log('not cool');
                    }
                },
                () => {
                    setError(true);
                    setErrorMessage('username already exists');
                }
            );
    };

    return (
        <MyForm onSubmit={handleSubmit(onSubmit)}>
            <Header>
                <h2>Registration</h2>
            </Header>
            <Hr />
            <Container>
                <Label>username</Label>
                <MyInput
                    name="username"
                    type="text"
                    ref={register({
                        required: 'Required',
                        pattern: {
                            message: 'invalid data input',
                        },
                    })}
                />
            </Container>
            {errors.username && errors.username.message}
            <Container>
                <Label>password</Label>
                <MyInput
                    name="password"
                    type="password"
                    ref={register({
                        required: 'Required',
                        pattern: {
                            message: 'invalid data input',
                        },
                    })}
                />
            </Container>
            {errors.password && errors.password.message}
            <Container>
                <Label>repeat password</Label>
                <MyInput
                    name="password_repeat"
                    type="password"
                    ref={register({
                        required: 'Required',
                        pattern: {
                            message: 'invalid data input',
                        },
                    })}
                />
            </Container>
            {errors.password && errors.password.message}
            <Container>
                <MyButton type="submit">Register</MyButton>
            </Container>
            {error && <Error>{ErrorMessage}</Error>}
            <Hr />
            <Container>
                <MyButton type="button" onClick={toLogin}>
                    Already registered? Log in
                </MyButton>
            </Container>
        </MyForm>
    );
};

export default RegisterForm;
