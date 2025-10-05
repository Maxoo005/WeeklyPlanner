import styles from './weekboard.module.scss'
import DayColumn from './DayColumn.jsx'
import EmptyState from './EmptyState.jsx'
import { DAYS } from '../lib/constants.js'

export default function WeekBoard({ itemsByDay, onAdd, onEdit, onDelete, onToggle }) {
  const empty = Object.values(itemsByDay).every(arr => arr.length === 0)
  return (
    <main className={styles.board}>
      {empty && <EmptyState onAdd={onAdd} />}
      {!empty && (
        <div className={styles.grid}>
          {DAYS.map(d => (
            <DayColumn
              key={d.key}
              dayKey={d.key}
              dayLabel={d.label}
              items={itemsByDay[d.key]}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </main>
  )
}
