import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests PokemonDetail component', () => {
  it('should display the pokemon detailed info', () => {
    renderWithRouter(<App />);
    const moreDets = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDets);
    const pikachuDets = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    const summary = screen.getByRole('heading', { name: /summary/i });
    const paragraph = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(pikachuDets).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(moreDets).not.toBeInTheDocument();
  });

  it('should display the location maps for pokemon', () => {
    renderWithRouter(<App />);
    const moreDets = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDets);
    const locationsOf = screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
    const pikachuLocations = screen.getAllByRole('img', { name: /pikachu location/i });
    const kantoVirTxt = screen.getByText(/kanto viridian forest/i);
    const kantoPowerTxt = screen.getByText(/kanto power plant/i);

    expect(locationsOf).toBeInTheDocument();
    expect(pikachuLocations).toHaveLength(2);
    expect(pikachuLocations[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pikachuLocations[1]).toHaveProperty('alt', 'Pikachu location');
    expect(kantoVirTxt).toBeInTheDocument();
    expect(kantoPowerTxt).toBeInTheDocument();
  });

  it('should be able to favorite a pokemon from this screen', () => {
    renderWithRouter(<App />);
    const moreDets = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDets);
    const favoriteThis = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteThis);
    const favStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favStar).toBeInTheDocument();
  });
});
