Primary call-to-action button; use `primary` (blue) for the main action on a screen, `secondary` (green) for confirmations, `outline`/`ghost` for lower emphasis, `danger` for destructive actions.

```jsx
<Button variant="primary" size="lg" block>Book Now</Button>
<Button variant="outline" leadingIcon={<Icon name="plus" />}>Add stop</Button>
```

Variants: `primary | secondary | outline | ghost | danger`. Sizes: `sm | md | lg`. Use `block` for full-width mobile CTAs. Pass `leadingIcon`/`trailingIcon` as Lucide SVG nodes.
