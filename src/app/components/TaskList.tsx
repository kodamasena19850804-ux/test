import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Star } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  emoji: string;
}

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onUncompleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onCompleteTask, onUncompleteTask }: TaskListProps) {
  return (
    <div className="p-3 pb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <span>今日のやる事</span>
        <span className="text-xl">✨</span>
      </h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`p-3 transition-all ${
              task.completed
                ? "bg-gradient-to-r from-green-50 to-green-100 border-green-300"
                : "bg-white hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-2xl flex-shrink-0">{task.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium text-sm ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-600">
                      {task.points}pt
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => task.completed ? onUncompleteTask(task.id) : onCompleteTask(task.id)}
                size="sm"
                className={
                  task.completed
                    ? "bg-green-500 hover:bg-green-600 text-xs px-2 py-1 h-auto"
                    : "bg-pink-500 hover:bg-pink-600 text-xs px-2 py-1 h-auto"
                }
              >
                {task.completed ? (
                  <>
                    <Check className="size-3 mr-1" />
                    完了
                  </>
                ) : (
                  "やったよ"
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}