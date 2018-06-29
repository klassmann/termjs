# Term.js
A basic Terminal idea in Javascript (Vanilla). This is a just an idea that I wrote from scratch, I tried to make a simple terminal in Javascript for an application that I made.


## Features
- [X] Basic shell
- [X] Custom command interpreter
- [X] Pure javascript and withour dependencies 
- [ ] Command highlighting
- [ ] Command history
- [ ] Suggestion and autocompletion
- [ ] Tab keys and arrow keys movement
- [ ] Output coloring (VT100 emulation or something like that)


## Usage
```html
    <link rel="stylesheet" href="term.css">
    <script src="term.js"></script>
```


## Example

```javascript
    window.addEventListener('load', () => {
        var terminal = new Terminal(document.querySelector(".terminal"));
        terminal.writeLine("***************************************");
        terminal.writeLine("* Welcome to Term.js                 *");
        terminal.writeLine("***************************************");
        terminal.start();
    });
```

## License
MIT