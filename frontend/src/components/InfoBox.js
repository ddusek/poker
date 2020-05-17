import React, {useState, Component} from 'react'
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';


const Styles = styled.div`
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

const Header = styled.div`
    margin: 0.6em;
    h2{
        color: rgb(200, 200, 200);
        font-weight: 340;
        letter-spacing: 3px;
        font-size: 32px;
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

const Hr = styled.hr`
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(152, 152, 152, 0.75), rgba(0, 0, 0, 0));
`;

const InfoBox = (props) => {
    return(
        <Styles >
            {props.header && 
                <Container>
                    <Header>
                        {props.header}
                    </Header>
                </Container>
            }
            {props.header && 
                <Hr />
            }
            {props.text && 
                <Container>
                    <Label>
                        {props.text}
                    </Label>
                </Container>
            }
            {props.buttonText &&
                <Container>
                    <Button type='button'>{props.buttonText}</Button>
                </Container>
            }
        </Styles>
    );
  }

  export default InfoBox;