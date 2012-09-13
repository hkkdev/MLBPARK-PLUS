function reset(){
	document.getElementById('titIcon').checked = true ;
	document.getElementById('team').checked = true ;
	document.getElementById('blind').checked = true;
	document.getElementById('block').checked = false;
	document.getElementById('blockInfo').style.display = 'none';
	document.getElementById('blockInput').value = '';
	document.getElementById('blockUser').checked = false;
	document.getElementById('blockUserInfo').style.display = 'none';
	document.getElementById('blockUserInput').value = '';
	document.getElementById('userHistory').checked = false;
	document.getElementById('reply').checked = true;
	document.getElementById('userCommentView').checked = true;
	document.getElementById('video').checked = true;
	document.getElementById('imageSearch').checked = true;
	document.getElementById('passwd').checked = false;
	document.getElementById('notice').checked = false;
	document.getElementById('width').checked = false;
	document.getElementById('widthVal').value = '858';
	document.getElementById('slideCurrent').innerText = '858';
	document.getElementById('range').style.display = 'none';
}

function restore(){
	if (localStorage['titIcon'] == 1 || localStorage['titIcon'] == null) {
		document.getElementById('titIcon').checked = true;
	} else {
		document.getElementById('titIcon').checked = false;
	}

	if (localStorage['team'] == 1 || localStorage['team'] == null) {
		document.getElementById('team').checked = true;
	} else {
		document.getElementById('team').checked = false;
	}

	if (localStorage['blind'] == 1 || localStorage['blind'] == null) {
		document.getElementById('blind').checked = true;
	} else {
		document.getElementById('blind').checked = false;
	}

	if (localStorage['block'] == 0 || localStorage['block'] == null) {
		document.getElementById('block').checked = false;
		document.getElementById('blockInfo').style.display = 'none';
		document.getElementById('blockInput').disabled = true;
	} else {
		document.getElementById('block').checked = true;
		document.getElementById('blockInfo').style.display = 'block';
		document.getElementById('blockInput').disabled = false;
	}

	if (!(localStorage['blockInput'] == null)) {
		document.getElementById('blockInput').value = localStorage['blockInput'];
	} 

	if (localStorage['blockType'] == '2') {
		document.getElementById('blockType_2').checked = true;
	} else {
		document.getElementById('blockType_1').checked = true;
	}

	if (localStorage['blockUser'] == 0 || localStorage['blockUser'] == null) {
		document.getElementById('blockUser').checked = false;
		document.getElementById('blockUserInfo').style.display = 'none';
		document.getElementById('blockUserInput').disabled = true;
	} else {
		document.getElementById('blockUser').checked = true;
		document.getElementById('blockUserInfo').style.display = 'block';
		document.getElementById('blockUserInput').disabled = false;
	}

	if (!(localStorage['blockUserInput'] == null)) {
		document.getElementById('blockUserInput').value = localStorage['blockUserInput'];
	} 

	if (localStorage['userHistory'] == 1) {
		document.getElementById('userHistory').checked = true;
	} else {
		document.getElementById('userHistory').checked = false;
	}

	if (localStorage['reply'] == 1 || localStorage['reply'] == null) {
		document.getElementById('reply').checked = true;
	} else {
		document.getElementById('reply').checked = false;
	}

	if (localStorage['userCommentView'] == 1 || localStorage['userCommentView'] == null) {
		document.getElementById('userCommentView').checked = true;
	} else {
		document.getElementById('userCommentView').checked = false;
	}

	if (localStorage['video'] == 1 || localStorage['video'] == null) {
		document.getElementById('video').checked = true;
	} else {
		document.getElementById('video').checked = false;
	}

	if (localStorage['imageSearch'] == 1 || localStorage['imageSearch'] == null) {
		document.getElementById('imageSearch').checked = true;
	} else {
		document.getElementById('imageSearch').checked = false;
	}

	if (localStorage['passwd'] == 1) {
		document.getElementById('passwd').checked = true;
	} else {
		document.getElementById('passwd').checked = false;
	}

	if (localStorage['notice'] == 1) {
		document.getElementById('notice').checked = true;
	} else {
		document.getElementById('notice').checked = false;
	}

	if (localStorage['width'] == null) {
		document.getElementById('width').checked = false;
		document.getElementById('range').style.display = 'none';
		document.getElementById('slideCurrent').innerText = '858';
	} else if (localStorage['width'] == 0) {
		document.getElementById('width').checked = false;
		document.getElementById('range').style.display = 'none';
		document.getElementById('slideCurrent').innerText = localStorage['widthVal'];
	} else {
		document.getElementById('width').checked = true;
		document.getElementById('slideCurrent').innerText = localStorage['widthVal'];
		document.getElementById('range').style.display = 'block';
	}

	if (localStorage['widthVal']) {
		document.getElementById('widthVal').value = localStorage['widthVal'];
	}
}

function save(){
	if (document.getElementById("titIcon").checked == true) {localStorage["titIcon"] = 1;}
	else {localStorage["titIcon"] = 0;}

	if (document.getElementById("team").checked == true) {localStorage["team"] = 1;}
	else {localStorage["team"] = 0;}

	if (document.getElementById("blind").checked == true) {localStorage["blind"] = 1;}
	else {localStorage["blind"] = 0;}

	if (document.getElementById("block").checked == true) {localStorage["block"] = 1;}
	else {localStorage["block"] = 0;}

	if (!(document.getElementById("blockInput").value.length == 0)) {
		localStorage["blockInput"] = document.getElementById("blockInput").value;
	} else {localStorage["block"] = 0;}

	if (document.getElementById("blockType_1").checked == true) {localStorage["blockType"] = 1;}
	else {localStorage["blockType"] = 2;}

	if (document.getElementById("blockUser").checked == true) {localStorage["blockUser"] = 1;}
	else {localStorage["blockUser"] = 0;}

	if (!(document.getElementById("blockUserInput").value.length == 0)) {
		localStorage["blockUserInput"] = document.getElementById("blockUserInput").value;
	} else {localStorage["blockUser"] = 0;}

	if (document.getElementById("userHistory").checked == true) {localStorage["userHistory"] = 1;}
	else {localStorage["userHistory"] = 0;}

	if (document.getElementById("reply").checked == true) {localStorage["reply"] = 1;}
	else {localStorage["reply"] = 0;}

	if (document.getElementById("userCommentView").checked == true) {localStorage["userCommentView"] = 1;}
	else {localStorage["userCommentView"] = 0;}

	if (document.getElementById("video").checked == true) {localStorage["video"] = 1;}
	else {localStorage["video"] = 0;}

	if (document.getElementById("imageSearch").checked == true) {localStorage["imageSearch"] = 1;}
	else {localStorage["imageSearch"] = 0;}

	if (document.getElementById("passwd").checked == true) {localStorage["passwd"] = 1;}
	else {localStorage["passwd"] = 0;}

	if (document.getElementById("notice").checked == true) {localStorage["notice"] = 1;}
	else {localStorage["notice"] = 0;}

	if (document.getElementById("width").checked == true) {localStorage["width"] = 1;}
	else {localStorage["width"] = 0;}

	localStorage['widthVal'] = document.getElementById("widthVal").value;

	$('.saveMsg').remove();
	$('#action').append('<span class="saveMsg">저장되었습니다.</span>');
	setTimeout(function() {
		$('.saveMsg').fadeOut('slow',function(){
			$(this).remove();
		});
	}, 1000);
}

$(window).load(function(){
	restore();

	$('#width').change(function(){
		var $range = $('#range');
		if (this.checked) {
				$range.slideDown(200);
		} else {
				$range.slideUp(200);
		}
	});

	$('#block').change(function(){
		var $blockInfo = $('#blockInfo');
		$blockInput = $('#blockInput');

		if (this.checked) {
			$blockInfo.slideDown(200);
			$blockInput.removeAttr('disabled');
		} else {
			$blockInfo.slideUp(200);
			$blockInput.attr('disabled','disabled');
		}
	});

	$('#blockUser').change(function(){
		var $blockUserInfo = $('#blockUserInfo');
		$blockUserInput = $('#blockUserInput');

		if (this.checked) {
			$blockUserInfo.slideDown(200);
			$blockUserInput.removeAttr('disabled');
		} else {
			$blockUserInfo.slideUp(200);
			$blockUserInput.attr('disabled','disabled');
		}
	});

	$('.save').bind('click',function(){
		save();
	});

	$('.reset').bind('click',function(){
		reset();
	});
});