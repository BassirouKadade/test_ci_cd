import React, { useState } from "react";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";
import FilterPanel from "./components/FilterPanel";
import { Task } from "./types";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const addTask = (title: string, category: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      category,
      completed: false,
      date: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    if (title) {
      addTask(title, category || ""); // Catégorie optionnelle
      e.currentTarget.reset(); // Réinitialise le formulaire
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-2xl mx-auto p-4">
        <Card className="mb-6">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl">Mes Taches</CardTitle>
            <ThemeToggle />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="title" placeholder="Ajouter une tâche..." />
              <Input name="category" placeholder="Catégorie (ex: perso, pro)" />
              <Button type="submit" className="w-full">
                Ajouter
              </Button>
            </form>
          </CardContent>
        </Card>
        <FilterPanel setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;
