import { useState, useEffect } from 'react'

const categorias = ['actividades', 'compras', 'tareas del hogar', 'tramites', 'programar']

function TaskForm({ onAdd, onUpdate, editTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('actividades')

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title)
      setDescription(editTask.description)
      setCategory(editTask.category)
    }
  }, [editTask])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTask = {
      title,
      description,
      category,
      completed: false,
    }

    if (editTask) {
      onUpdate({ ...editTask, ...newTask })
    } else {
      onAdd(newTask)
    }

    setTitle('')
    setDescription('')
    setCategory('actividades')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titulo"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripcion"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
        ))}
      </select>
      <button type="submit">{editTask ? 'Actualizar' : 'Agregar'}</button>
    </form>
  )
}

export default TaskForm
