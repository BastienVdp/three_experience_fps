

class Input
{
    constructor()
	{
        this._keyMap = {};
        this.events = [];
    }

    _addEventListner(element, type, callback)
    {
        element.addEventListener(type, callback);
        this.events.push({element, type, callback});
    }

    addKeyDownListener(callback)
    {
        this._addEventListner(document, 'keydown', callback);
    }
    
    addMouseMoveListener(callback)
    {
        this._addEventListner(document, 'mousemove', callback);
    }

    addKeyUpListener(callback)
    {
        this._addEventListner(document, 'keyup', callback);
    }

    getKeyDown(code)
    {
        return this._keyMap[code] === undefined ? 0 : this._keyMap[code];
    }

    clearEventListeners()
    {
        this.events.forEach(e=>{
            e.element.removeEventListener(e.type, e.callback);
        });

        this.events = [];
        this.addKeyDownListener(this._onKeyDown);
        this.addKeyUpListener(this._onKeyUp);
    }
}

export default new Input();