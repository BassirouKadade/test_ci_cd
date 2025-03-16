import './App.css';
import { useState } from 'react';

// Définir une interface pour les tâches
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); // Typage du tableau de tâches
  const [newTask, setNewTask] = useState<string>(''); // Typage de la nouvelle tâche

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Fonction pour marquer une tâche comme complétée
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="App">
      <h1>Liste de Tâches</h1>
      
      {/* Formulaire pour ajouter une tâche */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
          placeholder="Ajouter une nouvelle tâche"
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Liste des tâches */}
      <ul>
        {tasks.map((task: Task) => (
          <li 
            key={task.id}
            style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
            onClick={() => toggleTask(task.id)}
          >
            {task.text}
          </li>
        ))}
      </ul>

      {/* Affichage du nombre de tâches */}
      <p>{tasks.length} tâche(s) au total</p>
    </div>
  );
}

export default App;