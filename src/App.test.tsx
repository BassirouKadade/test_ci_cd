import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  // Test des éléments initiaux
  it("renders the main elements correctly", () => {
    render(<App />);

    expect(screen.getByText("Mes Taches de la journée")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ajouter une tâche...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Catégorie (ex: perso, pro)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ajouter/i })).toBeInTheDocument();
    expect(screen.getByText("Aucune tâche pour le moment.")).toBeInTheDocument();
  });

  // Test de l'ajout d'une tâche
  it("adds a new task when submitting the form", () => {
    render(<App />);

    const titleInput = screen.getByPlaceholderText("Ajouter une tâche...");
    const categoryInput = screen.getByPlaceholderText("Catégorie (ex: perso, pro)");
    const form = titleInput.closest("form")!;

    // Simuler l'entrée de texte
    fireEvent.change(titleInput, { target: { value: "Nouvelle tâche" } });
    fireEvent.change(categoryInput, { target: { value: "perso" } });

    // Simuler la soumission du formulaire
    fireEvent.submit(form);

    // Vérifier que la tâche apparaît
    expect(screen.getByText("Nouvelle tâche")).toBeInTheDocument();
    expect(screen.getByText("(perso)")).toBeInTheDocument();
    expect(titleInput).toHaveValue("");
    expect(categoryInput).toHaveValue("");
    expect(screen.queryByText("Aucune tâche pour le moment.")).not.toBeInTheDocument();
  });

  // Test du basculement de l'état "completed"
  it("toggles task completion when checkbox is clicked", () => {
    render(<App />);

    const titleInput = screen.getByPlaceholderText("Ajouter une tâche...");
    const categoryInput = screen.getByPlaceholderText("Catégorie (ex: perso, pro)");
    const form = titleInput.closest("form")!;

    fireEvent.change(titleInput, { target: { value: "Tâche à tester" } });
    fireEvent.change(categoryInput, { target: { value: "pro" } });
    fireEvent.submit(form);

    const checkbox = screen.getByRole("checkbox");
    const taskElement = screen.getByText("Tâche à tester");

    expect(checkbox).not.toBeChecked();
    expect(taskElement).not.toHaveClass("line-through");

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(taskElement).toHaveClass("line-through");

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(taskElement).not.toHaveClass("line-through");
  });

  // Test de la suppression d'une tâche
  it("deletes a task when delete button is clicked", () => {
    render(<App />);

    const titleInput = screen.getByPlaceholderText("Ajouter une tâche...");
    const form = titleInput.closest("form")!;

    fireEvent.change(titleInput, { target: { value: "Tâche à supprimer" } });
    fireEvent.submit(form);

    expect(screen.getByText("Tâche à supprimer")).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /Supprimer/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Tâche à supprimer")).not.toBeInTheDocument();
    expect(screen.getByText("Aucune tâche pour le moment.")).toBeInTheDocument();
  });
});