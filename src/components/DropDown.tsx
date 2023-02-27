import React, { FC } from 'react';
import styled from 'styled-components';
import { EDropOptions } from '../common';
import dropIcon from '../assets/dropdown.svg';

interface IDropdown {
  value?: string;
  expand?: boolean;
  onClick?: () => void;
  onSelected?: (e: any) => void;
}

const Dropdown: FC<IDropdown> = ({
  value = '',
  expand = false,
  onClick = undefined,
  onSelected = undefined,
}) => {
  return (
    <Container onClick={onClick}>
      <div>
        <input type="text" readOnly value={value} />
        <img src={dropIcon} alt="dropdown icon" />
      </div>
      <Options expanded={expand}>
        <input type="text" value={EDropOptions.NEWEST_FIRST} readOnly onClick={onSelected} />
        <input type="text" value={EDropOptions.OLDEST_FIRST} readOnly onClick={onSelected} />
      </Options>
    </Container>
  )
}

const Container = styled.div`
  width: 255px;
  height: 45px;
  border-bottom: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div:first-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  cursor: pointer;
  position: relative;
  input {
    cursor: pointer;
    border: none;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.09px;
    &:focus-visible {
      outline: none;
    }
    padding-left: 8px;
  }
`;

const Options = styled.div<{ expanded: boolean }>`
  position: absolute;
  visibility: ${props => props.expanded ? 'visible' : 'hidden'};
  top: 45px;
  input {
    &:hover {
      background-color: var(--grey);
    }
    width: 100%;
    height: 45px;
    padding-left: 9px;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export { Dropdown };
export default Dropdown;