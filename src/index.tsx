import React, {
  createContext,
  cloneElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import useSwitch from '@react-hook/switch'
import Button from '@accessible/button'
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
  const didMount = useRef<boolean>(false)
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
    didMount.current && onChange?.(active)
    didMount.current = true
  }, [active])

  // Fucking TypeScript is actually really dumb sometimes. See below for a
  // prime example
  // @ts-ignore
  const realChildren = (typeof children === 'function'
    ? children(context)
    : children) as React.ReactElement
  const props = realChildren.props

  return (
    <ToggleButtonContext.Provider value={context}>
      <Button>
        {cloneElement(realChildren, {
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
            props.onClick?.(e)
          },
        })}
      </Button>
    </ToggleButtonContext.Provider>
  )
}

export default ToggleButton

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  ToggleButton.displayName = 'AccessibleToggleButton'
}
