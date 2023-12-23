import * as THREE from 'three';

export default class Object
{
	constructor()
	{
		this.name = null;
		this.components = [];
		this.parent = null;

		this.position = new THREE.Vector3();
		this.rotation = new THREE.Quaternion();

		this.events = {};
	}

	initialize()
	{
		for(let componentName in this.components)
		{
			this.components[componentName].initialize();
		}
	}

	getName()
	{
		return this.name;
	}

	setName(name)
	{
		this.name = name;
	}

	getPosition()
	{
		return this.position;
	}

	setPosition(position)
	{
		this.position = position;
	}

	getRotation()
	{
		return this.rotation;
	}

	setRotation(rotation)
	{
		this.rotation = rotation;
	}

	setParent(parent)
	{
		this.parent = parent;
	}

	getParent(name)
	{
		return this.parent.get(name)
	}

	addComponent(name, component) 
	{
		component.parent = this;
		this.components[name] = component;
		// console.log('addComponent', name, component);
	}

	getComponent(componentName) 
	{
		return this.components[componentName];
	}

	findObject(name)
	{
		this.parent.get(name);
	}

	registerEvent(name, handler)
	{
		if(!this.events.hasOwnProperty(name)) this.events[name] = [];
		this.events[name].push(handler);
	}

	broadcastEvent(callback)
	{
		if(!this.events.hasOwnProperty(callback.name)) return;
		this.events[callback.name].forEach(handler => handler(callback));
	}

	physicsUpdate(world, elapsedTime)
	{
		this.components.forEach(component => {
			component.physicsUpdate(world, elapsedTime);
		})
	}

	update(elapsedTime)
	{
		for (const key in this.components) {
			if (this.components.hasOwnProperty(key)) {
				this.components[key].update(elapsedTime);
			}
		}
	}
	
}