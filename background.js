chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		if( details.url.indexOf('articleVC.php') !== -1) {
			return {redirectUrl: details.url.replace('articleVC', 'articleV')};
		}
	},{
		urls: ['http://mlbpark.donga.com/*']
	}, ['blocking']
);

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		return {redirectUrl:'javascript:void(0)'};
	}, {
		urls:[
			'http://idolpark.donga.com/*',
			'http://sports.donga.com/*',
			'http://mlbpark.donga.com/poll/*',
			'http://openapi.donga.com/SPORTS/suggestion',
			'http://*.doubleclick.net/*',
			'http://mlbpark.donga.com/mypage/memo_read.php'
		], types: ['sub_frame']
	}, ['blocking']
);

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		return {redirectUrl:'javascript:void(0)'};
	}, {
		urls:[
			'http://dimg.donga.com/acecounter/*',
			'http://dimg.donga.com/carriage/SPORTS/*',
			'http://pagead2.googlesyndication.com/*',
			'http://www.gstatic.com/*',
			'http://rtax.criteo.com/*'
		], types: ['script']
	}, ['blocking']
);

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		return {redirectUrl:'javascript:void(0)'};
	}, {
		urls:[
			'http://ar.donga.com/*',
			'http://cad.donga.com/*',
			'http://mlbpark.donga.com/acecounter/*',
			'http://210.115.150.117/log/*',
			'http://www2.donga.com:8080/*'
		]
	}, ["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		return {redirectUrl:chrome.extension.getURL('/images/userIcon.gif')};
	}, {
		urls:[
			'http://mlbpark.donga.com/data/',
			'http://mlbpark.donga.com/data/emoticon/0.gif',
			'http://mlbpark.donga.com/data/emoticon/1.gif'
		]
	}, ['blocking']
);

// 제목 차단 키워드 등록 - 사용자 차단과 거의 동일(bad smell, 비슷한게 또 추가되면 refactoring 필요)
function blockTitlteFn(request, sender) {
	var title = request.data.title;
	var blockVar = localStorage['blockInput'];
	if(!title) {
		return {
			result: false,
			title: title,
			message: '알 수 없는 키워드(' + title + ') 입니다.'
		};
	}

	// 기존 설정된 차단 키워드가 있는지 확인
	if(!blockVar || 0 > blockVar.search(new RegExp('(;|^)' + title.replace(/([\[\]\(\)])/g, '\\$1') + '(;|$)'))) {
		if(!blockVar) localStorage["blockInput"] = title;
		else localStorage["blockInput"] = blockVar + ';' + title;
		return {
			result: true,
			title: title
		};
	} else {
		return {
			result: false,
			title: title,
			message: '키워드 "' + title + '"는 이미 차단되어 있습니다.'
		};
	}
};

// 사용자 차단 등록 - 제목 키워드 차단과 거의 동일(bad smell, 비슷한게 또 추가되면 refactoring 필요)
function blockUserFn(request, sender) {
	var user = request.data.user;
	var blockUserVar = localStorage["blockUserInput"];
	if(!user) {
		return {
			result: false,
			user: user,
			message: '알 수 없는 닉네임(' + user + ') 입니다.'
		};
	}

	// 기존 설정된 차단 닉네임이 있는지 확인
	if(!blockUserVar || 0 > blockUserVar.search(new RegExp('(;|^)' + user.replace(/([\[\]\(\)])/g, '\\$1') + '(;|$)'))) {
		if(!blockUserVar) localStorage["blockUserInput"] = user;
		else localStorage["blockUserInput"] = blockUserVar + ';' + user;
		return {
			result: true,
			user: user
		};
	} else {
		return {
			result: false,
			user: user,
			message: '"' + user + '" 님은 이미 차단되어 있습니다.'
		};
	}
};

function storeDefaultOptionValueIfNotExists() {
	if(null == localStorage['titIcon']) localStorage['titIcon'] = 1;
	if(null == localStorage['team']) localStorage['team'] = 1;
	if(null == localStorage['blind']) localStorage['blind'] = 1;
	if(null == localStorage['block']) localStorage['block'] = 0;
	if(null == localStorage['blockInput']) localStorage['blockInput'] = '';
	if(null == localStorage['blockType']) localStorage['blockType'] = 1;
	if(null == localStorage['blockUser']) localStorage['blockUser'] = 0;
	if(null == localStorage['blockUserInput']) localStorage['blockUserInput'] = '';
	if(null == localStorage['userHistory']) localStorage['userHistory'] = 0;
	if(null == localStorage['reply']) localStorage['reply'] = 1;
	if(null == localStorage['userCommentView']) localStorage['userCommentView'] = 1;
	if(null == localStorage['video']) localStorage['video'] = 1;
	if(null == localStorage['imageSearch']) localStorage['imageSearch'] = 1;
	if(null == localStorage['videoSearch']) localStorage['videoSearch'] = 1;
	if(null == localStorage['passwd']) localStorage['passwd'] = 0;
	if(null == localStorage['notice']) localStorage['notice'] = 0;
	if(null == localStorage['shortcut']) localStorage['shortcut'] = 1;
	if(null == localStorage['width']) localStorage['width'] = 0;
	if(null == localStorage['widthVal']) localStorage['widthVal'] = 858;
    if(null == localStorage['addTag']) localStorage['addTag'] = 0;
    if(null == localStorage['tags']) {
        var a = {};
        localStorage['tags'] = JSON.stringify(a);
    }
}

function blockKeywordTrim(storage, storageVar) {
	if (localStorage[storage]){
		var storageVar = localStorage[storage];
		console.log(storageVar);
		localStorage[storage] = storageVar.replace(/\n/g, '').replace(/^[;\s]+|[;\s]+$/g, '').replace(/;[;\s]*;/g, ';');
	}
}

function onMessage(request, sender, sendResponse) {
	switch (request.action){
		case 'mbs':
			sendResponse({
				titleIcon: localStorage['titIcon'],
				teamIcon: localStorage['team'],
				blind: localStorage['blind'],
				titleBlock: localStorage['block'],
				titleBlockKeywords: localStorage['blockInput'].toLowerCase().split(/[ \t\n]*;[ \t\n]*/),
				titleBlockType: localStorage['blockType'],
				userBlock: localStorage['blockUser'],
				userBlockKeywords: localStorage['blockUserInput'].split(/\n*;\n*/),
				userHistory: localStorage["userHistory"],
				reply: localStorage['reply'],
				userCommentView: localStorage['userCommentView'],
				videoResize: localStorage['video'],
				noticeBlock: localStorage['notice'],
				shortcut: localStorage['shortcut'],
				imageSearch: localStorage['imageSearch'],
                tagUser: localStorage['addtag'],
                tagValues: localStorage['tags']
			});
		break;
		case 'main':
			sendResponse({
				titleBlock: localStorage['block'],
				titleBlockKeywords: localStorage['blockInput'].toLowerCase().split(/[ \t\n]*;[ \t\n]*/),
				titleBlockType: localStorage['blockType']
			});
		break;
		case 'width':
			sendResponse({
				width: localStorage['width'],
				widthVal: localStorage['widthVal']
			});
		break;
		case 'passwd':
			sendResponse({
				passwd: localStorage['passwd']
			});
		break;
		case 'titleBlockDelivery':
			sendResponse(blockTitlteFn(request, sender));
		break;
		case 'userBlockDelivery':
			sendResponse(blockUserFn(request, sender));
		break;
        case 'tag':
            localStorage['tags'] = request.tagVal;
            sendResponse({status: 'ok'});
        break;
	}
}
storeDefaultOptionValueIfNotExists();
blockKeywordTrim('blockInput', 'blockInputVal');
blockKeywordTrim('blockUserInput', 'blockUserInputVal');
chrome.extension.onMessage.addListener(onMessage);
