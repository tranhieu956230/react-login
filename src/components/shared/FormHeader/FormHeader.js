import React from "react";
import styled from "styled-components";

import facebookImg from "assets/facebook.svg";
import googleImg from "assets/google.svg";
import linkedinImg from "assets/linkedin.svg";
import lineImg from "assets/login_line.svg";

const FormHeader = props => {
  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
      <SocialWrapper>
        <SocialNetwork background={facebookImg} />
        <SocialNetwork background={googleImg} />
        <SocialNetwork background={linkedinImg} />
      </SocialWrapper>
      <LineWrapper>
        <Line src={lineImg} />
        <SmallText>or</SmallText>
        <Line src={lineImg} />
      </LineWrapper>
    </Wrapper>
  );
};

const LineWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: .8rem;
`;

const SmallText = styled.span`
  font-size: 1.1rem;
  color: #555a59;
  text-transform: uppercase;
  padding: 0 0.8rem;
`;

const Line = styled.img`
  max-width: 38%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 4.2rem;
  line-height: 5.2rem;
  margin-bottom: 0.8rem;
  color: #202121;
  text-align: center;
  font-weight: 700;
`;

const Description = styled.h3`
  color: #555a59;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1.6rem;
  line-height: 1.6;
  font-weight: 300;
`;

const SocialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 18rem;
  margin-bottom: 1.5rem;
`;

const SocialNetwork = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 100%;
  background-image: url(${props => props.background});
  cursor: pointer;
  background-position: center;
  background-size: cover;
`;

export default FormHeader;
