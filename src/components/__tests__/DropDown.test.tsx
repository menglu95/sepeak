import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Dropdown } from '../../components';

test('Dropdown component test', () => {
  render(
    <Dropdown />
  );
  const filledInput = screen.getByTestId('filled-input');
  const dropIcon = screen.getByTestId('drop-icon');
  const newestOption = screen.getByTestId('newest-option');
  const oldestOption = screen.getByTestId('oldest-option');
  user.click(filledInput);
  expect(filledInput).toBeInTheDocument();
  expect(dropIcon).toBeInTheDocument();
  expect(newestOption).toBeInTheDocument();
  expect(oldestOption).toBeInTheDocument();
});