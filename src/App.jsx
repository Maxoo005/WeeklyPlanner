import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import TopBar from './components/TopBar.jsx'
import WeekBoard from './components/WeekBoard.jsx'
import TaskDialog from './components/TaskDialog.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { DAYS, defaultTypes, defaultPriorities } from './lib/constants.js'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('planner.tasks', [])
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ type: 'all', priority: 'all', done: 'all' })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const openCreate = () => { setEditing(null); setDialogOpen(true) }
  const openEdit = (task) => { setEditing(task); setDialogOpen(true) }

  const upsertTask = (payload) => {
    if (editing) {
      setTasks(prev => prev.map(t => t.id === editing.id ? { ...editing, ...payload } : t))
    } else {
      const id = crypto.randomUUID()
      setTasks(prev => [...prev, { id, ...payload }])
    }
    setDialogOpen(false)
    setEditing(null)
  }

  const removeTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const toggleDone = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const clearAll = () => setTasks([])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let out = [...tasks]
    if (q) out = out.filter(t => [t.title, t.location, t.type, t.notes].some(v => (v || '').toLowerCase().includes(q)))
    if (filters.type !== 'all') out = out.filter(t => t.type === filters.type)
    if (filters.priority !== 'all') out = out.filter(t => t.priority === filters.priority)
    if (filters.done !== 'all') out = out.filter(t => (filters.done === 'yes' ? t.done : !t.done))
    return out
  }, [tasks, query, filters])

  const itemsByDay = useMemo(() => {
    const base = Object.fromEntries(DAYS.map(d => [d.key, []]))
    for (const it of filtered) base[it.day].push(it)
    for (const k of Object.keys(base)) base[k].sort((a,b) => (a.start||'').localeCompare(b.start||''))
    return base
  }, [filtered])

  return (
    <div className="app-root">
      <Header onAdd={openCreate} onClear={clearAll} />
      <TopBar
        query={query}
        onQuery={setQuery}
        filters={filters}
        setFilters={setFilters}
        types={defaultTypes}
        priorities={defaultPriorities}
      />
      <WeekBoard
        itemsByDay={itemsByDay}
        onAdd={openCreate}
        onEdit={openEdit}
        onDelete={removeTask}
        onToggle={toggleDone}
      />
      {dialogOpen && (
        <TaskDialog
          open={dialogOpen}
          onClose={() => { setDialogOpen(false); setEditing(null) }}
          onSubmit={upsertTask}
          editing={editing}
        />
      )}
    </div>
  )
}
