import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Label, Button, Input, Header, Hr, Error } from './BaseForm';

const LoginForm = () => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    const { handleSubmit, register, errors } = useForm();
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const redirectUrl = '/';
    const postUrl = 'http://localhost:8000/user/login/';
    const history = useHistory();

    const toRegister = () => {
        history.push('/register');
    };

    const onSubmit = (values) => {
        axios
            .post(postUrl, {
                body: values,
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('login successfully');
                    history.push(redirectUrl);
                }
            })
            .catch((err) => {
                setError(true);
                setErrorMessage(err);
            });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>
                <h2>Login</h2>
            </Header>
            <Hr />
            <Container>
                <Label>username</Label>
                <Input
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
            {errors.players && errors.players.message}
            <Container>
                <Label>password</Label>
                <Input
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
            {errors.chips && errors.chips.message}
            <Container>
                <Button type="submit">Login</Button>
            </Container>
            {error && <Error>{ErrorMessage}</Error>}
            <Hr />
            <Container>
                <Button type="button" onClick={toRegister}>
                    Register here
                </Button>
            </Container>
        </Form>
    );
};

export default LoginForm;
