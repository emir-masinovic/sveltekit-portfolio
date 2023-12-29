<script>
	import { onMount } from 'svelte';
	import * as BABYLON from '@babylonjs/core';
	// import * as Material from '@babylonjs/materials';
	import '@babylonjs/loaders/';
	// import * as GUI from '@babylonjs/gui';
	// import * as CANNON from 'cannon';

	import { createArcRotateCamera, createFreeCamera } from '$lib/cameras.js';
	import { createGround } from '$lib/ground.js';
	import { createPlayer, createPlayerClones } from '$lib/player.js';
	import { setupInputHandling } from '$lib/inputs.js';
	import { setupSkybox } from '$lib/skybox.js';
	import { importMesh } from '$lib/importMesh.js';

	let engine, scene;

	async function createScene() {
		let divFps = document.getElementById('fps');

		// let advancedTexture = new GUI.AdvancedDynamicTexture('adt', 128, 128, scene);
		// advancedTexture.parseFromSnippetAsync('1F2VJQ');
		// let loadedGui = await GUI.AdvancedDynamicTexture.ParseFromFileAsync('/menu.json', true);

		let canvas = document.getElementById('renderCanvas');
		engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
		engine.displayLoadingUI();
		scene = new BABYLON.Scene(engine);
		// scene.enablePhysics(
		// 	new BABYLON.Vector3(0, -9.81, 0),
		// 	new BABYLON.CannonJSPlugin(undefined, undefined, CANNON)
		// );
		scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
		scene.collisionsEnabled = true;
		// scene.useRightHandedSystem = true;

		// const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
		// light.intensity = 0.7;

		let arcCamera = createArcRotateCamera(scene);
		let freeCamera = createFreeCamera(scene);
		let gridPlane = createGround(scene);
		let player = createPlayer(scene);
		arcCamera.lockedTarget = player;
		arcCamera.attachControl(canvas, false);
		freeCamera.attachControl(canvas, false);
		// scene.activeCamera = arcCamera;

		const followCamera = new BABYLON.FollowCamera(
			'FollowCamera',
			new BABYLON.Vector3(0, 0, 0),
			scene
		);
		followCamera.lockedTarget = player;
		scene.activeCamera = followCamera;

		followCamera.rotationOffset = 180;

		// console.log(arcCamera.position);

		setupInputHandling(canvas, scene, player, engine, freeCamera, arcCamera, gridPlane);
		setupSkybox(scene);

		const maxClones = 10;
		const radius = 10;
		// createPlayerClones(maxClones * 4, radius, player, scene);
		// createPlayerClones(maxClones * 8, radius * 2, player, scene);
		// createPlayerClones(maxClones * 16, radius * 4, player, scene);

		importMesh(scene);

		scene.registerBeforeRender(() => {
			// console.log(player);
			divFps.innerText = engine.getFps().toFixed();
			if (player.position.y < -100) player.position = new BABYLON.Vector3(0, 0, 0);
		});

		return scene;
	}

	onMount(async () => {
		await createScene();
		engine.hideLoadingUI();

		engine.runRenderLoop(() => {
			scene.render();
		});

		window.addEventListener('resize', () => {
			engine.resize();
		});
	});
</script>

<div class="fps-container">
	<div>FPS:</div>
	<div id="fps" />
</div>
<div id="canvasZone"><canvas id="renderCanvas" /></div>

<style>
	#canvasZone {
		width: 100%;
		height: calc(100vh - 80px);
		overflow: hidden;
	}

	#renderCanvas {
		width: 100%;
		height: 100%;
		touch-action: none;
	}

	.fps-container {
		position: absolute;
		display: flex;
		gap: 3px;
		background-color: #464e56;
		border: 1px solid black;
		color: white;
		top: 100px;
		left: 20px;
		padding: 5px;
		width: 70px;
	}
</style>
