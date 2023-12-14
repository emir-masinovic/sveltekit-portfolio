<script>
	import { onMount } from 'svelte';
	import * as BABYLON from '@babylonjs/core';
	import Havok from '@babylonjs/havok';
	import { HavokPlugin } from '@babylonjs/core/Physics/v2/Plugins/havokPlugin';

	onMount(async () => {
		let canvas = document.getElementById('renderCanvas');
		const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
		let preTasks = [Havok];
		const createScene = async function () {
			const scene = new BABYLON.Scene(engine);
			const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
			camera.setTarget(BABYLON.Vector3.Zero());
			camera.attachControl(canvas, true);
			const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
			light.intensity = 0.7;
			const sphere = BABYLON.MeshBuilder.CreateSphere(
				'sphere',
				{ diameter: 2, segments: 32 },
				scene
			);
			sphere.position.y = 1;
			const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

			// const gravity = new BABYLON.Vector3(0, -10, 0);
			// const hk = await Havok();
			// const babylonPlugin = new BABYLON.HavokPlugin(true, hk);
			// scene.enablePhysics(gravity, babylonPlugin);
			return scene;
		};

		const scene = await createScene();

		engine.runRenderLoop(function () {
			scene.render();
		});

		window.addEventListener('resize', function () {
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
