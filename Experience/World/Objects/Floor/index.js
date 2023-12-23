import * as THREE from "three";
import Experience from "../../..";
import Object from "../Object";
import Level from "./Level";

export default class Floor extends Object
{
	constructor({ sizes, debug })
	{
		super();

		this.experience = new Experience();
		this.name = 'Floor';
		this.debug = debug;
		this.sizes = sizes;

		// Mise en place
		this.container = new THREE.Object3D();
		this.container.name = 'FloorContainer';
		this.container.matrixAutoUpdate = true;

		// Debug
		if(this.debug) {
			this.debugFolder = this.debug.addFolder('Floor');
		}
	}

	initialize()
	{
		this.setup();
		super.initialize();
	}

	setup()
	{
		this.addComponent('level', new Level({
			container: this.container,
			debug: this.debugFolder,
			mesh: this.experience.resources.get('level').scene
		}));
	}	

	update(elapsedTime)
	{
		for (const key in this.components) {
			if (this.components.hasOwnProperty(key)) {
				this.components[key].update();
			}
		}
	}
}