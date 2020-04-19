import React from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import {Container} from 'react-bootstrap';

const Styles = styled(Container)`
    width: 100%;
    background-color: rgb(25, 25, 35);

`;

const MenuForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        console.log(values);
    };
    return(
        <Styles>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name='players'
                ref={register({
                    required: 'Required',
                    pattern: {
                        value: /^[0-9]+@[0-9]{2,4}$/i,
                        message: "invalid data input"
                    }
                })}
                />
                {errors.players && errors.players.message}
                <input name='chips'
                ref={register({
                    required: 'Required',
                    pattern: {
                        value: /^[0-9]+@[0-9]{2,4}$/i,
                        message: "invalid data input"
                    }
                })}
                />
                {errors.chips && errors.chips.message}

                <button type='submit'>Start</button>
            </form>
        </Styles>
    );
  }

  export default MenuForm;