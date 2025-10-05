import styles from './badge.module.scss'

export default function Badge({ tone = 'neutral', children }) {
  const toneClass = tone !== 'neutral' && styles[tone] ? styles[tone] : ''
  return <span className={`${styles.badge} ${toneClass}`}>{children}</span>
}
