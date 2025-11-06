# Image Component

[Back to README](../README.md)

The Image component renders images and sprites in PixiCompose applications.

## Features

- Load images from URLs or pre-loaded textures
- Declarative scale modes (fit, fill, stretch) inspired by SwiftUI/Compose
- Image tinting for color variations
- Rotation and positioning
- Alpha transparency and visibility control
- Interactive images with click handlers
- Flexible anchor points for transforms
- Support for children (overlay content)
- Blend modes and visual effects

## Basic Usage

```javascript
import { Image } from 'pixicompose';

// Simple image from URL
h(Image, { src: 'photo.png' })

// Image with size constraints
h(Image, {
    src: 'photo.png',
    width: 200,
    height: 150,
    scaleMode: 'fit'
})

// Tinted colored square using Texture.WHITE
h(Image, {
    texture: PIXI.Texture.WHITE,
    width: 100,
    height: 100,
    style: { tint: 0xFF0000 }
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Image URL or path |
| `texture` | `PIXI.Texture` | `undefined` | Pre-loaded PixiJS texture |
| `width` | `number` | `undefined` | Target width in pixels |
| `height` | `number` | `undefined` | Target height in pixels |
| `scale` | `number \| { x, y }` | `undefined` | Scale factor |
| `scaleMode` | `'fit' \| 'fill' \| 'stretch' \| 'none'` | `undefined` | Declarative scaling behavior |
| `anchor` | `number \| { x, y }` | `0.5` | Anchor point (0-1 range) |
| `x` | `number` | `0` | Horizontal position |
| `y` | `number` | `0` | Vertical position |
| `rotation` | `number` | `0` | Rotation in radians |
| `style` | `ImageStyle` | `{}` | Advanced styling options |
| `eventMode` | `'static' \| 'dynamic' \| 'none'` | `'none'` | Interaction mode |
| `cursor` | `string` | `undefined` | CSS cursor on hover |
| `onClick` | `() => void` | `undefined` | Click event handler |

## Image Source

### URL String (src)

Load images from URLs or file paths:

```javascript
h(Image, { src: 'https://example.com/photo.png' })
h(Image, { src: './assets/sprite.png' })
h(Image, { src: 'https://pixijs.com/assets/bunny.png' })
```

### Pre-loaded Texture (texture)

Use pre-loaded PixiJS textures for better performance:

```javascript
// Use built-in white texture
h(Image, { texture: PIXI.Texture.WHITE })

// Pre-load and cache textures
const texture = await PIXI.Assets.load('photo.png');
h(Image, { texture })
```

**When to use each:**
- `src`: Convenient for prototyping, simple apps, or infrequently used images
- `texture`: Better performance for frequently used images, game assets, or texture atlases

## Scale Modes

Inspired by SwiftUI's ContentMode and Jetpack Compose's ContentScale, the `scaleMode` prop provides declarative image scaling.

### Fit

Scales the image to fit inside the specified bounds while maintaining aspect ratio. The entire image is visible.

**Default properties:**
- Maintains aspect ratio
- Image fits entirely within bounds
- May have empty space on sides

```javascript
h(Image, {
    src: 'photo.png',
    width: 300,
    height: 200,
    scaleMode: 'fit'
})
```

### Fill

Scales the image to fill the specified bounds while maintaining aspect ratio. The image may be cropped.

**Default properties:**
- Maintains aspect ratio
- Image fills entire bounds
- May crop edges

```javascript
h(Image, {
    src: 'photo.png',
    width: 300,
    height: 200,
    scaleMode: 'fill'
})
```

### Stretch

Scales the image to exact dimensions, potentially distorting the aspect ratio.

**Default properties:**
- Ignores aspect ratio
- Image fills exact dimensions
- May distort appearance

```javascript
h(Image, {
    src: 'photo.png',
    width: 300,
    height: 200,
    scaleMode: 'stretch'
})
```

### None

No automatic scaling applied. Uses manual scale, width, or height properties.

```javascript
h(Image, {
    src: 'photo.png',
    scaleMode: 'none'
})
```

## Anchor Points

The anchor determines the origin point for positioning, rotation, and scaling. Values range from 0 (top/left) to 1 (bottom/right).

**Default anchor:** `0.5` (center) - matches Button component pattern for consistent rotation and scaling behavior.

```javascript
// Center anchor (default) - good for rotation
h(Image, {
    src: 'icon.png',
    anchor: 0.5,
    rotation: Math.PI / 4
})

// Top-left anchor - good for absolute positioning
h(Image, {
    src: 'photo.png',
    anchor: 0
})

// Custom anchor per axis
h(Image, {
    src: 'sprite.png',
    anchor: { x: 0, y: 1 }
})
```

## Styling

The `style` prop accepts an `ImageStyle` object:

```typescript
interface ImageStyle {
    tint?: number;                // Color tint (0xFFFFFF = no tint)
    alpha?: number;               // Opacity (0-1)
    blendMode?: PIXI.BLEND_MODES; // Blend mode
    roundPixels?: boolean;        // Pixel-perfect rendering
    visible?: boolean;            // Visibility toggle
}
```

### Tinting

Apply color tinting to images:

```javascript
// Red tint
h(Image, {
    src: 'character.png',
    style: { tint: 0xFF0000 }
})

// Create color variations with Texture.WHITE
h(Row, { spacing: 10 },
    h(Image, { texture: PIXI.Texture.WHITE, width: 50, height: 50, style: { tint: 0xFF0000 } }),
    h(Image, { texture: PIXI.Texture.WHITE, width: 50, height: 50, style: { tint: 0x00FF00 } }),
    h(Image, { texture: PIXI.Texture.WHITE, width: 50, height: 50, style: { tint: 0x0000FF } })
)
```

### Transparency

Control opacity with alpha:

```javascript
h(Image, {
    src: 'overlay.png',
    style: { alpha: 0.5 }
})
```

### Blend Modes

Apply visual effects with blend modes:

```javascript
h(Image, {
    src: 'glow.png',
    style: { blendMode: PIXI.BLEND_MODES.ADD }
})
```

### Visibility

Toggle visibility without removing from scene:

```javascript
h(Image, {
    src: 'secret.png',
    style: { visible: false }
})
```

## Sizing

### Fixed Dimensions

Set explicit width and height:

```javascript
h(Image, {
    src: 'icon.png',
    width: 64,
    height: 64
})
```

### Scaling

Use scale factor (preserves aspect ratio):

```javascript
// Uniform scale
h(Image, {
    src: 'sprite.png',
    scale: 2
})

// Non-uniform scale
h(Image, {
    src: 'sprite.png',
    scale: { x: 2, y: 1.5 }
})
```

### Combining with Scale Mode

When using `scaleMode`, specify target dimensions:

```javascript
h(Image, {
    src: 'photo.png',
    width: 300,      // Target width
    height: 200,     // Target height
    scaleMode: 'fit' // How to scale
})
```

## Positioning and Rotation

Position images using `x` and `y` coordinates:

```javascript
h(Image, {
    src: 'marker.png',
    x: 100,
    y: 200
})
```

Rotate images using radians:

```javascript
h(Image, {
    src: 'arrow.png',
    rotation: Math.PI / 2  // 90 degrees
})
```

**Note:** With default center anchor (0.5), rotation occurs around the image center.

## Interaction

Make images interactive with click handlers:

```javascript
h(Image, {
    src: 'button.png',
    onClick: () => console.log('Clicked!'),
    cursor: 'pointer'
})
```

Control event handling mode:

```javascript
h(Image, {
    src: 'draggable.png',
    eventMode: 'dynamic',  // Enables pointer events
    cursor: 'grab'
})
```

## Children

Images can contain child display objects:

```javascript
h(Image, { src: 'card.png', width: 200, height: 300 },
    h(Text, { text: 'Card Title', x: 100, y: 50, anchor: 0.5 })
)
```

## Examples

### Basic Image

```javascript
h(Image, { src: 'https://pixijs.com/assets/bunny.png' })
```

### Scaled Image

```javascript
h(Image, {
    src: 'https://pixijs.com/assets/bunny.png',
    width: 200,
    height: 150,
    scaleMode: 'fit'
})
```

### Tinted Square

```javascript
h(Image, {
    texture: PIXI.Texture.WHITE,
    width: 100,
    height: 100,
    style: { tint: 0xFF5722 }
})
```

### Rotated Image

```javascript
h(Image, {
    src: 'arrow.png',
    x: 400,
    y: 300,
    rotation: Math.PI / 4,
    anchor: 0.5
})
```

### Interactive Image

```javascript
h(Image, {
    src: 'button-background.png',
    onClick: () => handleClick(),
    cursor: 'pointer'
})
```

### Image Grid with Tinting

```javascript
h(Grid, { x: 50, y: 50, columns: 3, spacing: 10 },
    h(Image, { texture: PIXI.Texture.WHITE, width: 80, height: 80, style: { tint: 0xFF0000 } }),
    h(Image, { texture: PIXI.Texture.WHITE, width: 80, height: 80, style: { tint: 0x00FF00 } }),
    h(Image, { texture: PIXI.Texture.WHITE, width: 80, height: 80, style: { tint: 0x0000FF } }),
    h(Image, { texture: PIXI.Texture.WHITE, width: 80, height: 80, style: { tint: 0xFFFF00 } }),
    h(Image, { texture: PIXI.Texture.WHITE, width: 80, height: 80, style: { tint: 0xFF00FF } }),
    h(Image, { texture: PIXI.Texture.WHITE, width: 80, height: 80, style: { tint: 0x00FFFF } })
)
```

### Avatar with Overlay Text

```javascript
h(Image, { src: 'avatar.png', width: 100, height: 100 },
    h(Text, {
        text: 'Level 5',
        x: 50,
        y: 85,
        variant: 'caption',
        style: { fill: 0xFFFFFF, stroke: 0x000000, strokeThickness: 2 }
    })
)
```

## Implementation Details

### Anchor System

The default anchor of `0.5` (center) ensures:
- Consistent rotation behavior with Button component
- Intuitive scaling from the center
- Compatible with layout systems (Column, Row, Grid)

When using anchor `0` (top-left):
- Better for absolute positioning
- Matches traditional UI positioning
- Easier coordinate calculations

### Texture Loading

Images loaded via `src` are automatically loaded by PixiJS. For better performance:

```javascript
// Pre-load textures
await PIXI.Assets.load(['photo1.png', 'photo2.png', 'sprite.png']);

// Then use with texture prop
h(Image, { src: 'photo1.png' })
```

### Scale Mode Algorithm

- **fit**: `scale = min(targetWidth / imageWidth, targetHeight / imageHeight)`
- **fill**: `scale = max(targetWidth / imageWidth, targetHeight / imageHeight)`
- **stretch**: Sets width and height directly, ignoring aspect ratio

### Performance Tips

1. **Pre-load textures** for frequently used images
2. **Use Texture.WHITE** with tinting instead of multiple colored images
3. **Enable roundPixels** for crisp rendering at pixel-perfect positions
4. **Use texture atlases** for games with many sprites
5. **Set appropriate eventMode** - 'none' for non-interactive images

## Framework Comparison

### SwiftUI

```swift
// SwiftUI
Image("photo")
    .resizable()
    .scaledToFit()
    .frame(width: 300, height: 200)

// PixiCompose
h(Image, {
    src: 'photo.png',
    width: 300,
    height: 200,
    scaleMode: 'fit'
})
```

### Jetpack Compose

```kotlin
// Compose
Image(
    painter = painterResource(R.drawable.photo),
    contentScale = ContentScale.Fit,
    modifier = Modifier.size(300.dp, 200.dp)
)

// PixiCompose
h(Image, {
    src: 'photo.png',
    width: 300,
    height: 200,
    scaleMode: 'fit'
})
```

## Migration from Sprite

The Sprite component has been renamed to Image for better alignment with declarative UI frameworks (SwiftUI, Jetpack Compose).

```javascript
// Old (no longer supported)
import { Sprite } from 'pixicompose';
h(Sprite, { src: 'image.png' })

// New
import { Image } from 'pixicompose';
h(Image, { src: 'image.png' })
```

**Breaking change:** The 'Sprite' case has been removed from the reconciler. Update all Sprite references to Image.

## See Also

- [Button Component](BUTTON.md) - Interactive buttons with similar anchor system
- [Text Component](TEXT.md) - Text rendering with styling options
- [Contributing Guide](CONTRIBUTING.md) - How to contribute to PixiCompose
- [Testing Guide](TESTING.md) - Testing patterns and practices

[Back to README](../README.md)
