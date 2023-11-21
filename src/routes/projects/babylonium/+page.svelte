<script>
	import { onMount } from 'svelte';
	import * as BABYLON from '@babylonjs/core';
	import * as Material from '@babylonjs/materials';
	import { createArcRotateCamera, createFreeCamera, switchCam } from '$lib/cameras.js';
	import { createGridBox } from '$lib/createGridBox.js';

	let shape, engine, scene, arcCamera, freeCamera;

	async function createScene() {
		let canvas = document.getElementById('renderCanvas');
		engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
		engine.displayLoadingUI();
		scene = new BABYLON.Scene(engine);

		let gridBox = createGridBox(scene);
		shape = gridBox;
		arcCamera = createArcRotateCamera(scene);
		freeCamera = createFreeCamera(scene);
		arcCamera.lockedTarget = shape;
		switchCam('arc camera', arcCamera, freeCamera, canvas, shape, scene);

		window.addEventListener('keydown', (event) => {
			if (event.key === 'c') {
				switchCam('arc camera', arcCamera, freeCamera, canvas, shape, scene);
			}
		});

		let frontUV = new BABYLON.Vector4(0, 0, 0.5, 1);
		let backUV = new BABYLON.Vector4(0.5, 0, 1, 1);
		let gridPlane = BABYLON.MeshBuilder.CreatePlane(
			'gridPlane',
			{
				width: 1000,
				height: 1000,
				sideOrientation: BABYLON.Mesh.DOUBLESIDE,
				frontUVs: frontUV,
				backUVs: backUV
			},
			scene
		);
		gridPlane.position.x = 0;
		gridPlane.position.y = -0.5;
		gridPlane.rotation.x = BABYLON.Tools.ToRadians(90);

		let gridPlaneMaterial = new Material.GridMaterial('gridPlaneMaterial', scene);
		gridPlaneMaterial.gridRatio = 3;
		gridPlaneMaterial.majorUnitFrequency = 30;
		gridPlaneMaterial.lineColor = BABYLON.Color3.FromHexString('#fe01f5');
		gridPlane.material = gridPlaneMaterial;

		engine.hideLoadingUI();
	}

	onMount(async () => {
		await createScene();

		engine.runRenderLoop(() => {
			// shape.position.x += 0.001;
			scene.render();
		});

		window.addEventListener('resize', () => {
			engine.resize();
		});
	});
</script>

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
</style>
