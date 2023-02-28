import React from 'react';
import { render, screen } from '@testing-library/react';
import { NewsCard } from '../../components';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

test('News card component test', () => {
  const args = {
    shownImage: true,
    title: 'test title',
    body: 'test content',
    type: 'sport',
  }
  render(
    <NewsCard {...args} />
  );
  const logoImg = screen.getByTestId('logo-img');
  const titleDom = screen.getByTestId('card-title');
  const titleStr = screen.getByText('test title');
  const contentDom = screen.getByTestId('card-content');
  const contentStr = screen.getByText('test content');
  expect(logoImg).toBeInTheDocument();
  expect(titleDom).toBeInTheDocument();
  expect(titleStr).toBeInTheDocument();
  expect(contentDom).toBeInTheDocument();
  expect(contentStr).toBeInTheDocument();
});

test('News card style test without image', () => {
  const args = {
    isShownImage: false,
    title: 'test title',
    body: 'test content',
    type: 'culture',
  }

  const cssTree = renderer.create(<NewsCard {...args} />);
  const cssTreeJson = cssTree.toJSON();
  const cssInstance = cssTree.root;
  expect(cssInstance.findByType(NewsCard).props.isShownImage).toBe(false);
  expect(cssTreeJson).toHaveStyleRule('justify-content', 'space-between');
});

test('News card style test with image', () => {
  const args = {
    isShownImage: true,
    src: 'test_image_url',
    title: 'test title',
    body: 'test content',
    type: 'lifeandstyle',
  }

  const cssTree = renderer.create(<NewsCard {...args} />);
  const cssTreeJson = cssTree.toJSON();
  const cssInstance = cssTree.root;
  expect(cssInstance.findByType(NewsCard).props.isShownImage).toBe(true);
  expect(cssTreeJson).toHaveStyleRule('background-image', undefined);
});