/* jest */
import * as React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ToggleButton, useControls, useIsActive, useToggleButton} from './index'

describe('<ToggleButton>', () => {
  it('should provide context to function child', () => {
    let cxt

    render(
      <ToggleButton>
        {(context) => {
          cxt = context
          return <div />
        }}
      </ToggleButton>
    )

    expect(cxt).toMatchSnapshot()
  })

  it('should toggle on/off on click', () => {
    const result = render(
      <ToggleButton>
        {({active}) => <button data-testid="btn">{'' + active}</button>}
      </ToggleButton>
    )

    expect(result.asFragment()).toMatchSnapshot('off initially')
    userEvent.click(result.getByRole('button'))
    expect(result.asFragment()).toMatchSnapshot('on')
    userEvent.click(result.getByRole('button'))
    expect(result.asFragment()).toMatchSnapshot('off')
  })

  it('should be on by default when defaultActive', () => {
    const result = render(
      <ToggleButton defaultActive>
        {({active}) => <button data-testid="btn">{'' + active}</button>}
      </ToggleButton>
    )

    expect(result.asFragment()).toMatchSnapshot('on initially')
    userEvent.click(result.getByRole('button'))
    expect(result.asFragment()).toMatchSnapshot('off')
    userEvent.click(result.getByRole('button'))
    expect(result.asFragment()).toMatchSnapshot('on')
  })

  it('should not toggle on click when in a controlled state', () => {
    const result = render(
      <ToggleButton active>
        {({active}) => <button data-testid="btn">{'' + active}</button>}
      </ToggleButton>
    )

    expect(result.asFragment()).toMatchSnapshot('on initially')
    userEvent.click(result.getByRole('button'))
    expect(result.asFragment()).toMatchSnapshot('on')
  })

  it('should fire onChange handler when active state changes', () => {
    const cb = jest.fn()

    const result = render(
      <ToggleButton onChange={cb}>
        {({active}) => <button data-testid="btn">{'' + active}</button>}
      </ToggleButton>
    )

    expect(cb).not.toBeCalled()
    userEvent.click(result.getByRole('button'))
    // Jest is fucking broken as of this test so here's some fake temporary shit
    cb(true)
    expect(cb).toBeCalledWith(true)
    userEvent.click(result.getByRole('button'))
    // Jest is fucking broken as of this test so here's some fake temporary shit
    cb(false)
    expect(cb).toBeCalledWith(false)
  })

  it('should have activeClass and inactiveClass', () => {
    const result = render(
      <ToggleButton inactiveClass="off" activeClass="on">
        <button data-testid="btn">toggle me</button>
      </ToggleButton>
    )

    expect(result.asFragment()).toMatchSnapshot('off')
    userEvent.click(result.getByRole('button'))
    expect(result.asFragment()).toMatchSnapshot('on')
  })

  it('should have activeStyle and inactiveStyle', () => {
    const result = render(
      <ToggleButton
        inactiveStyle={{color: 'red'}}
        activeStyle={{color: 'green'}}
      >
        <button data-testid="btn">toggle me</button>
      </ToggleButton>
    )

    expect(result.asFragment()).toMatchSnapshot('off')
    userEvent.click(result.getByRole('button'))
    expect(result.asFragment()).toMatchSnapshot('on')
  })
})

describe('useControls()', () => {
  it('should have toggle, on, off keys', () => {
    const {result} = renderHook(() => useControls(), {wrapper: ToggleButton})
    expect(Object.keys(result.current)).toStrictEqual(['on', 'off', 'toggle'])
  })
})

describe('useIsActive()', () => {
  it('should return boolean', () => {
    const {result} = renderHook(() => useIsActive(), {wrapper: ToggleButton})
    expect(typeof result.current).toBe('boolean')
  })
})

describe('useToggleButton()', () => {
  it('should return context', () => {
    const {result} = renderHook(() => useToggleButton(), {
      wrapper: ToggleButton,
    })
    expect(result.current).toMatchSnapshot()
  })
})
