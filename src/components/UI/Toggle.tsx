import React from 'react'
import styles from './Toggle.module.css'

interface ToggleProps {
    value: boolean,
    onToggle: (value: boolean) => void,
    style?: React.CSSProperties
}
const Toggle: React.FC<ToggleProps> = ({ value, onToggle, style }) => {
    const onToggleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(event.target.checked)
    }

    return (
        <label className={styles.switch} style={style}>
            <input type="checkbox" checked={value} onChange={onToggleHandler} />
            <div className={styles.slider}>
                <div className={styles.light}>Light</div>
                <div className={styles.dark}>Dark</div>
            </div>
        </label>
    )
}

export default Toggle;