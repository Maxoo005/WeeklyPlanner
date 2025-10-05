import styles from './header.module.scss'

export default function Header({ onAdd, onClear }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.dot} />
        <h1>Tygodniowy Planer</h1>
      </div>
      <div className={styles.actions}>
        <button className={styles.primary} onClick={onAdd}>Dodaj zadanie</button>
        <button className={styles.ghost} onClick={onClear}>Wyczyść wszystko</button>
      </div>
    </header>
  )
}
