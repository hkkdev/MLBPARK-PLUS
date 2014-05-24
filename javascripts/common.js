var doc = document;
chrome.extension.sendMessage({action:'width'}, function(response) {
	var widthVar = response.width,
	widthValVar = response.widthVal;

	//custom container width
	if (widthVar == '1') {
		var customWidth = doc.createElement('style'); 
		customWidth.appendChild(doc.createTextNode('#wrap {max-width:' + widthValVar + 'px !important;}'));
		doc.documentElement.insertBefore(customWidth);
	}
});

//user toolbox remove
doc.onclick = function(){
	var userMenu = doc.querySelectorAll('div[id^="nik_"], #voterList');
	for (var i = 0, userMenuLen = userMenu.length; i < userMenuLen; i++){
		userMenu[i].style.display = 'none';
	}
}

$(doc).ready(function() {
	// Remove AD-Wrapper
	var adContainer = doc.querySelectorAll('.ad_left_w,.ad_left_w2,.ad_right_w');
	for (var i = 0, adContainerLen = adContainer.length; i < adContainerLen; i++){
		adContainer[i].innerHTML = '';
	}

	// Remove Ad-Frame
	var adFrame = doc.querySelectorAll('iframe[src*="donga.com"], #ADhead1');
	for (var i = 0, adFrameLen = adFrame.length; i < adFrameLen; i++){
		var t = adFrame[i];
		t.parentNode.removeChild(t);
	}


    

    // add tag to username
    var userMenu = getElementsStartsWithId('nik_');
    for (var i = 0; i < userMenu.length; i++) {
        var tagNode = document.createElement("li");
        
        var tag = document.createTextNode("태그");
        tagNode.appendChild(tag);
        // testing 태그 tag
        tagNode.setAttribute("onclick", "alert(\"tag works\")")
        userMenu[i].childNodes[0].appendChild(tagNode);
    }
});

// get elements starting with 'id'
function getElementsStartsWithId(id) {
    var children = document.body.getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
        child = children[i];
        if (child.id.substr(0, id.length) == id)
            elements.push(child);
    }
    return elements;
}
