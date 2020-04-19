import React from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components';

const Form = styled.form`
    width: 33%;
    background-color: rgb(25, 25, 35);
    text-align: center;

`;

const DivInput = styled.div`
    margin-bottom: 0.6em;
`;

const Label = styled.label`
    color: rgb(255,255,255);
    display: block;
`;

const Input = styled.input`
    width: 50%;
    border-radius: 0.4em;
    outline: none;
    padding-left: 0.2em;
`

const Button = styled.button`
    width: 50%;
    margin-top: 1em;
    margin-bottom: 0.6em;
    background-color: rgb(107, 107, 107);
    border: 0.5em;
    border-radius: 0.4em;
    color: white;
    padding: 15px 32px;
    font-size: 16px;
    outline: none;
`

const MenuForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        console.log(values);
    };
    return(
        <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DivInput>
                    <Label>
                        players
                    </Label>
                    <Input name='players'
                    type='number'
                    ref={register({
                        required: 'Required',
                        pattern: {
                            value: /^[0-9]+@[0-9]{2,4}$/i,
                            message: "invalid data input"
                        }
                    })}
                    />
                </DivInput>
                {errors.players && errors.players.message}
                <DivInput>
                    <Label>
                        chips
                    </Label>
                    <Input name='chips'
                    type='number'
                    ref={register({
                        required: 'Required',
                        pattern: {
                            value: /^[0-9]+@[0-9]{2,4}$/i,
                            message: "invalid data input"
                        }
                    })}
                    />
                </DivInput>
                {errors.chips && errors.chips.message}
                <DivInput>
                    <Button type='submit'>Start</Button>
                </DivInput>
            </form>
        </Form>
    );
  }

  export default MenuForm;