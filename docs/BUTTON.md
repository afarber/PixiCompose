# Button Component

[Back to README](../README.md)

The Button component provides interactive buttons with multiple visual variants, state management, and full customization support.

## Features

-   Multiple variants (Filled, Tonal)
-   Interactive states (Normal, Hovered, Pressed, Disabled)
-   Customizable colors for each state
-   Configurable dimensions
-   Center pivot for rotation and scaling
-   Proper hit area for reliable interaction

## Basic Usage

```javascript
import { Button } from 'pixicompose/components/Button';

h(Button, {
    text: 'Click Me',
    onClick: () => console.log('Button clicked!'),
});
```

## Props

| Prop       | Type                  | Default      | Description                |
| ---------- | --------------------- | ------------ | -------------------------- |
| `text`     | `string`              | `'Button'`   | Button label text          |
| `onClick`  | `() => void`          | `undefined`  | Click handler function     |
| `variant`  | `'filled' \| 'tonal'` | `'filled'`   | Button style variant       |
| `disabled` | `boolean`             | `false`      | Whether button is disabled |
| `colors`   | `StateColors`         | See variants | State-specific colors      |
| `width`    | `number`              | `120`        | Button width in pixels     |
| `height`   | `number`              | `40`         | Button height in pixels    |
| `x`        | `number`              | `0`          | X position                 |
| `y`        | `number`              | `0`          | Y position                 |
| `rotation` | `number`              | `0`          | Rotation in radians        |

## Variants

### Filled (Default)

Bold solid background for high-emphasis actions.

**Default colors:**

-   Normal: bg=#007AFF (blue), text=#FFFFFF (white)
-   Hovered: bg=#0062CC (darker blue), text=#FFFFFF
-   Pressed: bg=#004999 (even darker), text=#FFFFFF
-   Disabled: bg=#CCCCCC (gray), text=#999999

```javascript
h(Button, {
    text: 'Primary Action',
    variant: 'filled',
    onClick: () => console.log('Filled button'),
});
```

### Tonal

Lighter tinted background for medium-emphasis actions. Inspired by Material Design 3's FilledTonalButton.

**Default colors:**

-   Normal: bg=#E5F1FF (light blue), text=#007AFF (blue)
-   Hovered: bg=#CCE4FF (slightly darker), text=#0062CC
-   Pressed: bg=#B3D7FF (even darker), text=#004999
-   Disabled: bg=#F5F5F5 (light gray), text=#CCCCCC

```javascript
h(Button, {
    text: 'Secondary Action',
    variant: 'tonal',
    onClick: () => console.log('Tonal button'),
});
```

## States

Buttons automatically respond to user interaction:

### Normal

Default interactive state when not being interacted with.

### Hovered

Visual feedback when mouse cursor is over the button. Changes to hovered color scheme.

### Pressed

Visual feedback when mouse button is down. Applies pressed colors and 0.95x scale effect.

### Disabled

Non-interactive state. Removes all event handlers and applies disabled color scheme.

```javascript
h(Button, {
    text: 'Disabled Button',
    disabled: true,
});
```

## Custom Colors

Override default colors for any or all states using the `colors` prop:

```javascript
h(Button, {
    text: 'Custom Colors',
    colors: {
        normal: { bg: 0xff5722, text: 0xffffff },
        hovered: { bg: 0xe64a19, text: 0xffffff },
        pressed: { bg: 0xd84315, text: 0xffffff },
        disabled: { bg: 0xcccccc, text: 0x999999 },
    },
    onClick: () => console.log('Custom button clicked!'),
});
```

### ColorConfig

Each state accepts a `ColorConfig` object:

```typescript
interface ColorConfig {
    bg: number; // Background color (hex number)
    text: number; // Text color (hex number)
}
```

### StateColors

The complete colors configuration:

```typescript
interface StateColors {
    normal?: ColorConfig;
    hovered?: ColorConfig;
    pressed?: ColorConfig;
    disabled?: ColorConfig;
}
```

## Custom Dimensions

Adjust button size with `width` and `height` props:

```javascript
h(Button, {
    text: 'Small',
    width: 80,
    height: 32,
});

h(Button, {
    text: 'Large',
    width: 200,
    height: 60,
});
```

## Rotation

Buttons can be rotated using the `rotation` prop (in radians). The button rotates around its center point:

```javascript
h(Button, {
    text: 'Rotated',
    rotation: Math.PI / 4, // 45 degrees
    onClick: () => console.log('Rotated button clicked!'),
});
```

## Examples

### Basic Button

```javascript
h(Button, {
    text: 'Click Me',
    onClick: () => alert('Hello!'),
});
```

### Tonal Variant

```javascript
h(Button, {
    text: 'Tonal Button',
    variant: 'tonal',
    onClick: () => console.log('Tonal clicked'),
});
```

### Disabled Button

```javascript
h(Button, {
    text: 'Disabled',
    disabled: true,
});
```

### Custom Styled Button

```javascript
h(Button, {
    text: 'Custom',
    variant: 'tonal',
    colors: {
        normal: { bg: 0xe1f5e1, text: 0x4caf50 },
        hovered: { bg: 0xc8e6c9, text: 0x388e3c },
        pressed: { bg: 0xa5d6a7, text: 0x2e7d32 },
    },
    width: 140,
    height: 50,
    onClick: () => console.log('Custom clicked!'),
});
```

### Positioned and Rotated

```javascript
h(Button, {
    text: 'Rotated',
    x: 300,
    y: 200,
    rotation: Math.PI / 6, // 30 degrees
    onClick: () => console.log('Rotated!'),
});
```

## Implementation Details

### Pivot Point

Buttons use a center pivot point (`width/2`, `height/2`). This means:

-   Position represents the button's center, not top-left
-   Rotation happens around the center
-   Scale effects apply from the center
-   Layouts (Column, Row, Grid) automatically compensate for the pivot

### Hit Area

Each button has an explicit hit area defined as a Rectangle matching the button dimensions. This ensures reliable click detection regardless of pivot or rotation.

### Visual Feedback

When pressed, buttons apply:

-   Pressed state colors
-   0.95x scale effect for tactile feedback

### Event Handling

Buttons use the following PixiJS events:

-   `pointerover` - Triggers hovered state
-   `pointerout` - Returns to normal state
-   `pointerdown` - Triggers pressed state
-   `pointerup` - Returns to hovered state
-   `pointertap` - Fires the onClick callback

Disabled buttons have no event handlers attached.

## See Also

-   [Main README](../README.md) - Project overview and all components
-   [examples/button.html](../examples/button.html) - Live button examples

[Back to README](../README.md)
