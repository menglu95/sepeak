import React, { FC } from 'react';
import styled from 'styled-components';
import logo from '../assets/Logo_White.png';

interface INewsCard {
  image?: string;
  title: string;
  body: string;
  width?: number;
  height?: number;
  type: 'Sports' | 'Culture' | 'Lifestyle';
}

const NewsCard: FC<INewsCard> = ({
  image = '',
  title,
  body,
  width = 350,
  height = 347,
  type,
}) => {
  return (
    <Container src={image} width={width} height={height}>
      {image === '' && <img src={logo} alt="logo" width={238} height={89} />}
      <Description type={type}>
        <Title>{title}</Title>
        <Content>{body}</Content>
      </Description>
    </Container>
  )
}

const Container = styled.div<{ src: string, width: number, height: number }>`
  ${props =>
    props.src === '' ?
      'background: var(--purple);' :
      `background-image: url(${props.src});`}
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  img {
    margin-top: 70px;
  }
`;

const Description = styled.div<{ type: string }>`
  background-color: var(--primary);
  opacity: 0.9;
  height: 131px;
  border-bottom: ${props => props.type === 'Sports' && '3px solid var(--red)'};
  border-bottom: ${props => props.type === 'Culture' && '3px solid var(--yellow)'};
  border-bottom: ${props => props.type === 'Lifestyle' && '3px solid var(--blue)'};
`;

const Title = styled.div`
  width: 330px;
  margin: 10px 10px 8px 10px;
  font-family: 'Georgia';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: 0.07px;
`;

const Content = styled.div`
  width: 327px;
  margin: 0px 14px 15px 9px;
`;

export { NewsCard };
export default NewsCard;