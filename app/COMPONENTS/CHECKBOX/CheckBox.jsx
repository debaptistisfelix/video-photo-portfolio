import styles from './CheckBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faX } from '@fortawesome/free-solid-svg-icons';


export default function CheckBox({ label, checked, onChange }) {
  return (
    <label className={styles.customCheckbox}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.checkboxLabel}>
        <FontAwesomeIcon
  
        icon={checked === true ? faX : faTrash} className={styles.trashIcon} />
      </span>
    </label>
  )
}
