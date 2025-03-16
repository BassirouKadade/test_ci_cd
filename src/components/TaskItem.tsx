import React from "react";
import { Task } from "@/types";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className="flex items-center justify-between p-2 bg-card rounded-md">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => toggleTask(task.id)}
        />
        <span className={task.completed ? "line-through text-muted-foreground" : ""}>
          {task.title}{" "}
          <span className="text-sm text-muted-foreground">({task.category})</span>
        </span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => deleteTask(task.id)}
      >
        Supprimer
      </Button>
    </li>
  );
};

export default TaskItem;