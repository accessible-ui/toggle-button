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

[Check out the example on CodeSandbox](https://codesandbox.io/s/accessibletoggle-button-example-s1cuy)

```jsx harmony
import {ToggleButton} from '@accessible/toggle-button'

const Component = () => (
  <ToggleButton onChange={value => (value ? mute() : unmute())}>
    {({active}) => <span>{active ? 'Unmute' : 'Mute'}</span>}
  </ToggleButton>
)
```

## API

### `<ToggleButton>`

This component clones its child component and adds accessibility roles for pressed/unpressed
state buttons. It also creates context so its active state is accessible from its children.

#### Props

| Prop          | Type                                                                                              | Default     | Required? | Description                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------- | ----------- | --------- | -------------------------------------------------------------------------------------- |
| active        | `string`                                                                                          | `undefined` | No        | Creates a controlled component where the active value always matches this one.         |
| defaultActive | `string`                                                                                          | `false`     | No        | Sets the default active state of the button.                                           |
| activeClass   | `string`                                                                                          | `undefined` | No        | Adds this class name to its child component when the button is in a active state.      |
| inactiveClass | `string`                                                                                          | `undefined` | No        | Adds this class name to its child component when the button is in an inactive state.   |
| activeStyle   | `React.CSSProperties`                                                                             | `undefined` | No        | Adds this style object to its child component when the button is in a active state.    |
| inactiveStyle | `React.CSSProperties`                                                                             | `undefined` | No        | Adds this style object to its child component when the button is in an inactive state. |
| onChange      | `(active: boolean) => void`                                                                       | `undefined` | No        | This callback is called any time the active state changes.                             |
| children      | <code>React.ReactElement &#0124; (context: ToggleButtonContextValue) => React.ReactElement</code> | `undefined` | Yes       | This is the element you want to turn into a ToggleButton.                              |

### `useToggleButton()`

This hook provides access to the button's [context](#togglebuttoncontextvalue)

### `ToggleButtonContextValue`

```typescript jsx
interface ToggleButtonContextValue {
  toggle: () => void
  on: () => void
  off: () => void
  active: boolean
}
```

### `useControls()`

This hook returns the button's `toggle`, `on`, `off` functions that control its `active` state.

### `useIsActive()`

This hook returns the button's `active` state

###

## LICENSE

MIT
