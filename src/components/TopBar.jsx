import styles from './topbar.module.scss'

export default function TopBar({ query, onQuery, filters, setFilters, types, priorities }) {
  return (
    <div className={styles.topbar}>
      <input
        className={styles.search}
        placeholder="Szukaj po tytule, miejscu, typie…"
        value={query}
        onChange={e => onQuery(e.target.value)}
      />
      <div className={styles.filters}>
        <select value={filters.type} onChange={e => setFilters(s => ({ ...s, type: e.target.value }))}>
          <option value="all">Typ: wszystkie</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filters.priority} onChange={e => setFilters(s => ({ ...s, priority: e.target.value }))}>
          <option value="all">Priorytet: wszystkie</option>
          {priorities.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={filters.done} onChange={e => setFilters(s => ({ ...s, done: e.target.value }))}>
          <option value="all">Status: wszystkie</option>
          <option value="no">Tylko otwarte</option>
          <option value="yes">Tylko zakończone</option>
        </select>
      </div>
    </div>
  )
}
