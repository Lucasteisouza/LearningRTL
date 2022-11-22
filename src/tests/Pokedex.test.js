import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests the Pokedex component', () => {
  it('should contain heading /Encountered Pokemon/', () => {
    renderWithRouter(<App />);
    const dexHeader = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(dexHeader).toBeInTheDocument();
  });

  it('should have a workin NextPokemon button that loops', () => {
    renderWithRouter(<App />);
    const nextPkm = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPkm);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextPkm);
    userEvent.click(nextPkm);
    userEvent.click(nextPkm);
    userEvent.click(nextPkm);
    userEvent.click(nextPkm);
    userEvent.click(nextPkm);
    userEvent.click(nextPkm);
    userEvent.click(nextPkm);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('should have a filter button for aech pokemon type', () => {
    renderWithRouter(<App />);
    const filterBtns = screen.queryAllByTestId('pokemon-type-button');
    userEvent.click(filterBtns[0]);
    expect(filterBtns).toHaveLength(7);
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toHaveProperty('disabled');
    userEvent.click(filterBtns[4]);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();
    userEvent.click(nextBtn);
    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(alakazam).toBeInTheDocument();
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(filterBtns[0].textContent).toBe('Electric');
  });
});
