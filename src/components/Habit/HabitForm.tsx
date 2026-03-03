import { useState } from "react"
import type { HabitFormPropsType } from "./types"
import { COLORS } from "../constant"
import "./styles.css"
const HabitForm = ({ onAdd }: HabitFormPropsType) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState(COLORS[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name.trim(), color)
    setName("")
  }

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <div className="habit-form-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit..."
          className="habit-input"
        />
        <button type="submit">Add</button>
      </div>
      <div className="color-picker">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`color-swatch${color === c ? " color-swatch-selected" : ""}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </form>
  )
}

export default HabitForm
