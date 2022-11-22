import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests th 404 page', () => {
  it('should have a Page not found heading and a specified image', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/unspecifiedURL');
    });

    const img404 = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    const text404 = screen.getByRole('heading', { name: /page requested not found/i });

    expect(img404).toBeInTheDocument();
    expect(img404).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(text404).toBeInTheDocument();
  });
});
