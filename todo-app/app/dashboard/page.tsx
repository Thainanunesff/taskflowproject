"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut, Plus, Search } from "lucide-react"
import TaskList from "@/components/task-list"
import Logo from "@/components/logo"
import type { Task } from "@/lib/types"

export default function Dashboard() {
  const router = useRouter()
  const [newTask, setNewTask] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Learn Next.js", completed: true },
    { id: "2", title: "Build a task app", completed: false },
    { id: "3", title: "Deploy to production", completed: false },
    { id: "4", title: "Add beautiful styling", completed: false },
    { id: "5", title: "Create a logo", completed: false },
  ])

  const handleLogout = () => {
    // In a real app, this would call your logout function
    router.push("/")
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
      }
      setTasks([...tasks, task])
      setNewTask("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const updateTask = (id: string, title: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)))
  }

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <Logo size="md" />
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 text-slate-600">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">Welcome back!</h1>
          <p className="mb-4 text-slate-600">Track your progress and manage your tasks efficiently.</p>

          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              {completedCount} of {totalCount} tasks completed
            </span>
            <span className="text-sm font-medium text-purple-600">{progressPercentage.toFixed(0)}%</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="pl-9"
            />
          </div>

          <form onSubmit={addTask} className="flex gap-2">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="min-w-[200px]"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </form>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">My Tasks</h2>
          <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
        </div>
      </div>
    </div>
  )
}
