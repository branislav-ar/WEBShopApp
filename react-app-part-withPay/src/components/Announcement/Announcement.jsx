//'rafce'
//basic imports
import React from 'react';
import { mobile } from '../../responsive';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    font-weight: 500;

    height: 30px;
    background-color: teal;
    color: white;

    cursor: default;
    ${mobile({ display: "none" })}
`

const Announcement = () => {
  return (
  <Container>
    Upotreba zaštitnih maski je obavezna u svim objektima!
  </Container>
  )
};

export default Announcement;
