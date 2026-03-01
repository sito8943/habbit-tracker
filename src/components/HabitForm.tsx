import { useState } from "react"

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"]

type Props = {
  onAdd: (name: string, color: string) => void
}

const HabitForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState(COLORS[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name.trim(), color)
    setName("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit..."
          style={{ flex: 1, padding: "4px 8px" }}
        />
        <button type="submit">Add</button>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            style={{
              width: 24,
              height: 24,
              background: c,
              border: color === c ? "3px solid #000" : "2px solid transparent",
              cursor: "pointer",
              borderRadius: 4,
              padding: 0,
            }}
          />
        ))}
      </div>
    </form>
  )
}

export default HabitForm
