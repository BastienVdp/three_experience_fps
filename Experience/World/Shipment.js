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
		this.bricks = this.shipment.getObjectByName('bricks');
		this.cars = this.shipment.getObjectByName('cars');
		this.cones = this.shipment.getObjectByName('cones');
		this.walls = this.shipment.getObjectByName('walls');
		this.plants = this.shipment.getObjectByName('plants');
		this.outside = this.shipment.getObjectByName('outside');
		this.floor = this.shipment.getObjectByName('floor');
		this.scene.add(this.shipment);
		// this.shipment.position.y = -5;
		const floorGeometry = new THREE.WireframeGeometry(this.floor.geometry);

		// Créez un matériau pour la géométrie en fil de fer
		const floorMaterial = new THREE.MeshBasicMaterial({
			color: 0x000000,	
		})
		
		// Créez une ligne en fil de fer à partir de la géométrie et du matériau
		const floorWireframe = new THREE.LineSegments(floorGeometry, floorMaterial);
		
		// Ajoutez la ligne en fil de fer à votre scène
		// this.shipment.scale.set(0.1, 0.1, 0.1);
		this.scene.add(floorWireframe);
		this.octree.fromGraphNode(this.floor);
	}
}