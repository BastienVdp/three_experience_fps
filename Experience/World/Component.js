export default class Component 
{
	constructor()
	{
		this.parent = null;
	}

	getParent(name)
	{
		return this.parent
	}

	setParent(parent) 
	{
		this.parent = parent;
	}

	get(name)
	{
		return this.parent.getComponent(name);
	}

	findObject(name)
	{
		return this.parent.findObject(name);
	}

	broadcast(callback) 
	{
		this.parent.broadcast(callback);
	}

	update(elapsedTime) 
	{
		// console.log('update', this.name);
	}

	physicsUpdate(world, elapsedTime) 
	{
		// console.log('physicsUpdate', this.name);
	}
}