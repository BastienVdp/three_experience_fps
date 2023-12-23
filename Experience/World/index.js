import * as THREE from 'three';

import Objects from './Objects';
import Controls from './Controls';

import Floor from './Objects/Floor';
import Experience from '..';
import Sky from './Objects/Sky';

export default class World
{
	constructor()
	{
		// Récupération de l'expérience
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;
		this.renderer = this.experience.renderer;
		this.resources = this.experience.resources;
		this.sizes = this.experience.sizes;
		this.debug = this.experience.debug;

		// Mise en place
		this.container = new THREE.Object3D();
		this.container.name = 'WorldContainer';

		if(this.debug) {
			this.debugFolder = this.debug.addFolder('World');
		}

		this.start();
	}

	/*
	*	Démarrer le monde
	*/
	start()
	{
		this.setControls();
		this.setObjects();		
	}

	/*
	*	Mise en place des contrôles
	*/
	setControls()
	{
		this.controls = new Controls();
	}

	/*
	*	Mise en place des objets
	*/
	setObjects()
	{
		this.objects = new Objects({
			debug: this.debugFolder
		});
		
		this.objects.add("floor", new Floor({
			sizes: {
				width: 20,
				height: 20
			},
			debug: this.debugFolder
		}));

		this.objects.add("sky", new Sky({
			debug: this.debugFolder
		}));
		
		this.objects.initialize();

		this.container.add(this.objects.container);
	}	
	
	update(elapsedTime)
	{
		if(this.objects) {
			this.objects.update(elapsedTime);
		}
	}
}