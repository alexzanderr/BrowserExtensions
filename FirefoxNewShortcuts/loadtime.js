


browser.commands.onCommand.addListener(function(command) {

	const windowTabs = browser.tabs.query({
		"currentWindow": true
	});

	windowTabs.then(handle.bind(null, command), error);
});

function handle(command, windowTabs) {
	if(command == "first_tab") {
		browser.tabs.update(windowTabs[0].id, {
			active: true
		});
	}
	else if(command == "second_tab" && windowTabs.length > 1) {
		browser.tabs.update(windowTabs[1].id, {
			active: true
		});
	}
	else if(command == "third_tab" && windowTabs.length > 2) {
		browser.tabs.update(windowTabs[2].id, {
			active: true
		});
	}
	else if(command == "fouth_tab" && windowTabs.length > 3) {
		browser.tabs.update(windowTabs[3].id, {
			active: true
		});
	}
	else if(command == "fifth_tab" && windowTabs.length > 4) {
		browser.tabs.update(windowTabs[4].id, {
			active: true
		});
	}
	else if(command == "sixth_tab" && windowTabs.length > 5) {
		browser.tabs.update(windowTabs[5].id, {
			active: true
		});
	}
	else if(command == "seventh_tab" && windowTabs.length > 6) {
		browser.tabs.update(windowTabs[6].id, {
			active: true
		});
	}
	else if(command == "eighth_tab" && windowTabs.length > 7) {
		browser.tabs.update(windowTabs[7].id, {
			active: true
		});
	}
	else if(command == "nineth_tab" && windowTabs.length > 8) {
		browser.tabs.update(windowTabs[8].id, {
			active: true
		});
	}
	else if(command == "last_tab") {
		browser.tabs.update(windowTabs[windowTabs.length - 1].id, {
			active: true
		});
	}
	else if (command == "close-active-tab") {
		console.log("im here")
		for (let index = 0; index < windowTabs.length; index++) {
			if (windowTabs[index].active) {
				browser.tabs.remove(windowTabs[index].id)
				break
			}
		}
	}

}

function error(msg) {
	console.log("Error: " + msg);
}
