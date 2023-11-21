async function loadGUI() {
	// Visit gui.babylonjs.com/#CITCWC#52 to edit the GUI
	// await advancedTexture.parseFromSnippetAsync('#CITCWC#52');
	const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, scene);
	await advancedTexture.parseFromURLAsync('/menu.json');

	const tabButtons = advancedTexture.getControlByName('Tabs').children;
	const tabContent = {
		Character: advancedTexture.getControlByName('CharacterTab'),
		Inventory: advancedTexture.getControlByName('InventoryTab'),
		Journal: advancedTexture.getControlByName('QuestTab'),
		Starmap: advancedTexture.getControlByName('StarmapTab')
	};
	let activeTab = '';
	function setActiveTab(tabName) {
		if (activeTab === tabName) return;
		// hide the old tab
		if (tabContent[activeTab]) {
			tabContent[activeTab].isVisible = false;
		}
		activeTab = tabName;
		for (const button of tabButtons) {
			// update the button colors
			if (activeTab === button.name) {
				button.color = '#E4D9B9FF';
			} else {
				button.color = '#808080FF';
			}
		}
		// show the new tab
		if (tabContent[activeTab]) {
			tabContent[activeTab].isVisible = true;
			tabContent[activeTab].left = '0%';
			tabContent[activeTab].isPointerBlocker = false;
		}
	}
	// add pointer events to each button to switch the tab over
	for (const tabButton of tabButtons) {
		tabButton.onPointerDownObservable.add(() => setActiveTab(tabButton.name));
	}
	setActiveTab('Journal');
	scene.onKeyboardObservable.add((ev) => {
		if (ev.event.key === 'Escape') {
			advancedTexture.rootContainer.isVisible = !advancedTexture.rootContainer.isVisible;
		}
	}, BABYLON.KeyboardEventTypes.KEYUP);
}
// loadGUI();
