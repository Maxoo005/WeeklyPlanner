import styles from './daycolumn.module.scss'
import TaskCard from './TaskCard.jsx'

export default function DayColumn({ dayKey, dayLabel, items, onAdd, onEdit, onDelete, onToggle }) {
  return (
    <section className={styles.col}>
      <div className={styles.head}>
        <h3>{dayLabel}</h3>
        <button className={styles.add} onClick={onAdd}>+</button>
      </div>
      <div className={styles.list}>
        {items.map(it => (
          <TaskCard
            key={it.id}
            item={it}
            onEdit={() => onEdit(it)}
            onDelete={() => onDelete(it.id)}
            onToggle={() => onToggle(it.id)}
          />
        ))}
      </div>
    </section>
  )
}
