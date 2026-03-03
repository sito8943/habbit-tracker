import { useState } from "react"
import type { HabitFormPropsType } from "./types"
import { COLORS } from "../../utils/constant"
import { Button } from "../Button"

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
          className="flex-1 rounded-md border border-border bg-base-light px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
        />
        <Button type="submit" variant="filled" color="primary" className="px-3 py-2">
          Add
        </Button>
      </div>
      <div className="flex gap-1.5">
        {COLORS.map((c) => (
          <Button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            aria-label={`Select color ${c}`}
            className={`h-6 w-6 rounded-sm border-2 p-0 ${color === c ? "border-text" : "border-transparent"}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </form>
  )
}

export default HabitForm
