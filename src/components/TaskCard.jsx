import styles from './taskcard.module.scss'
import Badge from './Badge.jsx'

const toneByPriority = {
  low: 'muted',
  medium: 'info',
  high: 'danger'
}

export default function TaskCard({ item, onEdit, onDelete, onToggle }) {
  return (
    <article className={`${styles.card} ${item.done ? styles.done : ''}`}>
      <div className={styles.row}>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={item.done} onChange={onToggle} />
          <span />
        </label>
        <div className={styles.titleWrap}>
          <h4>{item.title}</h4>
          <div className={styles.meta}>
            {item.start && <Badge tone="neutral">{item.start}{item.end ? '–'+item.end : ''}</Badge>}
            {item.type && <Badge tone="accent">{item.type}</Badge>}
            {item.priority && <Badge tone={toneByPriority[item.priority]}>{item.priority}</Badge>}
            {item.location && <Badge tone="muted">{item.location}</Badge>}
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.icon} onClick={onEdit} aria-label="Edytuj">✎</button>
          <button className={styles.icon} onClick={onDelete} aria-label="Usuń">🗑</button>
        </div>
      </div>
      {item.notes && <p className={styles.notes}>{item.notes}</p>}
    </article>
  )
}
