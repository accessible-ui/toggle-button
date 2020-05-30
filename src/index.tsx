import * as React from 'react'
import useSwitch from '@react-hook/switch'
import Button from '@accessible/button'
import clsx from 'clsx'

export interface ToggleButtonContextValue {
  toggle: () => void
  on: () => void
  off: () => void
  active: boolean
}

export const ToggleButtonContext = React.createContext<
  ToggleButtonContextValue
>({
  toggle: () => {},
  on: () => {},
  off: () => {},
  active: false,
})

export const useToggleButton = () => React.useContext(ToggleButtonContext)
export const useControls = () => {
  const {on, off, toggle} = React.useContext(ToggleButtonContext)
  return {on, off, toggle}
}
export const useIsActive = () => React.useContext(ToggleButtonContext).active

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
  const [activeState, toggle] = useSwitch(defaultActive)
  const active = controlledActive === void 0 ? activeState : controlledActive
  const prevActive = React.useRef<boolean>(active)
  const storedOnChange = React.useRef(onChange)
  storedOnChange.current = onChange
  const context = React.useMemo(
    () => ({
      toggle,
      on: toggle.on,
      off: toggle.off,
      active,
    }),
    [active, toggle]
  )

  React.useEffect(() => {
    prevActive.current !== activeState && storedOnChange.current?.(activeState)
    prevActive.current = activeState
  }, [activeState])

  // Fucking TypeScript is actually really dumb sometimes. See below for a
  // prime example
  const realChildren = (typeof children === 'function'
    ? children(context)
    : children) as React.ReactElement
  const props = realChildren.props

  return (
    <ToggleButtonContext.Provider value={context}>
      <Button>
        {React.cloneElement(realChildren, {
          className:
            clsx(props.className, active ? activeClass : inactiveClass) ||
            void 0,
          style: Object.assign(
            {},
            props.style,
            active ? activeStyle : inactiveStyle
          ),
          'aria-pressed': '' + active,
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            toggle()
            props.onClick?.(event)
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
