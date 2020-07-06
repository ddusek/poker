import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, Button, Header, Hr, Form } from './BaseForm';

/**
 * Information window component
 */
const InfoBox = ({ header, text, buttonText }) => {
    InfoBox.propTypes = {
        header: PropTypes.string,
        text: PropTypes.string,
        buttonText: PropTypes.string,
    };
    InfoBox.defaultProps = {
        header: 'null',
        text: null,
        buttonText: null,
    };
    return (
        <Form>
            {header && (
                <Container>
                    <Header>
                        <h2>{header}</h2>
                    </Header>
                </Container>
            )}
            {header && <Hr />}
            {text && (
                <Container>
                    <Label>{text}</Label>
                </Container>
            )}
            {buttonText && (
                <Container>
                    <Button type="button">{buttonText}</Button>
                </Container>
            )}
        </Form>
    );
};

export default InfoBox;
