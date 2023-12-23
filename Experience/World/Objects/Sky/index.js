import * as THREE from 'three';

import Experience from '../../..';
import Object from '../Object';

export default class Sky extends Object
{
	constructor({ debug })
	{
		super();

		this.experience = new Experience();
		this.name = 'Sky';
		this.debug = debug;

		// Mise en place
		this.container = new THREE.Object3D();
		this.container.name = 'SkyContainer';

		// debug
		if(this.debug) {
			this.debugFolder = this.debug.addFolder('Sky');
		}
	}

	initialize()
	{
		this.hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFFF, 1);
        this.hemiLight.color.setHSL(0.6, 1, 0.6);
        this.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
		this.container.add(this.hemiLight);

		if(this.debug) {
			this.debugFolder.add(this.hemiLight, 'intensity').step(0.01).min(0).max(1).name('intensity');
		}

		this.geometry = new THREE.SphereGeometry(100, 25, 25);
		this.material = new THREE.MeshBasicMaterial({
			map: this.experience.resources.get('skyTexture'),
			side: THREE.BackSide,
			depthWrite: false,
			toneMapped: false
		})
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.rotateY(THREE.MathUtils.degToRad(-60));
		this.container.add(this.mesh);
	}

	update(elapsedTime)
	{
		// console.log(elapsedTime)
	}
}