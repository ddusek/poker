import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Label, Button, Input, Header, Error } from './BaseForm';

/**
 * Component form for creating a new game
 */

const GameForm = () => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    const { handleSubmit, register, errors } = useForm();
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const postUrl = 'http://localhost:8000/api/post/game/';
    const onSubmit = (values) => {
        console.log(values);
        axios
            .post(postUrl, {
                body: values,
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('game created');
                    history.push(`${response.data.path}/`);
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
                <h2>Create game</h2>
                <hr />
            </Header>
            <Container>
                <Label>players</Label>
                <Input
                    name="players"
                    type="number"
                    ref={register({
                        required: 'Required',
                        pattern: {
                            value: /[2-8]/i,
                            message: 'invalid data input',
                        },
                    })}
                />
            </Container>
            {errors.players && errors.players.message}
            <Container>
                <Label>starting chips</Label>
                <Input
                    name="chips"
                    type="number"
                    ref={register({
                        required: 'Required',
                        min: 50,
                        max: 1000000,
                        pattern: {
                            value: /[0-9]{2,7}/i,
                            message: 'invalid data input',
                        },
                    })}
                />
            </Container>
            {errors.chips && errors.chips.message}
            <Container>
                <Button type="submit">Start</Button>
            </Container>
            {error && <Error>{ErrorMessage}</Error>}
        </Form>
    );
};

export default GameForm;
