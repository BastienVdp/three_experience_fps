import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

import Resources from './Core/Resources';
import Sizes from './Core/Sizes';

import World from './World';

export default class Experience
{
	static instance;

	constructor(options)
	{
		if(Experience.instance) {
			return Experience.instance;
		}
		Experience.instance = this;

		this.canvas = options.canvas;

		this.lastFrameTime = null;
		this.animFrameId = 0;

		this.isDebugging = window.location.hash === '#debug';

		if(this.isDebugging) {
			this.debug = new dat.GUI({ width: 420 });
		}

		this.setResouces();
		this.setSizes();

		this.init();

		this.update();
	}


	init()
	{		
		this.setScene();
		this.setCamera();
		this.setRenderer();	
		this.setOrbitControls();
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
		this.resources.on('ready', () => {
			this.setWorld();
		});
	}

	setSizes()
	{
		this.sizes = new Sizes();
	}

	setWorld()
	{
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(ambientLight);	
		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight.position.set(1, 1, 1);
		this.scene.add(directionalLight);
		this.world = new World()
		this.scene.add(this.world.container);
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
		this.camera = new THREE.PerspectiveCamera(60, this.sizes.width / this.sizes.height, 1, 1000);
		// this.camera.up.set(0, 1, 0)
		this.camera.position.set(0, 20, 20)
		
		this.sizes.on('resize', () => {
			this.camera.aspect = this.sizes.width / this.sizes.height;
			this.camera.updateProjectionMatrix();
		});
	}

	/*
	*	Setup renderer
	*/
	setRenderer()
	{
		this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true});
		this.renderer.toneMapping = THREE.ReinhardToneMapping;
		this.renderer.toneMappingExposure = 2.3;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setSize(this.sizes.width, this.sizes.height);

		this.sizes.on('resize', () => {
            this.renderer.setSize(this.sizes.width, this.sizes.height);
        });
	}

	setOrbitControls()
	{
		this.orbitControls = new OrbitControls(this.camera, this.canvas);
		this.orbitControls.enableDamping = true;
	}

	start()
	{
		this.animFrameId = window.requestAnimationFrame(this.update);
	}

	update(t)
	{
		if(this.lastFrameTime === null) {
			this.lastFrameTime = t;
		}

		const delta = t - this.lastFrameTime;
		const elapsedTime = Math.min(1.0 / 30.0, delta * 0.001);
		
		this.step(elapsedTime);
		this.lastFrameTime = t;
	
		if(this.orbitControls) {
			this.orbitControls.update();
		}

		this.renderer.render(this.scene, this.camera);

		window.requestAnimationFrame(this.update.bind(this));
	}

	step(elapsedTime)
	{
		if(this.world) {
			this.world.update(elapsedTime);
		}
	}
}