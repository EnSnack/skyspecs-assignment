/**
 * Simple function for opening or closing and then removing (hiding) inner content
 *
 * @param {element} e The element to close.
 */
function toggleInner(e) {
	e.classList.toggle("_open");
	e.classList.toggle("_closed");
	hideInner(e);
}

/**
 * Simple function for hiding inner content.
 *
 * @param {element} e The element to hide the inner content of.
 */
function hideInner(e) {
	const v = e.getAttribute('id').match(/\d+/)[0];
	const ele = e.parentElement.querySelector(`li:nth-of-type(${parseInt(v)*2})`);
	if(ele !== null && ele.getAttribute('id') === null) {
		ele.classList.toggle("_hidden");
	}
}

/**
 * Recursive population function for filling the site with content dynamically.
 *
 * @param {object} object Our current data object.
 * @param {string} parent Our current parent on the site.
 * @param {string} top Our current "item" top level.
 * @param {string} upper Our current upper site name.
 */
function parseAndPopulate(object,parent,top,upper) {
	Object.keys(object[top]).forEach((k,i) => {
		upper = upper || object[top][i]["name"];
		let _NEW_LI = document.createElement('li');
		if(object[top][i]["id"] === undefined) {
			_NEW_LI.setAttribute('id', `_${top.toLowerCase()}${i+1}`);
			_NEW_LI.classList.add('_flex', '_center', '_item', '_closed', `_${top.toLowerCase()}`);
		} else {
			_NEW_LI.setAttribute('id', `_target${i+1}`);
			_NEW_LI.classList.add('_flex', '_center', '_item', `_target`);
		}
		
		// Hardcoded first element choice
		if(top == "Site" && i == 0) _NEW_LI.classList.add('_first_item');
		
		let _CONTENT_LEFT = document.createElement('div');
		_CONTENT_LEFT.classList.add('_left', '_flex');
		
		// If _target for custom code
		if(_NEW_LI.classList.contains("_target")) {
			let _INNER_DIV = document.createElement('div');
			_INNER_DIV.classList.add('_flex', '_column');
			_INNER_DIV.innerHTML = `<span>${object[top][i]["name"]}</span><span class="_info">${upper}/${object[top][i]["id"]}/${object[top][i]["name"].split("Spectrum ")[1]}/${object[top][i]["id"]}.${object[top][i]["name"].indexOf("Envelope") > -1 ? "120" : "100"}.x.x/0</span>`;
			_CONTENT_LEFT.append(_INNER_DIV);
		} else {
			// In our case, always name.
			_CONTENT_LEFT.innerHTML = `<span>${object[top][i]["name"]}${top == "Site" ? " Site" : ""}</span>`;
		}
		
		_NEW_LI.append(_CONTENT_LEFT);
		parent.append(_NEW_LI);
		
		// Our new object will always be on index 1, normally this might not be the case but for simplicity sake
		if(typeof object[top][i][Object.keys(object[top][i])[1]] == "object") {
			let _NEW_CHILD = document.createElement('li');
			_NEW_CHILD.append(document.createElement('ul'));
			parent.append(_NEW_CHILD);
			parseAndPopulate(object[top][i],_NEW_CHILD.querySelector('ul'),Object.keys(object[top][i])[1],upper);
		}
	});
}

window.onload = function() {
	const _TOP_LEVEL = document.querySelector("._content");
	// Fill our site with content
	parseAndPopulate(data,_TOP_LEVEL,Object.keys(data)[0]);
	
	// Hide all closed elements on start.
	document.querySelectorAll("._closed").forEach((e) => {
		hideInner(e);
	});
	
	// On Click listener for main section
	document.querySelectorAll("._item").forEach((e) => { 
		e.addEventListener("click", () => {
			if(e.classList.contains("_active_large") && (e.classList.contains("_closed") || e.classList.contains("_open"))) {
				toggleInner(e);
				return;
			}
			if(document.querySelector("._active_large")) {
				document.querySelector("._active_large").classList.toggle("_active_large");
			}
			e.classList.toggle("_active_large");
		});
	});
	
	// On Click listener for navbar
	document.querySelectorAll("._parent > div img").forEach((e) => { 
		e.addEventListener("click", () => {
			if(e.classList.contains("._active_small")) return;
			document.querySelector("._active_small").classList.toggle("_active_small");
			e.classList.toggle("_active_small");
		});
	});
}