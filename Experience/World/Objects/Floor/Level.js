import * as THREE from 'three';

import Experience from "../../..";
import Component from "../../Component";

export default class Level extends Component 
{
	constructor({ container, debug })
	{
		super();

		this.experience = new Experience();
		this.debug = debug;

		this.name = 'Level';

		this.mesh = this.experience.resources.get('level').scene

		this.container = container;
		this.container.matrixAutoUpdate = true;

		// Debug 
		if(this.debug)
		{
			this.debugFolder = this.debug.addFolder('Mesh');
		}
	}

	initialize()
	{
		this.container.add(this.mesh)
	}
}