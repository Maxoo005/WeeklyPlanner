import { useEffect, useMemo, useState } from 'react'
import styles from './taskdialog.module.scss'
import { DAYS, defaultPriorities, defaultTypes, emptyTask } from '../lib/constants.js'

export default function TaskDialog({ open, onClose, onSubmit, editing }) {
  const initial = useMemo(() => editing ? editing : emptyTask, [editing])
  const [form, setForm] = useState(initial)
  useEffect(() => setForm(initial), [initial])

  const disabled = !form.title.trim()

  const change = (k, v) => setForm(s => ({ ...s, [k]: v }))

  const save = () => {
    const payload = { ...form, title: form.title.trim() }
    onSubmit(payload)
  }

  if (!open) return null

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.dialog} onMouseDown={e => e.stopPropagation()}>
        <h3>{editing ? 'Edytuj zadanie' : 'Nowe zadanie'}</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <label>Tytuł</label>
            <input value={form.title} onChange={e => change('title', e.target.value)} placeholder="Co masz do zrobienia?" />
          </div>
          <div className={styles.rowGrid}>
            <div>
              <label>Dzień</label>
              <select value={form.day} onChange={e => change('day', e.target.value)}>
                {DAYS.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label>Start</label>
              <input type="time" value={form.start} onChange={e => change('start', e.target.value)} />
            </div>
            <div>
              <label>Koniec</label>
              <input type="time" value={form.end} onChange={e => change('end', e.target.value)} />
            </div>
          </div>
          <div className={styles.rowGrid}>
            <div>
              <label>Typ</label>
              <select value={form.type} onChange={e => change('type', e.target.value)}>
                {defaultTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label>Priorytet</label>
              <select value={form.priority} onChange={e => change('priority', e.target.value)}>
                {defaultPriorities.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label>Miejsce</label>
              <input value={form.location} onChange={e => change('location', e.target.value)} placeholder="Gdzie?" />
            </div>
          </div>
          <div className={styles.row}>
            <label>Notatki</label>
            <textarea rows={4} value={form.notes} onChange={e => change('notes', e.target.value)} placeholder="Dodatkowe informacje" />
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.ghost} onClick={onClose}>Anuluj</button>
          <button className={styles.primary} onClick={save} disabled={disabled}>{editing ? 'Zapisz' : 'Dodaj'}</button>
        </div>
      </div>
    </div>
  )
}
