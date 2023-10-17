import styles from './CheckBox.module.css';


export default function CheckBox({ label, checked, onChange }) {
  return (
    <label className={styles.customCheckbox}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.checkboxLabel}>{label}</span>
    </label>
  )
}
