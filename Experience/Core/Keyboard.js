export default class Keyboard
{
	constructor()
	{
		this.keys = {};
		this.events = {};

		this.addEventListeners();
	}

	get(code)
	{
		return this.keys[code] || false;
	}

	handleKeyUp(e)
	{
		this.keys[e.code] = false;
	}

	handleKeyDown(e)
	{
		console.log(e.code);
		this.keys[e.code] = true;
	}

	addEventListeners()
	{
		document.addEventListener('keyup', this.handleKeyUp.bind(this));
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	removeEventListeners()
	{
		document.removeEventListener('keyup', this.handleKeyUp.bind(this));
		document.removeEventListener('keydown', this.handleKeyDown.bind(this));
	}
}