import * as THREE from 'three';

import Experience from '..';
import Objects from './Objects';
import Floor from './Objects/Floor';
import Sky from './Objects/Sky';
import Player from './Objects/Player';
import Keyboard from '../Core/Keyboard';

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
			this.debugFolder.open();
		}

		this.start();
	}

	/*
	*	Démarrer le monde
	*/
	start()
	{
		this.setKeyboard();
		this.setObjects();		
	}

	setKeyboard()
	{
		this.keyboard = new Keyboard();
	}

	/*
	*	Mise en place des objets
	*/
	setObjects()
	{
		this.objects = new Objects();
		
		this.objects.add("floor", new Floor({
			debug: this.debugFolder
		})); 

		this.objects.add("sky", new Sky({
			debug: this.debugFolder
		}));

		this.objects.add("player", new Player({
			keyboard: this.keyboard,
			debug: this.debugFolder,
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