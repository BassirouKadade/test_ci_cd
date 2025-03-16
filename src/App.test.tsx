import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  // Test des éléments initiaux
  it('renders the main elements correctly', () => {
    render(<App />);

    expect(screen.getByText('Liste de Tâches')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ajouter une nouvelle tâche')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ajouter/i })).toBeInTheDocument();
    expect(screen.getByText('0 tâche(s) au total')).toBeInTheDocument();
  });

  // Test de l'ajout d'une tâche
  it('adds a new task when submitting the form', () => {
    render(<App />);

    // Simuler l'entrée de texte
    const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche');
    fireEvent.change(input, { target: { value: 'Nouvelle tâche' } });

    // Simuler le clic sur le bouton
    const button = screen.getByRole('button', { name: /Ajouter/i });
    fireEvent.click(button);

    // Vérifier que la tâche apparaît et que le compteur est mis à jour
    expect(screen.getByText('Nouvelle tâche')).toBeInTheDocument();
    expect(screen.getByText('1 tâche(s) au total')).toBeInTheDocument();
    expect(input).toHaveValue(''); // Vérifier que l'input est réinitialisé
  });

  // Test du basculement de l'état completed
  it('toggles task completion when clicked', () => {
    render(<App />);

    // Ajouter une tâche d'abord
    const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche');
    fireEvent.change(input, { target: { value: 'Tâche à tester' } });
    fireEvent.click(screen.getByRole('button', { name: /Ajouter/i }));

    // Trouver l'élément de la tâche
    const taskElement = screen.getByText('Tâche à tester');
    
    // Vérifier l'état initial (non barré)
    expect(taskElement).not.toHaveStyle('text-decoration: line-through');

    // Simuler un clic pour basculer
    fireEvent.click(taskElement);

    // Vérifier que la tâche est maintenant barrée
    expect(taskElement).toHaveStyle('text-decoration: line-through');

    // Simuler un autre clic pour revenir à l'état initial
    fireEvent.click(taskElement);
    expect(taskElement).not.toHaveStyle('text-decoration: line-through');
  });
});