var knife;
knife = knife || {};
knife.page = knife.page || {};
knife.page.player = {};

//knife.page.player.PATTERNS = [];
//knife.page.player.CHANNEL_DATA = [];
//knife.page.player.NUM_CHANNELS = 0;
 
knife.page.player.init = function() {
	
	knife.DEBUGGING = true;
	
	trace('init');
	
	//knife.page.player.getNumberOfChannels();
	//knife.page.player.getPatterns();
	//knife.page.player.getRate();
	
	
	knife.page.player.FIRE_ANIM = new SpriteAnim({
		elementId: 'fire',
		frames: 5,
		height: 640,
		delay: 150
	});
	
	

	$.timer(2000, function(timer) {
		timer.stop();
		
		
		//$('#skull2').shake(2, 20, 500);
		$('#skull2').animate({top: '91px'}, 2000 );

		//$('#skull1').shake(4, 10, 500);
		$('#skull1').animate({top: '58px'}, 2000, 'easeOutQuad', function() {
			//$('#skull1').shake(4, 10, 1000);
			knife.page.player.showTank();
		} );

		$('#controls .play').hover(function() {
			$('#tank').shake(2, 10, 150);
		}, function () {});
		//$('#onair-chat').animate({scrollTop: targetOffset}, 500, '', removeComments);

		$('#controls .tanks').click(function(e) {
			e.preventDefault();
			
			$('#controls').fadeOut('', function() {
				$('#controls2').fadeIn();
			})
			
		})
		
		$('#controls2 .back').click(function(e) {
			e.preventDefault();
			
			$('#controls2').fadeOut('', function() {
				$('#controls').fadeIn();
			})
			
		})
		
		//morgan
		$('#controls2 .about').click(function(e) {
			e.preventDefault();
			
			$('#controls2').fadeOut('', function() {
				$('#controls3').fadeIn();
			})
			
		})
		
		$('#controls3 .back').click(function(e) {
			e.preventDefault();
			
			$('#controls3').fadeOut('', function() {
				$('#controls2').fadeIn();
			})
			
		})		
		//morgan
		
		var shake = true;
		$.timer(10000, function() {
			
			if (shake) {
				$('#skull1').shake(1, 5, 300);
				shake = false;
			} else {
				$('#skull2').shake(2, 5, 500);
				shake = true;
			}
			
		})
		
		$.timer(15000, function(t) {
			t.stop();
			$('#skull2').shake(2, 5, 500);
		});
		
		$.timer(20000, function(t) {
			t.stop();
			$('#skull1').shake(3, 10, 300);
		})

		$('#track1').attr('loop', true);
			
	})

	$('#controls .play').click(function(e) {
		
		e.preventDefault();
		
		$.timer(1000, function(t) {
			t.stop();
			document.location = 'main.html';
		})
	})


	$('body').click(function() {
		
		
	
		knife.page.player.KNIFE_ANIM = new SpriteAnim({
			elementId: 'tank',
			frames: 3,
			height: 470,
			delay: 200,
			numberOfLoops: 1 
		});
		
		$.timer(500, function(t) {
	
			t.stop();
	
			var slash = document.getElementById('slash');
			var canPlayWav1 = ("no" != slash.canPlayType("audio/wav")) && ("" != slash.canPlayType("audio/wav"));

	
			if (canPlayWav1) {
				slash.play();
			}
		})
		
		$.timer(800, function(t) {
			t.stop();
			knife.page.player.KNIFE_ANIM.stopAnimation();
			$('#tank').css({backgroundPosition: '0 0'});
		})
		
	})
	
	var track1 = document.getElementById('track1');
	
	var canPlayOgg = ("no" != track1.canPlayType("audio/ogg")) && ("" != track1.canPlayType("audio/ogg"));
	var canPlayMp3 = ("no" != track1.canPlayType("audio/mpeg")) && ("" != track1.canPlayType("audio/mpeg"));
	var canPlayWav = ("no" != track1.canPlayType("audio/wav")) && ("" != track1.canPlayType("audio/wav"));

	//trace(canPlayOgg+' '+canPlayMp3+' '+canPlayWav);
	
	if (canPlayMp3) {
		$('#track1').attr('src', 'music/opening.mp3');
	} else if (canPlayOgg) {
		$('#track1').attr('src', 'music/opening.ogg');
	} else if (canPlayWav) {
		$('#track1').attr('src', 'music/opening.wav');
	}
	
	track1.play();
}


knife.page.player.showTank = function () {
	$.timer(1000, function(timer) {
		timer.stop();
		$('#tank').animate({top: '-5px', left: '250px'}, 500, 'easeOutBounce', knife.page.player.showTitle );
	})

}

knife.page.player.showTitle = function () {
	$('#title').animate({top: '25px', left: '0px'}, 500, 'easeOutBounce', knife.page.player.showControls );
}

knife.page.player.showControls = function () {
	$('#controls').fadeIn('slow');
}

/*
knife.page.player.getNumberOfChannels = function() {
	knifeWS.serviceCall("channel", null, knife.page.player.getNumberOfChannelsCB, knife.page.player.getNumberOfChannelsCB);
}

knife.page.player.getNumberOfChannelsCB = function(data) {
	
	//trace(data);
	
	if (data.result) {
		//success case
		
		$('.init-channels').html(data.channels);
		
		knife.page.player.getInitialChannelStates(data.channels);
		
		knife.page.player.NUM_CHANNELS = data.channels;
		
	} else {
		//failure case
		
		
	}
	
}

knife.page.player.getInitialChannelStates = function(numChannels) {
	
	knife.page.player.COUNTED_STATES = 0;
	
	for (var i=0; i<numChannels; i++) {
		knife.page.player.getChannelState(i);
	}
	
}

knife.page.player.getChannelState = function(thisChannel) {
	
	var thisAction = 'channel/'+thisChannel+'/state';
	
	knifeWS.serviceCall(thisAction, null, function(data) { knife.page.player.getChannelStateCB(thisChannel, data) }, function(data) { knife.page.player.getChannelStateCB(thisChannel, data) });	
}

knife.page.player.getChannelStateCB = function(thisChannel, data) {

	knife.page.player.CHANNEL_DATA[thisChannel] = knife.page.player.CHANNEL_DATA[thisChannel] || {};
	knife.page.player.CHANNEL_DATA[thisChannel].state = data.state;
	
	knife.page.player.getChannelPattern(thisChannel);

}

knife.page.player.getChannelPattern = function(thisChannel) {

	var thisAction = 'channel/'+thisChannel+'/pattern';
	
	knifeWS.serviceCall(thisAction, null, function(data) { knife.page.player.getChannelPatternCB(thisChannel, data) }, function(data) { knife.page.player.getChannelPatternCB(thisChannel, data) });	

}

knife.page.player.getChannelPatternCB = function(thisChannel, data) {

	knife.page.player.CHANNEL_DATA[thisChannel] = knife.page.player.CHANNEL_DATA[thisChannel] || {};
	knife.page.player.CHANNEL_DATA[thisChannel].pattern = data.pattern;
	
	knife.page.player.COUNTED_STATES++;
	
	if (knife.page.player.COUNTED_STATES == knife.page.player.NUM_CHANNELS) {
		knife.page.player.displayChannelData();
	}
	

}

knife.page.player.displayChannelData = function() {
	
	$('.init-channel-data').html(JSON.stringify(knife.page.player.CHANNEL_DATA));
	
	
	for (var i = 0; i < knife.page.player.NUM_CHANNELS; i++) {
		$('#channel-table').append(knife.page.player.getChannelMarkup(i));
	}
	
	for (var i = 0; i < knife.page.player.NUM_CHANNELS; i++) {
		knife.page.player.initChannelRow($('#row_'+i));
	}
	
	
}

knife.page.player.getChannelMarkup = function (thisChannel) {
	
	var thisState = knife.page.player.CHANNEL_DATA[thisChannel]['state'];
	var thisPattern = knife.page.player.CHANNEL_DATA[thisChannel]['pattern'];
	
	var thisStateChecked = [];
	thisStateChecked['off'] = '';
	thisStateChecked['single'] = '';
	thisStateChecked['loop'] = '';
	
	thisStateChecked[thisState] = ' checked="checked"';
			
	var markup = '';
	
	markup += '<tr id="row_'+thisChannel+'"><td> channel '+thisChannel+'</td><td>';
	markup += '<input type="radio" name="state_'+thisChannel+'" id="state_'+thisChannel+'_off" value="off"'+thisStateChecked['off']+'/><label for="state_'+thisChannel+'_off" id="state_'+thisChannel+'_off-label">off</label><input type="radio" name="state_'+thisChannel+'" id="state_'+thisChannel+'_single" value="single"'+thisStateChecked['single']+'/><label for="state_'+thisChannel+'_single" id="state_'+thisChannel+'_single-label">single</label><input type="radio" name="state_'+thisChannel+'" id="state_'+thisChannel+'_loop" value="loop"'+thisStateChecked['loop']+'/><label for="state_'+thisChannel+'_loop" id="state_'+thisChannel+'_loop-label">loop</label></td><td>';
	
	
	markup += '<select id="pattern_'+thisChannel+'"><option value="">-            -</option>';
	
	for (var i=0; i < knife.page.player.PATTERNS.length; i++) {
		
		var thisSelected = '';
		if (knife.page.player.PATTERNS[i] == thisPattern) {
			thisSelected = ' SELECTED';
		}
		
		markup += '<option value="'+knife.page.player.PATTERNS[i]+'"'+thisSelected+'>'+knife.page.player.PATTERNS[i]+'</option>';
	}
	
	markup += '</select></td></tr>';
	
	return markup;
 	
}

knife.page.player.initChannelRow = function(thisRow) {
	
	thisRow.find('input[type=radio]').bind('change', function(event) {
		
		knife.page.player.changeState($(this).attr('name').substr(6), $(this).val());
		
	});
	
	thisRow.find('select').bind('change', function(event) {
		
		knife.page.player.changePattern($(this).attr('id').substr(8), $(this).val());
		
	});
	
}

knife.page.player.changeState = function(thisChannel, thisState) {
		
	var thisAction = 'channel/'+thisChannel+'/state/'+thisState;
	
	knifeWS.serviceCall(thisAction, null, function(data) { knife.page.player.changeStateCB(thisChannel, data) }, function(data) { knife.page.player.changeStateCB(thisChannel, data) });	
	
	
}

knife.page.player.changeStateCB = function(thisChannel, data) {

	if (data.result) {
		//success case
		
		$('.status').fadeOut('fast', function() {
			$(this).html('changed state of channel '+thisChannel+' to '+data.state).fadeIn();
		})
		
	} else {
		//failure case
		
		
	}

}

knife.page.player.changePattern = function(thisChannel, thisPattern) {
		
	var thisAction = 'channel/'+thisChannel+'/pattern/'+thisPattern;
	
	knifeWS.serviceCall(thisAction, null, function(data) { knife.page.player.changePatternCB(thisChannel, data) }, function(data) { knife.page.player.changePatternCB(thisChannel, data) });	
	
	
}

knife.page.player.changePatternCB = function(thisChannel, data) {

	if (data.result) {
		//success case
		
		$('.status').fadeOut('fast', function() {
			$(this).html('changed pattern of channel '+thisChannel+' to '+data.pattern).fadeIn();
		})
		
	} else {
		//failure case
		
		
	}

}

knife.page.player.getPatterns = function() {
	knifeWS.serviceCall("pattern", null, knife.page.player.getPatternsCB, knife.page.player.getPatternsCB);	
}

knife.page.player.getPatternsCB = function(data) {

	if (data.result) {
		//success case

		$('.init-patterns').html(data.patterns);		
		
		knife.page.player.PATTERNS = data.patterns.split('\n');
		
		//trace(knife.page.player.PATTERNS);
		
	} else {
		//failure case
		
		
	}
	
}

knife.page.player.getRate = function() {
	knifeWS.serviceCall("rate", null, knife.page.player.getRateCB, knife.page.player.getRateCB);	
}

knife.page.player.getRateCB = function(data) {

	if (data.result) {
		//success case
		
		$('.init-rate').html(Math.floor(parseInt(data.rate) / 100));		
		
		
	} else {
		//failure case
		
		
	}
	
}
*/



$(document).ready(function() {
	knife.page.player.init();
});
