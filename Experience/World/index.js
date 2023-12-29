import * as THREE from 'three';

import Experience from "..";
import Shipment from './Shipment';
import Player from './Player';
import Environment from './Environment';
import { Octree } from "three/examples/jsm/math/Octree";

export default class World
{
	constructor()
	{
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.debug = this.experience.debug;

		this.octree = new Octree();


		// Debug
		if(this.debug) {
			this.debugFolder = this.debug.addFolder('World');
			this.debugFolder.open();
		}

		// World is ready
		this.resources.on('ready', () => {
			this.start();
		});
	}

	/*
	*	Démarrer le monde
	*/
	start()
	{
		this.shipment = new Shipment();
		this.environment = new Environment();
		this.player = new Player();
		this.scene.add(this.player.container);
		this.scene.add(new THREE.AxesHelper(5));
	}
	

	update()
	{
		if(this.player)	this.player.update();
	}
}