##### RED Interactive Agency - Ad Technology

RED Hooks Regex
===============

"Red Hooks" are a comment-syntax that is used by AdApp in conjunction with stub.json files to do the following
1. Inject code into specific locations throughout the build files. Existing components that need to do this include:
  - Build Source: "Red.Component"
  - Build Edge: "Red.Edge"
  - Deploy - "Red.Network"
2) Stub files maintain a map of what components are required, or have been injected into a particular build.
	  
Respective of whether they are JS or HTML, the hooks look like:
```javascript
/*-- [scope].[component].[param].[start/end] --*/
```
```html
<!-- [scope].[component].[param].[start/end] -->
```


