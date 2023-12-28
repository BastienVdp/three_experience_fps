import * as THREE from "three";

import Experience from "..";

export default class Environment
{
	constructor()
	{
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.debug = this.experience.world.debugFolder;

		
		if(this.debug) {
			this.debugFolder = this.debug.addFolder('Environment');
		}
		

		this.initialize();
	}

	initialize()
	{
		this.environmentMap = {};
        this.environmentMap.intensity = 0;
        this.environmentMap.texture = this.resources.get('environment');
        this.environmentMap.texture.outputColorSpace = THREE.SRGBColorSpace;

        this.scene.background = this.environmentMap.texture;

        const light = new THREE.AmbientLight(0x404040, 5); // soft white light
        this.scene.add(light);

        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);

        this.sunLight.position.set(1.5, 7, -3);
        this.scene.add(this.sunLight);

		// Debug
		if(this.debug) {
			this.debugFolder.add(light, 'intensity', 0, 10, 0.001).name('Intensity Ambient');
			this.debugFolder.add(this.sunLight.position, 'x', -10, 10, 0.001).name('Sun X');
			this.debugFolder.add(this.sunLight.position, 'y', -10, 10, 0.001).name('Sun Y');
			this.debugFolder.add(this.sunLight.position, 'z', -10, 10, 0.001).name('Sun Z');
			this.debugFolder.add(this.sunLight, 'intensity', 0, 10, 0.001).name('Intensity Sun');
		}

	}
}