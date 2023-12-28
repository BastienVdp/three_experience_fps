import * as THREE from 'three';
import * as dat from 'dat.gui';

import Resources from './Resources';

import Time from './Utils/Time';
import Sizes from './Utils/Sizes';

import World from './World';
import Camera from './Camera';
import Renderer from './Renderer';

export default class Experience
{
	static instance;

	constructor(options)
	{
		if(Experience.instance) {
			return Experience.instance;
		}
		Experience.instance = this;

		if(window.location.hash === '#debug') {
			this.debug = new dat.GUI({ width: 420 });
		}

		this.canvas = options.canvas;

		this.init();

		this.update();
	}


	init()
	{		
		this.setSizes();
		this.setTime();
		this.setResouces();

		this.setScene();
		this.setCamera();
		this.setRenderer();	
		this.setWorld();
	}

	/*
	*	Setup resources
	*/
	setResouces()
	{
		this.resources = new Resources();

		this.resources.on('progress', (progress) => {
			console.log('Progression:', progress);
		});
	}

	setSizes()
	{
		this.sizes = new Sizes();

		this.sizes.on("resize", () => {	
			this.resize();
		});
	}

	setTime()
	{
		this.time = new Time();
	}

	setWorld()
	{
		this.world = new World()
	}
	
	/*
	*	Setup scene
	*/
	setScene()
	{
		this.scene = new THREE.Scene();
	}

	/*
	*	Setup camera
	*/
	setCamera()
	{
		this.camera = new Camera();
	}

	setNewCamera(camera)
	{
		this.camera = camera;
	}
	/*
	*	Setup renderer
	*/
	setRenderer()
	{
		this.renderer = new Renderer();
	}

	resize()
	{
		this.camera.resize();
		this.renderer.resize();
	}

	update()
	{
		if(this.time) {
			this.time.update();
		}
		
		if(this.camera) {
			this.camera.update();
		}
		
		if(this.world) {
			this.world.update();
		}

		if(this.renderer) {
			this.renderer.update();
		}

		window.requestAnimationFrame(this.update.bind(this));
	}
}