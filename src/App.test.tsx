import App from './App'
import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest' 

test('renders app', () => {
  render(<App />)
  const linkElement = screen.getByText(/Películas/i)
  expect(linkElement).toBeTruthy()
})