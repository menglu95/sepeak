import React, { FC } from 'react';
import styled from 'styled-components';
import logo from '../assets/Logo_White.png';

interface INewsCard {
  className?: string;
  image?: string;
  isShownImage?: boolean;
  title: string;
  body: string;
  width?: number;
  height?: number;
  type: string;
  onClick?: () => void;
}

const NewsCard: FC<INewsCard> = ({
  className = '',
  image = '',
  isShownImage = true,
  title,
  body,
  width = 350,
  height = 347,
  type,
  onClick = undefined
}) => {
  return (
    <Container className={className} src={image} shownImage={isShownImage} width={width} height={height} onClick={onClick}>
      {isShownImage && image === '' && <img src={logo} alt="logo" width={238} height={89} />}
      <Description type={type}>
        <Title>{title}</Title>
        <Content>{body}</Content>
      </Description>
    </Container>
  )
}

const Container = styled.div < { src: string, shownImage: boolean, width: number, height: number }>`
  ${props =>
    props.shownImage && (props.src === '' ?
      'background: var(--purple);' :
      `background-image: url(${props.src});`)}
  width: ${props => props.width}px;
  height: ${props => props.shownImage ? `${props.height}px` : 'fit-content'};
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.src !== '' ? 'flex-end' : 'space-between'};
  color: white;
  img {
    margin-top: 70px;
  }
  margin: 17px 15px 17px 15px;
  cursor: pointer;
  @media only screen and (max-width: 577px) {
    ${props => props.src !== '' && `background-image: url(${props.src});`}
  }
`;

const Description = styled.div<{ type: string }>`
  background-color: var(--primary);
  opacity: 0.9;
  height: 131px;
  width: 100%;
  border-bottom: ${props => props.type === 'sport' && '3px solid var(--red)'};
  border-bottom: ${props => props.type === 'culture' && '3px solid var(--yellow)'};
  border-bottom: ${props => props.type === 'lifeandstyle' && '3px solid var(--blue)'};
`;

const Title = styled.div`
  width: 92%;
  height: 58px;
  margin: 10px 10px 8px 10px;
  font-family: 'Georgia';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: 0.07px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Content = styled.div`
  width: 93%;
  height: 43px;
  margin: 0px 14px 15px 9px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;
`;

export { NewsCard };
export default NewsCard;