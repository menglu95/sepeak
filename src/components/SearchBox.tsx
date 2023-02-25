import React, { FC } from 'react';
import styled from 'styled-components';
import searchIcon from '../assets/search-icon@2x.svg';

interface ISearchBox {
  placeholder: string;
  value?: string;
  expanded?: boolean;
  onClick?: () => void;
  onChange?: (e: any) => void;
  onSubmit?: (e: any) => void;
  onBlur?: () => void;
}

const SearchBox: FC<ISearchBox> = ({
  placeholder,
  value = '',
  expanded = false,
  onClick = undefined,
  onChange = undefined,
  onSubmit = undefined,
  onBlur = undefined,
}) => {
  return (
    <Container tabIndex={0} expand={expanded} onClick={onClick} onSubmit={onSubmit} >
      <input autoFocus type='text' placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
      <img src={searchIcon} alt="search icon" />
    </Container>
  )
}

const Container = styled.form<{ expand: boolean }>`
  width: ${props => !props.expand ? '90px' : '300px'};
  height: 44px;
  color: white;
  background-color: ${props => !props.expand ? 'var(--primary)' : 'var(--light-primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid white;
  margin: auto 0;
  margin-bottom: 0;
  cursor: pointer;
  input {
    display: ${props => !props.expand ? 'none' : 'block'};
    &:focus-visible {
      outline: none;
    }
    &::placeholder {
      color: white;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.09px;
    }
    border: none;
    background-color: var(--light-primary);
    height: 24px;
    caret-color: white;
    margin: 8px 27px 6px 0;
    color: white;
  }
`;

export { SearchBox };
export default SearchBox;