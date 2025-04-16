"use client"

import { useState } from "react"
import type { Task } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Trash2, X, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, title: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const startEditing = (task: Task) => {
    setEditingId(task.id)
    setEditValue(task.title)
  }

  const cancelEditing = () => {
    setEditingId(null)
  }

  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      onUpdate(id, editValue)
    }
    setEditingId(null)
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600">
          <Check className="h-6 w-6" />
        </div>
        <p className="text-center text-slate-500">No tasks found. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={cn(
            "overflow-hidden transition-all duration-200",
            task.completed ? "border-green-100 bg-green-50" : "hover:border-purple-100 hover:shadow-md",
          )}
        >
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              {editingId === task.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                    className="flex-1"
                  />
                  <Button size="icon" variant="ghost" onClick={() => saveEdit(task.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={cancelEditing}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center flex-1 gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => onToggle(task.id)}
                      id={`task-${task.id}`}
                      className={task.completed ? "border-green-500 bg-green-500" : ""}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={cn(
                        "flex-1 cursor-pointer font-medium transition-all duration-200",
                        task.completed ? "text-green-600 line-through" : "text-slate-700",
                      )}
                    >
                      {task.title}
                    </label>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEditing(task)}
                      className="text-slate-400 hover:text-purple-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(task.id)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
