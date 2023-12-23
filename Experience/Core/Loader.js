import EventEmitter from 'events';

import {  FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import {  GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {  TextureLoader } from 'three/src/loaders/TextureLoader'
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
		const gltfLoader = new GLTFLoader();
		const fbxLoader = new FBXLoader();
		const textureLoader = new TextureLoader();		
		this.loaders = [];

		// GLTF
		this.loaders.push({
			extensions: ['glb', 'gltf'],
			action: (resource) =>
            {
                gltfLoader.loadAsync(resource.source).then((data) => {
					this.onLoadEnd(resource, data);
				});
            }
		});

		this.loaders.push({
			extensions: ['fbx'],
			action: (resource) =>
            {
                fbxLoader.loadAsync(resource.source).then((data) => {
					this.onLoadEnd(resource, data);
				});
            }
		});
		
		this.loaders.push({
			extensions: ['png', 'jpg', 'jpeg'],
			action: (resource) => 
			{
				textureLoader.loadAsync(resource.source).then((data) => {
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
			const extension = resource.source.match(/\.([a-z]+)$/)[1];
			
			if(extension) 
			{
				const loader = this.loaders.find((loader) => loader.extensions.includes(extension));

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