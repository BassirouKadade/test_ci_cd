import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; // Import explicite depuis Vitest (optionnel avec globals: true)
import App from './App';

// Avec describe/it pour une structure claire
describe('App Component', () => {
  it('renders the main elements correctly', () => {
    render(<App />);

    expect(screen.getByText('Mon Projet React')).toBeInTheDocument();
    expect(screen.getByText('Bienvenue !')).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /En savoir plus/i })).toBeInTheDocument();
  });
});