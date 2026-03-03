import { useState } from "react"
import type { HabitFormPropsType } from "./types"
import { COLORS } from "../../utils/constant"

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
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-2 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit..."
          className="flex-1 rounded-md border border-border bg-base-light px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-color-primary focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md border border-bg-primary bg-color-primary px-3 py-2 text-sm font-medium text-info transition hover:bg-hover-primary"
        >
          Add
        </button>
      </div>
      <div className="flex gap-1.5">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`h-6 w-6 cursor-pointer rounded-sm border-2 p-0 transition ${color === c ? "border-text" : "border-transparent"}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </form>
  )
}

export default HabitForm
