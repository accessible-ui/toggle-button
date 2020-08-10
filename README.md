<hr>
<div align="center">
  <h1 align="center">
    &lt;ToggleButton&gt;
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/toggle-button">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/toggle-button?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@accessible/toggle-button">
    <img alt="Types" src="https://img.shields.io/npm/types/@accessible/toggle-button?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/toggle-button">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/toggle-button?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/toggle-button">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/toggle-button?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/toggle-button">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/toggle-button?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/toggle-button?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/toggle-button</pre>
<hr>

An accessible two-state button that can be either off (not pressed) or on (pressed). Common use cases
are toolbar buttons like Bold, Italic, and Underline. In addition to following the
[accessibility guidelines here](https://www.w3.org/TR/wai-aria-practices/#button), this component
provides interop between real `<button>` elements and faux `<div>`, `<a>`, `<span>`, et. al. buttons.

## Quick Start

[Check out the example on **CodeSandbox**](https://codesandbox.io/s/accessibletoggle-button-example-s1cuy)

```jsx harmony
import * as React from 'react'
import {ToggleButton, useA11yToggleButton} from '@accessible/toggle-button'

const Component = () => {
  const [muted, setMuted] = React.useState(false)
  return (
    <ToggleButton active={muted} onChange={setMuted}>
      <span>{muted ? 'Unmute' : 'Mute'}</span>
    </ToggleButton>
  )
}

const ComponentWithHook = () => {
  const ref = React.useRef(null)
  const [muted, setMuted] = React.useState(false)
  const a11yProps = useA11yToggleButton(ref, {
    active: muted,
    onChange: setMuted,
  })

  return (
    <button ref={ref} {...a11yProps}>
      <span>{muted ? 'Unmute' : 'Mute'}</span>
    </button>
  )
}
```

## API

### useA11yToggleButton(target, options?)

A React hook for creating a headless a11y toggle button to the
[W3C accessibility standard](https://www.w3.org/TR/wai-aria-practices/#button). In addition
to providing accessibility props to your component, this hook will add events for interoperability
between actual `<button>` elements and fake ones e.g. `<a>` and `<div>` to the `target` element.

#### Arguments

| Argument | Type                                                        | Required? | Description                                                                                          |
| -------- | ----------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| target   | <code>React.RefObject&lt;T&gt; &#124; T &#124; null</code>  | Yes       | A React ref or HTML element                                                                          |  |
| options  | [`UseA11yToggleButtonOptions`](#usea11ytogglebuttonoptions) | Yes       | The component you want to turn into a button that handles focus and `space`, `enter` keydown events. |

#### UseA11yToggleButtonOptions

```ts
export interface UseA11yToggleButtonOptions<
  E extends React.MouseEvent<any, MouseEvent>
> {
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
  onClick?: (event: E) => any
}
```

#### Returns

```ts
interface ReturnValue {
  readonly 'aria-pressed': boolean
  readonly role: 'button'
  readonly tabIndex: 0
}
```

### &lt;ToggleButton&gt;

This component clones its child component and adds accessibility roles for pressed/unpressed
state buttons. It also creates context so its active state is accessible from its children.

#### Props

| Prop          | Type                        | Default | Required? | Description                                                                            |
| ------------- | --------------------------- | ------- | --------- | -------------------------------------------------------------------------------------- |
| active        | `string`                    |         | No        | Creates a controlled component where the active value always matches this one.         |
| defaultActive | `string`                    | `false` | No        | Sets the default active state of the button.                                           |
| activeClass   | `string`                    |         | No        | Adds this class name to its child component when the button is in a active state.      |
| inactiveClass | `string`                    |         | No        | Adds this class name to its child component when the button is in an inactive state.   |
| activeStyle   | `React.CSSProperties`       |         | No        | Adds this style object to its child component when the button is in a active state.    |
| inactiveStyle | `React.CSSProperties`       |         | No        | Adds this style object to its child component when the button is in an inactive state. |
| onChange      | `(active: boolean) => void` |         | No        | This callback is invoked any time the active state changes.                            |
| children      | `React.ReactElement`        |         | Yes       | This is the element you want to turn into a ToggleButton.                              |

## LICENSE

MIT
