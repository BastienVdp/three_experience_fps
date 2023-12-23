import * as THREE from 'three';

import Experience from "../../..";
import Component from "../../Component";

export default class Body extends Component 
{
	constructor({ container, debug })
	{
		super();

		this.experience = new Experience();
		this.debug = debug;

		this.name = 'Body';

		this.container = container;
		this.container.matrixAutoUpdate = true;

		// Debug 
		if(this.debug)
		{
			this.debugFolder = this.debug.addFolder('Body');
			this.debugFolder.open();
		}
	}

	initialize()
	{
		// this.container.add(this.mesh)
		this.setupBody();
	}

	setupBody()
	{
		this.geometry = new THREE.BoxGeometry(1, 2, 1);
		this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.container.add(this.mesh);

		if(this.debugFolder) {
			this.debugFolder.add(this.mesh, 'visible').name('visible');
		}
	}
}