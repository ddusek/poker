import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PotChips from './PotChips';
import PotText from './PotText';

const Container = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
    transform: translateX(-50%);
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    border-style: dotted;
`;

const PotContainer = ({ pot, left, top, height = '110px', width = '120px' }) => {
    PotContainer.propTypes = {
        pot: PropTypes.number.isRequired,
        left: PropTypes.string.isRequired,
        top: PropTypes.string.isRequired,
        height: PropTypes.string,
        width: PropTypes.string,
    };
    PotContainer.defaultProps = {
        height: '110px',
        width: '120px',
    };
    return (
        <Container left={left} top={top} height={height} width={width}>
            <PotChips pot={pot} />
            <PotText pot={pot} />
        </Container>
    );
};

export default PotContainer;
