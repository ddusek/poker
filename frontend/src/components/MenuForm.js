import React from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components';

const Form = styled.form`
    width: 33%;
    background-color: rgb(25, 25, 35);
    text-align: center;
    margin: auto;
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    border: 2.3px outset rgb(152,152,152);
    border-radius: 0.8em;

    @media (max-width: 800px){
        width: 80%;
    }
`;

const DivInput = styled.div`
    margin-bottom: 0.6em;

`;

const Label = styled.label`
    color: white;
    display: block;
`;

const Input = styled.input`
    width: 50%;
    border-radius: 0.6em;
    outline: none;
    padding-left: 0.2em;

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
    width: 50%;
    margin-top: 1em;
    margin-bottom: 0.6em;
    background-color: rgb(107, 107, 107);
    //border: 0.5em;
    border-radius: 0.6em;
    color: white;
    padding: 12px 32px;
    
    :focus{
        outline: none;
    }

    :hover{
        background-color: rgb(185,185,185);
        color: rgb(55,55,55);
    }
`;

const MenuForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        console.log(values);
    };
    return(
            <Form onSubmit={handleSubmit(onSubmit)}>
                <DivInput>
                    <Label>
                        players
                    </Label>
                    <Input name='players'
                    className='testClass'
                    type='number'
                    ref={register({
                        required: 'Required',
                        pattern: {
                            value: /^[0-9]$/i,
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
                    className='testClass'
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
            </Form>
    );
  }

  export default MenuForm;