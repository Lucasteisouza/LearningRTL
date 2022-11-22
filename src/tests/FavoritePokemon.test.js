import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests the FavoritePokemon component', () => {
  it('should display /No favorite pokemon found/ if no pokemon has been favorited/', () => {
    renderWithRouter(<App />);
    const favBtn = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(favBtn);

    const noPokemon = screen.getByText(/no favorite pokémon found/i);

    expect(noPokemon).toBeInTheDocument();
  });

  it('should display all favorited pokemon cards', () => {
    renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });

    const homeBtn = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeBtn);

    const nextPkm = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPkm);
    userEvent.click(detailsBtn);
    const favoriteThisPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteThisPokemon);

    const favBtn = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(favBtn);

    const charmander = screen.getByText(/charmander/i);

    expect(charmander).toBeInTheDocument();
  });
});
