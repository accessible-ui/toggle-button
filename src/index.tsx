import * as React from 'react'
import useSwitch from '@react-hook/switch'
import useMergedRef from '@react-hook/merged-ref'
import {useA11yButton} from '@accessible/button'
import clsx from 'clsx'

/**
 * A React hook for creating a headless a11y toggle button to the
 * W3C accessibility standard.
 *
 * @param target A React ref or HTML element
 * @param options Configuration options
 */
export function useA11yToggleButton<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  {
    active: controlledActive,
    defaultActive = false,
    onClick = noop,
    onChange = noop,
  }: UseA11yToggleButtonOptions = {}
) {
  const [active, toggle] = useSwitch(defaultActive, controlledActive, onChange)

  return Object.assign(
    {
      'aria-pressed': active,
    } as const,
    useA11yButton<T>(target, (event) => {
      toggle()
      onClick(event)
    })
  )
}

/**
 * A component that turns its child element into a a11y toggle button
 * to the W3C accessiblity standard.
 */
export function ToggleButton({
  active,
  defaultActive = false,
  activeClass,
  inactiveClass,
  activeStyle,
  inactiveStyle,
  onChange = noop,
  children,
}: ToggleButtonProps) {
  const ref = React.useRef(null)
  const props = children.props
  const a11yProps = useA11yToggleButton(ref, {
    onChange,
    onClick: props.onClick,
    active,
    defaultActive,
  })
  const pressed = a11yProps['aria-pressed']
  const buttonStyle = pressed ? activeStyle : inactiveStyle

  return React.cloneElement(children, {
    onClick: undefined,
    className:
      clsx(props.className, pressed ? activeClass : inactiveClass) || void 0,
    style: !props.style
      ? buttonStyle
      : Object.assign({}, props.style, buttonStyle),
    'aria-pressed': a11yProps['aria-pressed'],
    role: props.hasOwnProperty('role') ? props.role : a11yProps['role'],
    tabIndex: props.hasOwnProperty('tabIndex')
      ? props.tabIndex
      : a11yProps['tabIndex'],
    ref: useMergedRef(
      ref,
      // @ts-expect-error
      children.ref
    ),
  })
}

function noop() {}

export interface ToggleButtonProps {
  /**
   * Creates a controlled component where the active value always matches this one.
   */
  active?: boolean
  /**
   * Sets the default active state of the button.
   * @default false
   */
  defaultActive?: boolean
  /**
   * Adds this class name to its child component when the button is in a active state.
   */
  activeClass?: string
  /**
   * Adds this class name to its child component when the button is in an inactive state.
   */
  inactiveClass?: string
  /**
   * Adds this style object to its child component when the button is in a active state.
   */
  activeStyle?: React.CSSProperties
  /**
   * Adds this style object to its child component when the button is in an inactive state.
   */
  inactiveStyle?: React.CSSProperties
  /**
   * This callback is invoked any time the active state changes.
   */
  onChange?: (on: boolean) => void
  /**
   * This is the element you want to turn into a ToggleButton.
   */
  children: React.ReactElement | JSX.Element
}

export interface UseA11yToggleButtonOptions {
  /**
   * Creates a controlled hook where the active value always matches this one.
   */
  active?: boolean
  /**
   * Sets the default active state of the button for uncontrolled hooks.
   * @default false
   */
  defaultActive?: boolean
  /**
   * This callback is invoked any time the active state of the
   * toggle button changes
   */
  onChange?: (active: boolean) => void
  /**
   * Adds a click event to your button
   */
  onClick?: (event: MouseEvent) => any
}

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  ToggleButton.displayName = 'AccessibleToggleButton'
}
