import React from 'react';
import { Container, Label, Button, Header, Hr, Form } from './BaseForm';

const InfoBox = (props) => {
    return (
        <Form>
            {props.header && (
                <Container>
                    <Header>
                        <h2>{props.header}</h2>
                    </Header>
                </Container>
            )}
            {props.header && <Hr />}
            {props.text && (
                <Container>
                    <Label>{props.text}</Label>
                </Container>
            )}
            {props.buttonText && (
                <Container>
                    <Button type="button">{props.buttonText}</Button>
                </Container>
            )}
        </Form>
    );
};

export default InfoBox;
