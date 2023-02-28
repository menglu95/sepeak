import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading } from '../../components';

test('loading component test', () => {
  render(
    <Loading />
  );
  const loadingSpinner = screen.getByTestId('loading-spinner');
  expect(loadingSpinner).toBeInTheDocument();
});