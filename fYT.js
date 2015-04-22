			var YTPlayer = function(elem, options) {
			
				var isElement = function(obj){
					try {
						return obj instanceof HTMLElement;
					}catch(e){}
					
					return false;
				}
			
				//do all initialization and iframe creation
				if (arguments.length >= 1) {
					if (!isElement(elem)) {
						elem = document.querySelector(elem);
						if (!elem) {
							elem = document.createElement('iframe');
							document.body.appendChild(elem);
							//set elem styles
						}
					}
					
					elem.src = 'http://youtubepl.local';
				}
				
			
				function sendCommand(cmd, msg) {
					document.querySelector('iframe').contentWindow.getCommand(cmd, msg);
				}			
			
			
				return {
					//methods
					loadPlaylist: function(obj) {
						sendCommand('loadPlaylist', [obj]);
					},
					loadVideoById: function(obj) {
						sendCommand('loadVideoById', [obj]);
					},
					stopVideo: function() {
						sendCommand('stopVideo', []);
					},
					//events
					onReady: function() {},
					onStateChange: function() {},
					onError: function() {}	
				}
			}

			var fYT = {
				Player: YTPlayer,
				PlayerState: {
					ENDED: 0,
					PLAYING: 1,
					PAUSED: 2,
					BUFFERING: 3,
					CUED: 5
				}
			};
			
			var player = new fYT.Player();
			player.onReady = function(event) {
				console.log('player ready', event);
				player.loadPlaylist({
					list:'PLacrNTP1FPJgtxRFo-W48IP3jF-G1CDNE',
                    listType:'playlist'				
				});
			}
			
			var done = false;
			player.onStateChange = function(event) {
				if (event.data == fYT.PlayerState.PLAYING && !done) {
					setTimeout(stopVideo, 6000);
					done = true;
				}			
			}
			
			function stopVideo() {
				player.stopVideo();
			}		