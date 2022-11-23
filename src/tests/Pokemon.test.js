import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests the Pokemon component', () => {
  it('should display the pokemon name, type and weigth', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuType = screen.queryAllByText(/electric/i);
    const pikachuWeighth = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pikachuName).toBeInTheDocument();
    expect(pikachuType[1]).toBeInTheDocument();
    expect(pikachuType[1].innerHTML).toBe('Electric');
    expect(pikachuWeighth).toBeInTheDocument();
    const normalBtn = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalBtn);
    const snorlaxName = screen.getByText(/snorlax/i);
    const snorlaxType = screen.queryAllByText(/normal/i);
    const snorlaxWeighth = screen.getByText(/average weight: 460\.0 kg/i);
    expect(snorlaxName).toBeInTheDocument();
    expect(snorlaxType[1]).toBeInTheDocument();
    expect(snorlaxType[1].innerHTML).toBe('Normal');
    expect(snorlaxWeighth).toBeInTheDocument();
  });

  it('should display the pokemon image and alt text', () => {
    renderWithRouter(<App />);
    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuImg).toHaveProperty('alt', 'Pikachu sprite');
    const dragonBtn = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonBtn);
    const dragonairImg = screen.getByRole('img', { name: /dragonair sprite/i });
    expect(dragonairImg).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    expect(dragonairImg).toHaveProperty('alt', 'Dragonair sprite');
  });

  it('should have a link to a detailed view of the pokemon', () => {
    renderWithRouter(<App />);
    const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsBtn).toBeInTheDocument();
  });

  it('should redirect to the details page when the link is clicked, the redirect link should be /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsBtn);
    expect(history.location.pathname).toBe('/pokemon/25');
  });

  it('should redirect to the details page when the link is clicked', () => {
    renderWithRouter(<App />);
    const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsBtn);
    const pikachuDets = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(pikachuDets).toBeInTheDocument();
  });

  it('should contain a star icon with the correct src and alt text when favorited', () => {
    renderWithRouter(<App />);
    const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsBtn);
    const favoriteThis = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteThis);
    const homeBtn = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeBtn);
    const pikachuStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(pikachuStar).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(pikachuStar).toHaveProperty('alt', 'Pikachu is marked as favorite');
  });
});
