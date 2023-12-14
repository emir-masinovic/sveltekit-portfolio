import * as BABYLON from '@babylonjs/core';
import * as Material from '@babylonjs/materials';

export function setupSkybox(scene) {
	let skyBox = BABYLON.Mesh.CreateBox('skyBox', 10000.0, scene);
	let skyBoxMaterial = new Material.SkyMaterial('skyBoxMaterial', scene);
	skyBoxMaterial.backFaceCulling = false;
	skyBoxMaterial.inclination = -0.5;
	skyBox.material = skyBoxMaterial;

	scene.registerBeforeRender(() => {
		let skySpeed = 0.00001;
		skyBoxMaterial.inclination += skySpeed;
		if (skyBoxMaterial.inclination > 0.6) {
			skyBoxMaterial.inclination = -0.6;
		}
	});
	/*
	 * Keys:
	 * - 1: Day
	 * - 2: Evening
	 * - 3: Increase Luminance
	 * - 4: Decrease Luminance
	 * - 5: Increase Turbidity
	 * - 6: Decrease Turbidity
	 * - 7: Move horizon to -300
	 * - 8: Restore horizon to 0
	 * - 9: Rayleigh to 0
	 * - 0: Rayleigh to -0.1
	 */
	window.addEventListener('keydown', function (event) {
		const configMap = {
			49: { property: 'inclination', value: 0 },
			50: { property: 'inclination', value: -0.5 },
			51: { property: 'luminance', value: 0.1 },
			52: { property: 'luminance', value: 1.0 },
			53: { property: 'turbidity', value: 40 },
			54: { property: 'turbidity', value: 5 },
			55: { property: 'cameraOffset.y', value: 300 },
			56: { property: 'cameraOffset.y', value: 0 },
			57: { property: 'rayleigh', value: 0 },
			48: { property: 'rayleigh', value: -0.1 }
		};

		const config = configMap[event.keyCode];
		if (config) {
			setSkyConfig(`material.${config.property}`, skyBoxMaterial[config.property], config.value);
		}
	});

	function setSkyConfig(property, from, to) {
		let keys = [
			{ frame: 0, value: from },
			{ frame: 100, value: to }
		];

		let animation = new BABYLON.Animation(
			'animation',
			property,
			100,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
		);
		animation.setKeys(keys);

		scene.stopAnimation(skyBox);
		scene.beginDirectAnimation(skyBox, [animation], 0, 100, false, 1);
	}
}
