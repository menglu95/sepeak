import React from 'react';
import { BrowserRouter as BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { TNewsData } from '../../common';
import { ISportsBundle, SportsBundle } from '../../components';

test('Sports bundle component test', () => {
  const args: ISportsBundle = {
    title: 'test title',
    data: [{ id: '1' } as TNewsData],
  }

  render(
    <BrowserRouter>
      <SportsBundle {...args} />
    </BrowserRouter>
  );
  const titleEle = screen.getByTestId('title');
  const newsCards = screen.getAllByTestId('news-card');
  expect(titleEle).toBeInTheDocument();
  expect(newsCards.length).toEqual(1);
});