import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import Signin from '../Signin';

const MockRouterSignin = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Signin />
    </Provider>
  </BrowserRouter>
);

test('renders login link', () => {
  render(<MockRouterSignin />);
  const buttonElement = screen.getByText(/Sign in/i, { selector: 'button' });
  expect(buttonElement).toBeInTheDocument();
});
