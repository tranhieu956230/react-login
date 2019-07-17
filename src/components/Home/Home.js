import React from "react";
import styled from "styled-components";

import Header from "components/shared/Header";

const Home = props => {
  return (
    <div>
      <Header history={props.history}/>
      <Text>HomePage</Text>
    </div>
  );
};

const Text = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2rem;
  color: rgba(41,41,41,0.82);
`;

export default Home;