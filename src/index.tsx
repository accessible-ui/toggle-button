import React, {
  createContext,
  cloneElement,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import useSwitch from '@react-hook/switch'
import Button, {ButtonProps} from '@accessible/button'
import clsx from 'clsx'

export interface ToggleButtonContextValue {
  toggle: () => void
  on: () => void
  off: () => void
  active: boolean
}

// @ts-ignore
export const ToggleButtonContext: React.Context<ToggleButtonContextValue> = createContext(
  {}
)
export const useToggleButton = () => useContext(ToggleButtonContext)
export const useControls = () => {
  const {on, off, toggle} = useContext(ToggleButtonContext)
  return {on, off, toggle}
}
export const useIsActive = () => useContext(ToggleButtonContext).active

export interface ToggleButtonProps extends ButtonProps {
  active?: boolean
  defaultActive?: boolean
  activeClass?: string
  inactiveClass?: string
  activeStyle?: React.CSSProperties
  inactiveStyle?: React.CSSProperties
  onChange?: (on: boolean) => void
  children: React.ReactElement | JSX.Element
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  active: controlledActive,
  defaultActive = false,
  activeClass,
  inactiveClass,
  activeStyle,
  inactiveStyle,
  onChange,
  children,
}) => {
  const [activeState, toggle] = useSwitch(defaultActive)
  const active = controlledActive === void 0 ? activeState : controlledActive
  const context = useMemo(
    () => ({
      toggle,
      on: toggle.on,
      off: toggle.off,
      active,
    }),
    [active]
  )

  useEffect(() => {
    onChange?.(active)
  }, [active])
  // @ts-ignore
  children = typeof children === 'function' ? children(context) : children
  const props = children.props

  return (
    <ToggleButtonContext.Provider value={context}>
      <Button>
        {cloneElement(children, {
          className:
            clsx(props.className, active ? activeClass : inactiveClass) ||
            void 0,
          style: Object.assign(
            {},
            props.style,
            active ? activeStyle : inactiveStyle
          ),
          'aria-pressed': '' + active,
          onClick: e => {
            toggle()
            children.props.onClick?.(e)
          },
        })}
      </Button>
    </ToggleButtonContext.Provider>
  )
}

export default ToggleButton
