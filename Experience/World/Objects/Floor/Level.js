import * as THREE from 'three';

import Experience from "../../..";
import Component from "../../Component";

export default class Level extends Component 
{
	constructor({ container, debug, mesh })
	{
		super();

		this.experience = new Experience();
		this.debug = debug;

		this.name = 'Level';

		this.mesh = mesh;

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