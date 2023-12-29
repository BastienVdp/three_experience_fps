import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Experience from ".";

export default class Camera
{
	constructor()
	{
		this.experience = new Experience();
		this.debug = this.experience.debug;
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;

		this.settings = {
			fov: 80,
			aspect: this.sizes.width / this.sizes.height,
			near: 0.1,
			far: 10000,
		}

		if(this.debug) {
			this.debugFolder = this.debug.addFolder('Camera');
			this.debugFolder.open();
		}

		this.instance = null;
		this.controls = null;

		this.setPerspectiveCamera();
		this.setOrbitControls();
	}

	setPerspectiveCamera()
	{
		this.perspectiveCamera = new THREE.PerspectiveCamera(this.settings.fov, this.settings.aspect, this.settings.near, this.settings.far);
		this.perspectiveCamera.position.set(0, 20, -20);
		this.perspectiveCamera.name = 'DefaultCamera';
		
		this.scene.add(this.perspectiveCamera);
	}
	
	setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
		this.controls.enabled = false;
        this.controls.enableDamping = true;

		if(this.debug) {
			this.debugFolder.add(this.controls, 'enabled').name('OrbitControls');
		}
    }

    enableOrbitControls() {
        this.controls.enabled = true;
    }

    disableOrbitControls() {
        this.controls.enabled = false;
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.width / this.sizes.height;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update() {
        if (!this.controls) return;
        if (this.controls.enabled === true) {
            this.controls.update();
        }
    }
}