import * as React from 'react'
/**
 * A React hook for creating a headless a11y toggle button to the
 * W3C accessibility standard.
 *
 * @param target A React ref or HTML element
 * @param options Configuration options
 */
export declare function useA11yToggleButton<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  {
    active: controlledActive,
    defaultActive,
    onClick,
    onChange,
  }?: UseA11yToggleButtonOptions
): {
  readonly 'aria-pressed': boolean
} & {
  readonly role: 'button'
  readonly tabIndex: 0
}
/**
 * A component that turns its child element into a a11y toggle button
 * to the W3C accessiblity standard.
 */
export declare function ToggleButton({
  active,
  defaultActive,
  activeClass,
  inactiveClass,
  activeStyle,
  inactiveStyle,
  onChange,
  children,
}: ToggleButtonProps): React.ReactElement<
  any,
  | string
  | ((
      props: any
    ) => React.ReactElement<
      any,
      string | any | (new (props: any) => React.Component<any, any, any>)
    > | null)
  | (new (props: any) => React.Component<any, any, any>)
>
export declare namespace ToggleButton {
  var displayName: string
}
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
