import styles from './emptystate.module.scss'

export default function EmptyState({ onAdd }) {
  return (
    <div className={styles.empty}>
      <div className={styles.card}>
        <h2>Zacznij planować tydzień</h2>
        <p>Dodaj pierwsze zadanie i utrzymuj porządek w planie.</p>
        <button onClick={onAdd} className={styles.primary}>Dodaj zadanie</button>
      </div>
    </div>
  )
}
