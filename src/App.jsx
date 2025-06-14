import { useEffect, useState } from 'react'
import axios from 'axios'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API_URL = 'https://684d3f0c65ed087139158950.mockapi.io/api/workhome/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [editTask, setEditTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL)
      setTasks(res.data)
      setLoading(false)
    } catch (err) {
      console.error('Error al traer tareas', err)
    }
  }

  const addTask = async (task) => {
    const res = await axios.post(API_URL, task)
    setTasks([...tasks, res.data])
  }

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const updateTask = async (task) => {
    const res = await axios.put(`${API_URL}/${task.id}`, task)
    setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)))
    setEditTask(null)
  }

  const toggleCompleted = async (task) => {
    const res = await axios.put(`${API_URL}/${task.id}`, {
      ...task,
      completed: !task.completed,
    })
    setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)))
  }

  const pendingCount = tasks.filter((t) => !t.completed).length

  return (
    <div>
      <h1>Lista de tareas</h1>
      <p>Tareas pendientes: {pendingCount}</p>
      <TaskForm onAdd={addTask} onUpdate={updateTask} editTask={editTask} />
      {loading ? <p>Cargando tareas...</p> : <TaskList tasks={tasks} onDelete={deleteTask} onEdit={setEditTask} onToggle={toggleCompleted} />}
    </div>
  )
}

export default App
