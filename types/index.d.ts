import * as React from 'react'
export interface ToggleButtonContextValue {
  toggle: () => void
  on: () => void
  off: () => void
  active: boolean
}
export declare const ToggleButtonContext: React.Context<ToggleButtonContextValue>
export declare const useToggleButton: () => ToggleButtonContextValue
export declare const useControls: () => {
  on: () => void
  off: () => void
  toggle: () => void
}
export declare const useIsActive: () => boolean
export interface ToggleButtonProps {
  active?: boolean
  defaultActive?: boolean
  activeClass?: string
  inactiveClass?: string
  activeStyle?: React.CSSProperties
  inactiveStyle?: React.CSSProperties
  onChange?: (on: boolean) => void
  children:
    | React.ReactElement
    | JSX.Element
    | ((context: ToggleButtonContextValue) => React.ReactElement | JSX.Element)
}
export declare const ToggleButton: React.FC<ToggleButtonProps>
export default ToggleButton
