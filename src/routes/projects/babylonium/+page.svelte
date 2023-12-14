<script>
	import { onMount } from 'svelte';
	import * as BABYLON from '@babylonjs/core';
	// import * as BABYLON from '@babylonjs/core/Legacy/legacy';
	// import * as Material from '@babylonjs/materials';
	import '@babylonjs/loaders/';
	// import { AdvancedDynamicTexture } from '@babylonjs/gui';

	import { createArcRotateCamera, createFreeCamera } from '$lib/cameras.js';
	import { createGround } from '$lib/ground.js';
	import { createPlayer, createPlayerClones } from '$lib/player.js';
	import { setupInputHandling } from '$lib/inputs.js';
	import { setupSkybox } from '$lib/skybox.js';
	import { importMesh } from '$lib/importMesh.js';

	let engine, scene;

	async function createScene() {
		let divFps = document.getElementById('fps');

		// const gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('gui', true, scene);
		// void gui.parseFromSnippetAsync('1F2VJQ');
		// let loadedGui = await AdvancedDynamicTexture.ParseFromURLAsync('/menu.json');

		let canvas = document.getElementById('renderCanvas');
		engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
		engine.displayLoadingUI();
		scene = new BABYLON.Scene(engine);
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
		createPlayerClones(maxClones * 5, radius, player, scene);
		// createPlayerClones(20, 20, player, scene);
		// createPlayerClones(30, 30, player, scene);

		importMesh(scene);

		scene.registerBeforeRender(() => {
			// console.log(player);
			divFps.innerText = engine.getFps().toFixed() + ' fps';
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

<div id="fps">0</div>
<div id="canvasZone"><canvas id="renderCanvas" /></div>

<style>
	:global(body) {
		height: calc(100vh - 80px);
	}
	#canvasZone {
		width: 100vw;
		height: 100%;
		overflow: hidden;
	}

	#renderCanvas {
		width: 100%;
		height: 100%;
		touch-action: none;
	}

	#fps {
		position: absolute;
		background-color: #464e56;
		border: 1px solid black;
		text-align: center;
		color: white;
		top: 100px;
		right: 20px;
		padding: 5px;
	}
</style>
