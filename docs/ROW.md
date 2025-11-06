# Row Component

[Back to README](../README.md)

The Row component arranges children horizontally in PixiCompose applications.

## Features

- Horizontal layout with automatic spacing
- Vertical alignment control (top, center, bottom)
- Padding support for container insets
- Works with pivot-centered elements (buttons)
- Compatible with all PixiCompose components

## Basic Usage

```javascript
import { Row } from 'pixicompose';

// Simple row with spacing
h(Row, { spacing: 10 },
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' }),
    h(Text, { text: 'C' })
)

// Row with alignment and padding
h(Row, { spacing: 10, align: 'center', padding: 20 },
    h(Button, { text: 'Small', height: 30 }),
    h(Button, { text: 'Large', height: 60 })
)
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `number` | `10` | Gap between children in pixels |
| `padding` | `number` | `0` | Inner spacing around content |
| `align` | `'top' \| 'center' \| 'bottom'` | `'top'` | Vertical alignment of children |
| `x` | `number` | `0` | Horizontal position |
| `y` | `number` | `0` | Vertical position |

## Alignment

The `align` prop controls how children are positioned vertically within the row.

### Top Alignment (Default)

Aligns all children to the top edge of the tallest child.

```javascript
h(Row, { align: 'top' },
    h(Box, { height: 30 }),
    h(Box, { height: 60 }),
    h(Box, { height: 45 })
)
```

### Center Alignment

Aligns all children to the vertical center.

```javascript
h(Row, { align: 'center' },
    h(Box, { height: 30 }),
    h(Box, { height: 60 }),
    h(Box, { height: 45 })
)
```

### Bottom Alignment

Aligns all children to the bottom edge of the tallest child.

```javascript
h(Row, { align: 'bottom' },
    h(Box, { height: 30 }),
    h(Box, { height: 60 }),
    h(Box, { height: 45 })
)
```

## Spacing vs Padding

**Spacing** creates gaps between children:
```javascript
h(Row, { spacing: 20 },  // 20px between each child
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' })
)
```

**Padding** creates inner spacing around the content:
```javascript
h(Row, { padding: 15 },  // 15px inset on all sides
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' })
)
```

**Both together**:
```javascript
h(Row, { spacing: 10, padding: 20 },
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' })
)
```

## Examples

### Basic Row
```javascript
h(Row, { x: 50, y: 50, spacing: 15 },
    h(Text, { text: 'Item 1' }),
    h(Text, { text: 'Item 2' }),
    h(Text, { text: 'Item 3' })
)
```

### Aligned Buttons
```javascript
h(Row, { spacing: 10, align: 'center' },
    h(Button, { text: 'OK', width: 80, height: 40 }),
    h(Button, { text: 'Cancel', width: 100, height: 40 })
)
```

### With Padding
```javascript
h(Row, { spacing: 10, padding: 20, align: 'center' },
    h(Image, { src: 'icon1.png' }),
    h(Image, { src: 'icon2.png' }),
    h(Image, { src: 'icon3.png' })
)
```

### Nested Layouts
```javascript
h(Column, { x: 50, y: 50, spacing: 20 },
    h(Text, { text: 'Navigation', variant: 'heading' }),
    h(Row, { spacing: 15 },
        h(Button, { text: 'Home' }),
        h(Button, { text: 'About' }),
        h(Button, { text: 'Contact' })
    )
)
```

## Implementation Details

### Alignment Algorithm

Row calculates the maximum height of all children, then positions each child based on the alignment:
- `top`: child.y = padding
- `center`: child.y = padding + (maxHeight / 2)
- `bottom`: child.y = padding + maxHeight - childHeight

### Pivot Handling

Row automatically handles pivot-centered elements (like buttons) by accounting for their pivot offset when positioning.

### Performance

Row pre-renders all children to calculate dimensions before positioning, ensuring accurate alignment even with dynamic content.

## Framework Comparison

### SwiftUI HStack
```swift
HStack(alignment: .center, spacing: 20) {
    Text("A")
    Text("B")
}
.padding(10)
```

### Jetpack Compose Row
```kotlin
Row(
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.spacedBy(20.dp),
    modifier = Modifier.padding(10.dp)
) {
    Text("A")
    Text("B")
}
```

### PixiCompose Row
```javascript
h(Row, { align: 'center', spacing: 20, padding: 10 },
    h(Text, { text: 'A' }),
    h(Text, { text: 'B' })
)
```

## See Also

- [Column Component](COLUMN.md) - Vertical layout component
- [Button Component](BUTTON.md) - Interactive buttons
- [Grid Component](../README.md#components) - Grid layout

[Back to README](../README.md)
