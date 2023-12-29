import * as THREE from 'three';
import CANNON from 'cannon';

import Experience from "..";

export default class Shipment
{
	constructor()
	{
		this.experience = new Experience();
		this.octree = this.experience.world.octree;
		this.physics = this.experience.world.physics;
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.debug = this.experience.world.debugFolder;


		this.container = new THREE.Object3D();
		this.container.name = 'ShipmentContainer';

		// Debug
		if(this.debug) {
			this.debugFolder = this.debug.addFolder('Shipment');
			this.debugFolder.open();
		}

		this.params = {
			position: new THREE.Vector3(0, 0, 0),
			rotation: new THREE.Vector3(0, 0, 0),
			scale: new THREE.Vector3(0.5, 0.5, 0.5),
		}

		this.initiliaze();
	}

	initiliaze()
	{
		this.shipment = this.resources.get('shipment').scene.children[0];
		// console.log(this.shipment);
		this.bricks = this.shipment.getObjectByName('bricks');
		this.cars = this.shipment.getObjectByName('cars');
		this.cones = this.shipment.getObjectByName('cones');
		this.walls = this.shipment.getObjectByName('walls');
		this.plants = this.shipment.getObjectByName('plants');
		this.outside = this.shipment.getObjectByName('outside');
		this.floor = this.shipment.getObjectByName('floor');
		this.blueContainers = this.shipment.getObjectByName('containers_blue');
		this.redContainers = this.shipment.getObjectByName('containers_red');
		this.container.add(this.shipment);
		// this.shipment.position.y = -5;
		
		// this.octree.fromGraphNode(this.blueContainers);
		this.octree.fromGraphNode(this.redContainers);

		this.octree.fromGraphNode(this.floor);
		this.octree.fromGraphNode(this.walls);

	}
}