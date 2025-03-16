import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "@/types";
import { Card ,CardContent} from "./ui/card";
interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <Card>
      <CardContent className="p-4">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground">Aucune tâche pour le moment.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;