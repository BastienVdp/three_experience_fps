import EventEmitter from 'events';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default class Loader extends EventEmitter
{
	constructor()
	{
		super();

		this.toLoad = 0;
        this.loaded = 0;

		this.setLoaders();
	}

	setLoaders()
	{
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('assets/draco/')
		const gltfLoader = new GLTFLoader();
		const fbxLoader = new FBXLoader();
		const textureLoader = new TextureLoader();
		const cubeLoader = new CubeTextureLoader();
	
		gltfLoader.setDRACOLoader(dracoLoader);

		this.loaders = [];

		// GLTF
		this.loaders.push({
			type: ['glb', 'gltf'],
			action: (resource) =>
            {
                gltfLoader.loadAsync(resource.source).then((data) => {
					this.onLoadEnd(resource, data);
				});
            }
		});

		this.loaders.push({
			type: ['fbx'],
			action: (resource) =>
            {
                fbxLoader.loadAsync(resource.source).then((data) => {
					this.onLoadEnd(resource, data);
				});
            }
		});
		
		this.loaders.push({
			type: ['png', 'jpg', 'jpeg'],
			action: (resource) => 
			{
				textureLoader.loadAsync(resource.source).then((data) => {
					this.onLoadEnd(resource, data);
				});
			}
		})

		this.loaders.push({
			type: ['cube'],
			action: (resource) => 
			{
				cubeLoader.loadAsync(resource.source).then((data) => {
					this.onLoadEnd(resource, data);
				});
			}
		})

	}

	load(resources)
	{
		resources.forEach((resource) => 
		{
			this.toLoad++;
			
			if(resource.type) 
			{
				const loader = this.loaders.find((loader) => loader.type.includes(resource.type));
				if(loader) 
				{
					loader.action(resource);
				} 
				else 
				{
					console.warn(`No loader found for file extension '${extension}'`);
				}
			} 
			else 
			{
				console.warn(`No file extension found in '${resource.source}'`);
			}

		});
	}

	onLoadEnd(resource, data)
	{
		this.loaded++;
		this.emit('onLoadEnd', {resource, data});

		if(this.loaded === this.toLoad) 
		{
			this.onLoadComplete();
		}
	}

	onLoadComplete()
	{
		this.emit('onLoadComplete');
	}
}