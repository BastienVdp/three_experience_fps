import * as THREE from "three";
import Experience from "..";

export default class Objects
{
	constructor()
	{
		this.experience = new Experience();

		this.container = new THREE.Object3D();
		this.container.name = 'ObjectsContainer';
		this.container.matrixAutoUpdate = true;

		this.count = 0;
		this.entities = [];
	}

	get(name) 
	{
		return this.entities.find(item => item.name === name);
	}
	
	add(name, object)
	{
		if(!name) object.name = 'object_' + this.count;
		// console.log(object, 'object');
		object.name = name;
		object.id = this.count;
		object.parent = this;
		this.count++;
		this.entities.push(object);
		this.container.add(object.container);
	}

	initialize() {
		this.entities.forEach(object => {
			object.initialize();
		})
	}

	update(elapsedTime)
	{
		// console.log('update', this.entities);
		this.entities.forEach(object => {
			object.update(elapsedTime);
		})

		// todo physics update
	}
}
