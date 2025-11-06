# Text Component

[Back to README](../README.md)

The Text component renders styled text labels in PixiCompose applications.

## Features

- Four built-in text variants (body, heading, title, caption)
- Comprehensive text styling options (font, color, alignment, spacing)
- Word wrapping for long text content
- Text stroke and outline effects
- Positioning and rotation support
- Style merging (variants + custom styles)

## Basic Usage

```javascript
import { Text } from 'pixicompose';

// Simple text
h(Text, { text: 'Hello World' })

// Text with variant
h(Text, { text: 'Page Title', variant: 'title' })

// Text with custom styling
h(Text, {
    text: 'Custom Styled',
    style: { fontSize: 20, fill: 0xFF5722 }
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | The text content to display |
| `variant` | `'body' \| 'heading' \| 'title' \| 'caption'` | `undefined` | Predefined text style preset |
| `style` | `TextStyle` | `{}` | Custom text styling options |
| `x` | `number` | `0` | Horizontal position |
| `y` | `number` | `0` | Vertical position |
| `rotation` | `number` | `0` | Rotation in radians |

## Variants

### Body Variant

The default text style for regular content.

**Default properties:**
- `fontSize: 16`
- `fill: 0xFFFFFF` (white)

```javascript
h(Text, { text: 'Body text', variant: 'body' })
```

### Heading Variant

Larger, bold text for section headings.

**Default properties:**
- `fontSize: 24`
- `fill: 0xFFFFFF` (white)
- `fontWeight: 'bold'`

```javascript
h(Text, { text: 'Section Heading', variant: 'heading' })
```

### Title Variant

Large, bold text for page titles.

**Default properties:**
- `fontSize: 32`
- `fill: 0xFFFFFF` (white)
- `fontWeight: 'bold'`

```javascript
h(Text, { text: 'Page Title', variant: 'title' })
```

### Caption Variant

Small, lighter text for captions and annotations.

**Default properties:**
- `fontSize: 12`
- `fill: 0xCCCCCC` (light gray)

```javascript
h(Text, { text: 'Image caption', variant: 'caption' })
```

## Custom Styling

The `style` prop accepts a `TextStyle` object with the following properties:

```typescript
interface TextStyle {
    fontSize?: number;
    fontFamily?: string;
    fill?: number | string;
    align?: 'left' | 'center' | 'right';
    fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder';
    fontStyle?: 'normal' | 'italic' | 'oblique';
    lineHeight?: number;
    letterSpacing?: number;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    stroke?: number | string;
    strokeThickness?: number;
}
```

### Font Styling

```javascript
h(Text, {
    text: 'Custom Font',
    style: {
        fontSize: 20,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})
```

### Color and Fill

```javascript
h(Text, {
    text: 'Colored Text',
    style: { fill: 0xFF5722 }
})
```

### Text Alignment

```javascript
h(Text, {
    text: 'Centered Text',
    style: { align: 'center' }
})
```

### Letter Spacing

```javascript
h(Text, {
    text: 'S P A C E D',
    style: { letterSpacing: 5 }
})
```

## Style Merging

When both `variant` and `style` are specified, custom style properties override variant defaults:

```javascript
h(Text, {
    text: 'Red Heading',
    variant: 'heading',
    style: { fill: 0xFF0000 }
})
```

In this example:
- `fontSize: 24` and `fontWeight: 'bold'` come from the heading variant
- `fill: 0xFF0000` (red) overrides the variant's white color

## Word Wrap

Enable word wrapping for long text content:

```javascript
h(Text, {
    text: 'This is a long text that will wrap when it exceeds the specified width.',
    style: {
        wordWrap: true,
        wordWrapWidth: 300
    }
})
```

## Text Stroke

Add outlines to text for better visibility:

```javascript
h(Text, {
    text: 'Outlined Text',
    style: {
        fill: 0xFFFFFF,
        stroke: 0x000000,
        strokeThickness: 4
    }
})
```

## Positioning

Position text using `x` and `y` coordinates:

```javascript
h(Text, {
    text: 'Positioned Text',
    x: 100,
    y: 200
})
```

## Rotation

Rotate text using radians:

```javascript
h(Text, {
    text: 'Rotated Text',
    x: 400,
    y: 300,
    rotation: Math.PI / 4
})
```

## Examples

### Basic Text

```javascript
h(Text, { text: 'Hello PixiCompose!' })
```

### Text with Variant

```javascript
h(Text, {
    text: 'Welcome',
    variant: 'title'
})
```

### Custom Styled Text

```javascript
h(Text, {
    text: 'Important Notice',
    style: {
        fontSize: 22,
        fill: 0xFF5722,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})
```

### Word Wrapped Text

```javascript
h(Text, {
    text: 'This is a long paragraph of text that needs to wrap across multiple lines to fit within the designated width constraint.',
    style: {
        fontSize: 16,
        wordWrap: true,
        wordWrapWidth: 400
    }
})
```

### Positioned and Rotated Text

```javascript
h(Text, {
    text: 'Diagonal Label',
    x: 500,
    y: 250,
    rotation: Math.PI / 6,
    style: {
        fontSize: 18,
        fill: 0x4CAF50
    }
})
```

### Text in a Layout

```javascript
h(Column, { x: 50, y: 50, spacing: 20 },
    h(Text, { text: 'Menu', variant: 'heading' }),
    h(Text, { text: 'Home', variant: 'body' }),
    h(Text, { text: 'Settings', variant: 'body' }),
    h(Text, { text: 'Help', variant: 'body' })
)
```

## Implementation Details

### Variant System

Variants provide sensible defaults for common text styles. When a variant is specified, the reconciler applies the variant's style properties first, then merges any custom style properties on top.

### Style Precedence

The final text style is computed as:
1. Start with variant defaults (if variant is specified)
2. Merge custom style properties (overriding variant defaults)
3. If no variant is specified, default to white fill color

### PixiJS Integration

Text components are rendered using PixiJS's `PIXI.Text` class. All TextStyle properties map directly to PixiJS TextStyle options.

### Positioning

Text positioning is handled by the reconciler's common props system. The `x`, `y`, and `rotation` props are applied after the text element is created, ensuring consistent behavior across all PixiCompose components.

## See Also

- [Button Component](BUTTON.md) - Interactive buttons with text labels
- [Contributing Guide](CONTRIBUTING.md) - How to contribute to PixiCompose
- [Testing Guide](TESTING.md) - Testing patterns and practices

[Back to README](../README.md)
