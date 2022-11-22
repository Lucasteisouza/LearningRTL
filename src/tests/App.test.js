import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests the App component', () => {
  it('should display 3 links on top of page with the text Home, About and Favorite Pokémon, in that order', () => {
    renderWithRouter(<App />);
    const homeBtn = screen.getByRole('link', { name: /home/i });
    const aboutBtn = screen.getByRole('link', { name: /about/i });
    const favPokemonBtn = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(homeBtn).toBeInTheDocument();
    expect(aboutBtn).toBeInTheDocument();
    expect(favPokemonBtn).toBeInTheDocument();
  });

  it('should redirect to the URL / when clicked on the Home link', () => {
    const { history } = renderWithRouter(<App />);
    const homeBtn = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeBtn);

    expect(history.location.pathname).toBe('/');
  });

  it('should redirect to the URL /about when clicked on the About link', () => {
    const { history } = renderWithRouter(<App />);
    const aboutBtn = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutBtn);

    expect(history.location.pathname).toBe('/about');
  });

  it('should redirect to the URL /favorites when clicked on the Pokémon Favoritados link', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemonBtn = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(favPokemonBtn);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('should redirect to the Not Found page with any unespecified URL', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/unspecifiedURL');
    });

    const img404 = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    const text404 = screen.getByRole('heading', { name: /page requested not found/i });

    expect(img404).toBeInTheDocument();
    expect(text404).toBeInTheDocument();
  });
});
