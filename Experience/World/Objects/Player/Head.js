import * as THREE from 'three';

import Experience from "../../..";
import Component from "../../Component";

export default class Head extends Component 
{
	constructor({ container, debug })
	{
		super();

		this.experience = new Experience();
		this.debug = debug;

		this.name = 'Head';

		this.container = container;
		this.container.matrixAutoUpdate = true;

		// Debug 
		if(this.debug)
		{
			this.debugFolder = this.debug.addFolder('Head');
			this.debugFolder.open();
		}
	}

	initialize()
	{
		// this.container.add(this.mesh)
		this.setupHead();
	}

	setupHead()
	{
		this.geometry = new THREE.BoxGeometry(1, 1, 1);
		this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.container.add(this.mesh);
		this.mesh.position.y = this.container.position.y;

		if(this.debugFolder) {
			this.debugFolder.add(this.mesh, 'visible').name('visible');
		}
	}
}