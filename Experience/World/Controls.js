export default class Controls 
{
	constructor()
	{
		this.actions = {
			up: false,
			down: false,
			left: false,
			right: false,
			jump: false,
		}

		this.setKeyboard();
	}

	setKeyboard()
	{
		this.keyboard = {
			events: {}
		}

		this.keyboard.events.keydown = (event) => this.handleKey(event.key, true);
		this.keyboard.events.keyup = (event) => this.handleKey(event.key, false);

		document.addEventListener('keydown', this.keyboard.events.keydown);
		document.addEventListener('keyup', this.keyboard.events.keyup);
	}

	handleKey(key, bool) {
		switch(event.key) {
			// Avant
			case 'z':
			case 'w':
				this.actions.up = bool;
				break;
			// Arrière
			case 's':
				this.actions.down = bool;
			break;
			case 'd':
				this.actions.right = bool;
				break;
			case 'a':
			case 'q':
				this.actions.left = bool;
			case ' ':
				this.actions.jump = bool;
			break;
		}
	}


}