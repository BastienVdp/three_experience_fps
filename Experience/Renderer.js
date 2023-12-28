import * as THREE from 'three';

import Experience from ".";

export default class Renderer
{
	constructor()
	{
		this.experience = new Experience();
		this.debug = this.experience.debug;
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;
		this.canvas = this.experience.canvas;

		if(this.debug) {
			this.debugFolder = this.debug.addFolder('Renderer');
			this.debugFolder.open();
		}

		this.initiliaze();
	}

	initiliaze()
	{
		this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            logarithmicDepthBuffer: true, // Get rid of z-fighting
        });
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		if(this.debugFolder) {
			this.debugFolder.add(this.renderer, 'toneMappingExposure', 0, 10, 0.001).name('Exposure');
		}
	}

	resize()
	{
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	update()
	{
		this.renderer.render(this.scene, this.camera.perspectiveCamera);
	}
}