# Column Component

[Back to README](../README.md)

The Column component arranges children vertically in PixiCompose applications.

## Features

- Vertical layout with automatic spacing
- Horizontal alignment control (left, center, right)
- Padding support for container insets
- Works with pivot-centered elements (buttons)
- Compatible with all PixiCompose components

## Basic Usage

```javascript
import { Column } from 'pixicompose';

// Simple column with spacing
h(Column, { spacing: 10 },
    h(Text, { text: 'Item 1' }),
    h(Text, { text: 'Item 2' }),
    h(Text, { text: 'Item 3' })
)

// Column with alignment and padding
h(Column, { spacing: 10, align: 'center', padding: 20 },
    h(Button, { text: 'First', width: 80 }),
    h(Button, { text: 'Second', width: 120 })
)
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `number` | `10` | Gap between children in pixels |
| `padding` | `number` | `0` | Inner spacing around content |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Horizontal alignment of children |
| `x` | `number` | `0` | Horizontal position |
| `y` | `number` | `0` | Vertical position |

## Alignment

The `align` prop controls how children are positioned horizontally within the column.

### Left Alignment (Default)

Aligns all children to the left edge of the widest child.

```javascript
h(Column, { align: 'left' },
    h(Box, { width: 30 }),
    h(Box, { width: 60 }),
    h(Box, { width: 45 })
)
```

### Center Alignment

Aligns all children to the horizontal center.

```javascript
h(Column, { align: 'center' },
    h(Box, { width: 30 }),
    h(Box, { width: 60 }),
    h(Box, { width: 45 })
)
```

### Right Alignment

Aligns all children to the right edge of the widest child.

```javascript
h(Column, { align: 'right' },
    h(Box, { width: 30 }),
    h(Box, { width: 60 }),
    h(Box, { width: 45 })
)
```

## Spacing vs Padding

**Spacing** creates gaps between children:
```javascript
h(Column, { spacing: 20 },  // 20px between each child
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' })
)
```

**Padding** creates inner spacing around the content:
```javascript
h(Column, { padding: 15 },  // 15px inset on all sides
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' })
)
```

**Both together**:
```javascript
h(Column, { spacing: 10, padding: 20 },
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' })
)
```

## Examples

### Basic Column
```javascript
h(Column, { x: 50, y: 50, spacing: 15 },
    h(Text, { text: 'Item 1' }),
    h(Text, { text: 'Item 2' }),
    h(Text, { text: 'Item 3' })
)
```

### Aligned Buttons
```javascript
h(Column, { spacing: 10, align: 'center' },
    h(Button, { text: 'Start', width: 100, height: 40 }),
    h(Button, { text: 'Settings', width: 120, height: 40 }),
    h(Button, { text: 'Quit', width: 80, height: 40 })
)
```

### With Padding
```javascript
h(Column, { spacing: 10, padding: 20, align: 'center' },
    h(Image, { src: 'icon1.png' }),
    h(Image, { src: 'icon2.png' }),
    h(Image, { src: 'icon3.png' })
)
```

### Menu Layout
```javascript
h(Column, { x: 50, y: 50, spacing: 15, align: 'left' },
    h(Text, { text: 'Main Menu', variant: 'heading' }),
    h(Button, { text: 'New Game', width: 150 }),
    h(Button, { text: 'Load Game', width: 150 }),
    h(Button, { text: 'Options', width: 150 }),
    h(Button, { text: 'Exit', width: 150 })
)
```

### Nested Layouts
```javascript
h(Row, { x: 50, y: 50, spacing: 40 },
    h(Column, { spacing: 10, align: 'center' },
        h(Text, { text: 'Player 1' }),
        h(Text, { text: 'Score: 100' })
    ),
    h(Column, { spacing: 10, align: 'center' },
        h(Text, { text: 'Player 2' }),
        h(Text, { text: 'Score: 85' })
    )
)
```

## Implementation Details

### Alignment Algorithm

Column calculates the maximum width of all children, then positions each child based on the alignment:
- `left`: child.x = padding
- `center`: child.x = padding + (maxWidth / 2)
- `right`: child.x = padding + maxWidth - childWidth

### Pivot Handling

Column automatically handles pivot-centered elements (like buttons) by accounting for their pivot offset when positioning.

### Performance

Column pre-renders all children to calculate dimensions before positioning, ensuring accurate alignment even with dynamic content.

## Framework Comparison

### SwiftUI VStack
```swift
VStack(alignment: .center, spacing: 20) {
    Text("A")
    Text("B")
}
.padding(10)
```

### Jetpack Compose Column
```kotlin
Column(
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(20.dp),
    modifier = Modifier.padding(10.dp)
) {
    Text("A")
    Text("B")
}
```

### PixiCompose Column
```javascript
h(Column, { align: 'center', spacing: 20, padding: 10 },
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' })
)
```

## See Also

- [Row Component](ROW.md) - Horizontal layout component
- [Button Component](BUTTON.md) - Interactive buttons
- [Grid Component](../README.md#components) - Grid layout

[Back to README](../README.md)
