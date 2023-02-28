import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchBox } from '../../components';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

test('Search component test', () => {
  const args = {
    placeholder: 'test placeholder',
    expanded: true,
    onChange: jest.fn(),
  }
  render(
    <SearchBox {...args} />
  );
  const searchInput = screen.getByTestId('search-input');
  const searchIcon = screen.getByTestId('search-icon');
  expect(searchInput).toBeInTheDocument();
  expect(searchIcon).toBeInTheDocument();
});

test('Search component style test', () => {
  const args = {
    placeholder: 'test placeholder',
    onChange: jest.fn(),
  }

  const cssTree = renderer.create(<SearchBox {...args} />);
  const cssTreeJson = cssTree.toJSON();
  const cssInstance = cssTree.root;
  expect(cssInstance.findByType(SearchBox).props.placeholder).toBe(args.placeholder);
  expect(cssTreeJson).toHaveStyleRule('width', '90px');
});