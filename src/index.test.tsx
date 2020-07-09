/* jest */
import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ToggleButton} from './index'

describe('<ToggleButton>', () => {
  it('should toggle on/off on click', () => {
    render(
      <ToggleButton>
        <button />
      </ToggleButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('should be on by default when defaultActive', () => {
    render(
      <ToggleButton defaultActive>
        <button />
      </ToggleButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    userEvent.click(screen.getByRole('button'))
  })

  it('should toggle in a controlled state', () => {
    let active = false
    const setActive = (value) => (active = value)

    const result = render(
      <ToggleButton active={active} onChange={setActive}>
        <button />
      </ToggleButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    userEvent.click(screen.getByRole('button'))
    result.rerender(
      <ToggleButton active={active} onChange={setActive}>
        <button />
      </ToggleButton>
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('should have activeClass and inactiveClass', () => {
    render(
      <ToggleButton inactiveClass='off' activeClass='on'>
        <button />
      </ToggleButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute('class', 'off')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('class', 'on')
  })

  it('should have activeStyle and inactiveStyle', () => {
    render(
      <ToggleButton
        inactiveStyle={{color: 'red'}}
        activeStyle={{color: 'green'}}
      >
        <button>toggle me</button>
      </ToggleButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute('style', 'color: red;')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('style', 'color: green;')
  })

  it('should assign activeStyle and inactiveStyle to prop styles', () => {
    render(
      <ToggleButton
        inactiveStyle={{color: 'red'}}
        activeStyle={{color: 'green'}}
      >
        <button style={{borderColor: 'green'}}>toggle me</button>
      </ToggleButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute(
      'style',
      'border-color: green; color: red;'
    )
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute(
      'style',
      'border-color: green; color: green;'
    )
  })

  it('should override role', () => {
    render(
      <ToggleButton>
        <button role='link'>toggle me</button>
      </ToggleButton>
    )

    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('should override tabIndex', () => {
    render(
      <ToggleButton>
        <button tabIndex={-1}>toggle me</button>
      </ToggleButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1')
  })
})
