import EventEmitter from 'events';

export default class Sizes extends EventEmitter
{
	constructor()
	{
		super();

		window.addEventListener('resize', this.resize.bind(this));
		
		this.resize();
	}

	resize()
	{
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.emit('resize');
	}
}