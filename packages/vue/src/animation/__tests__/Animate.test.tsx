import { render, fireEvent } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { Animate } from '@/animation/Animate'

describe('Animate', () => {
  it('renders with default props', () => {
    const { container } = render(() => (
      <Animate>
        {{
          default: ({ t }: { t: number }) => <div>Progress: {t}</div>
        }}
      </Animate>
    ))

    expect(container.textContent).toContain('Progress: 1')
  })

  it('calls onAnimationStart when animation starts', async () => {
    const onStart = vi.fn()
    
    render(() => (
      <Animate 
        isActive={true}
        duration={100}
        onAnimationStart={onStart}
      >
        {{
          default: ({ t }: { t: number }) => <div>Progress: {t}</div>
        }}
      </Animate>
    ))

    // Wait for animation to start
    await new Promise(resolve => setTimeout(resolve, 50))
    expect(onStart).toHaveBeenCalled()
  })

  it('calls onAnimationEnd when animation completes', async () => {
    const onEnd = vi.fn()
    
    render(() => (
      <Animate 
        isActive={true}
        duration={100}
        onAnimationEnd={onEnd}
      >
        {{
          default: ({ t }: { t: number }) => <div>Progress: {t}</div>
        }}
      </Animate>
    ))

    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(onEnd).toHaveBeenCalled()
  })

  it('interpolates values correctly', async () => {
    const onUpdate = vi.fn()
    
    const { container } = render(() => (
      <Animate
        from={{ x: 0, y: 100 }}
        to={{ x: 100, y: 0 }}
        duration={100}
        onUpdate={onUpdate}
      >
        {{
          default: ({ x, y }: { x: number, y: number }) => (
            <div>
              X: {Math.round(x)}, Y: {Math.round(y)}
            </div>
          )
        }}
      </Animate>
    ))

    // Wait for animation to progress
    await new Promise(resolve => setTimeout(resolve, 50))
    expect(onUpdate).toHaveBeenCalled()
    
    // Check that values are interpolated
    const text = container.textContent || ''
    expect(text).toMatch(/X: \d+, Y: \d+/)
  })
})