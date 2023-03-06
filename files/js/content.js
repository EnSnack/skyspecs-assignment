function toggleInner(e) {
	e.classList.toggle("_open");
	e.classList.toggle("_closed");
	for(const child of e.parentElement.children) {
		if(child != e) {
			child.classList.toggle("_hidden");
		}
	}
}

window.onload = function() {
	document.querySelectorAll("._item").forEach((e) => { 
		e.addEventListener("click", () => {
			if(e.classList.contains("_active_large") && (e.classList.contains("_closed") || e.classList.contains("_open"))) {
				toggleInner(e);
				return;
			}
			document.querySelector("._active_large").classList.toggle("_active_large");
			e.classList.toggle("_active_large");
		});
	});
	
	document.querySelectorAll("._parent > div img").forEach((e) => { 
		e.addEventListener("click", () => {
			if(e.classList.contains("._active_small")) return;
			document.querySelector("._active_small").classList.toggle("_active_small");
			e.classList.toggle("_active_small");
		});
	});
}