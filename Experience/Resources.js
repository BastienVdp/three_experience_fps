import EventEmitter from 'events';
import Loader from './Utils/Loader';

import { assets } from './Utils/assets';
export default class Resources extends EventEmitter
{
	constructor()
	{
		super();

		this.items = [];

		this.loader = new Loader();
		
		this.loader.load(assets);

		this.loader.on('onLoadEnd', ({ resource, data }) => {
			this.items[resource.name] = data;
			
			this.emit('progress', this.loader.loaded / this.loader.toLoad);
		})

		this.loader.on('onLoadComplete', () => this.emit('ready'))
	}

	get(name)
	{
		return this.items[name];
	}
}