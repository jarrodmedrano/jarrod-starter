import { useTheme } from 'next-themes'

// Do NOT use this! It will throw a hydration mismatch error.
export const Switcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}
