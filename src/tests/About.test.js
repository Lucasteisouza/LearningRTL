import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('test the About component', () => {
  it('should contain the info regarding the pokedex', () => {
    renderWithRouter(<App />);
    const aboutBtn = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutBtn);

    const aboutHeading = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    const fstLineAbout = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const scdLineAbout = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    const imgAbout = screen.getByRole('img', { name: /pokédex/i });
    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(aboutHeading).toBeInTheDocument();
    expect(fstLineAbout).toBeInTheDocument();
    expect(scdLineAbout).toBeInTheDocument();
  });
});
