//
// Term.js
// Lucas Klassmann, <lucasklassmann@gmail.com>
//

((window, document) => {
        
    /// Helpers
    on = (el, event, callback) => {
        el.addEventListener(event, callback);
    }

    removeClass = (el, classname) => {
        el.classList.remove(classname);
    }

    html = (el, content) => {
        el.innerHtml = content;
    }

    /// Dummy Interpreter

    class DummyInterpreter {
        constructor(buffer) {
            this.buffer = buffer;
        }

        run(command) {
            this.buffer.writeLine(command);
        }
    }

    /// Terminal Component
    var NoBufferableKeys = [ 8, 46, 40, 35, 13, 27, 36, 37, 34, 33, 39, 9, 38, 16];

    var keyCodes = {
        BACKSPACE: 8, 
        COMMA: 188, 
        DELETE: 46, 
        DOWN: 40, 
        END: 35, 
        ENTER: 13, 
        ESCAPE: 27, 
        HOME: 36, 
        LEFT: 37, 
        PAGE_DOWN: 34, 
        PAGE_UP: 33, 
        PERIOD: 190, 
        RIGHT: 39, 
        SPACE: 32, 
        TAB: 9, 
        UP: 38, 
        SHIFT: 16
    };

    class Terminal {

        constructor(el, options) {
            var defaults = {
                interpreterClass: DummyInterpreter
            };
            this.buffer = [];
            this.history = [];
            this.el = el;
            this.options = Object.assign(defaults, options)
            this.init();
        }

        init() {
            var self = this;
            this.interpreter = new this.options.interpreterClass(this);

            on(document, 'keypress', (e) => {
                if (!(e.keyCode in NoBufferableKeys)) {
                    self.buffer.push(e.key);                  
                }        
                self.updateScreenBuffer();
            });

            on(document, 'keydown', (e) => {
                if (e.keyCode === keyCodes.ENTER) 
                {
                    self.processCommand(self.getBufferRaw(), () => {
                        self.newLineTerminal();
                    })
                } 
                else if (e.keyCode === keyCodes.BACKSPACE) 
                {
                    self.buffer.pop();          
                }         
                self.updateScreenBuffer();
            });
        }

        processCommand(command, callback) {
            this.interpreter.run(command);
            callback();
        }

        getBufferRaw() {
            return this.buffer.join('');
        }

        getBuffer() {
            return this.getBufferRaw().split(' ');
        }

        hightlightCommand(command) {
            return '<span>_c_</span>'.replace(/_c_/, command);
        }

        getCommands() {
            var self = this;
            var commands = this.getBuffer();
            var hightlightedBuffer = [];
            
            for(var idx in commands) {
                var cmd = commands[idx];
                hightlightedBuffer.push(self.hightlightCommand(cmd));
            }
            return hightlightedBuffer;
        }

        updateScreenBuffer() {
            var line = this.getCommands().join(' ');
            this.getCurrentLine().innerHTML = line;
        }

        clearBuffer() {
            this.buffer = [];
        }

        exitCurrentLine() {
            var current = this.getCurrentLine();

            if (current !== null)
                removeClass(current, 'current');
        }

        newLineTerminal() {
            this.clearBuffer();
            this.exitCurrentLine();
            this.removeOldCursor();
            var newInputLine = this.createNewLine();    
            this.appendShell(newInputLine);
        }

        getCurrentLine() {
            return this.el.querySelector(".current");
        }

        getCursor() {
            return this.el.querySelector(".cursor");
        }

        getShell() {
            return this.el.querySelector(".shell");
        }

        appendShell(line) {
            this.getShell().appendChild(line);
        }

        removeOldCursor() {
            var cursor = this.getCursor();
            if (cursor !== null)
                cursor.remove();
        }

        appendLine(content) {
            var line = document.createElement("div");
            line.innerHTML = content;
            return line;
        }

        createNewLine() {
            var line = this.appendLine("<span class='prompt'>shell$</span> <span class='current'></span><span class='cursor'></span>");
            line.classList.add("lineinput");
            return line;
        }

        writeLine(s) {
            var line = this.appendLine(s);
            this.appendShell(line);
        }

        start() {
            this.newLineTerminal();
        }
    }

    window.Terminal = Terminal;

})(window, document);


 



