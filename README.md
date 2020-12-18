##### FF0000 Ad Tech

# Comment Hooks

Comment-hooks are a pattern that enables text documents to define specific start/end points, so that manager applications can read & write to those locations with confidence.

This library provides an interface for:

1. Parsing and stringifying hook addresses
2. Generating hook regex patterns.

With these tools, the manager application has all it needs to read & write to documents which have implemented comment hooks.

## Hook Address

`[scope].[type].[param]`

## Formatting

### Body Hooks

These hooks indicate a start-point and an end-point. All content between these two comments will be matched.

```javascript
/*-- [scope].[type].[param].[start/end] --*/
```

```html
<!-- [scope].[type].[param].[start/end] -->
```

## Insert Hooks

These hooks only indicate a single insertion point, and should be considered write-only.

```javascript
/*-- [scope].Insert.[param] --*/
```

```html
<!-- [scope].Insert.[param] -->
```
