(function() {

    var BASE_URL = 'https://cdn.rawgit.com/salexch/fYT/master/index.html';

    var YTPlayer = function(elem, options) {
        var iframe;

        var isElement = function(obj){
            try {
                return obj instanceof HTMLElement;
            } catch(e) {}

            return false;
        };

        //do all initialization and iframe creation
        if (arguments.length >= 1) {
            if (!isElement(elem)) {
                elem = document.querySelector('#' + elem);
                if (!elem) {
                    throw 'no DOM TAG for a Player';
                } else if (elem.nodeName !== 'IFRAME') {
                    iframe = document.createElement('iframe');
                    iframe.setAttribute('frameborder', 0);
                    iframe.setAttribute('allowfullscreen', 1);
                    iframe.title = 'file YouTube video player';
                    elem.parentNode.insertBefore(iframe, elem);
                    var elem_id = elem.id;
                    var elem_class = elem.className;
                    var width = elem.offsetWidth;
                    var height = elem.offsetHeight;

                    elem.remove();
                    iframe.id = elem_id;
                    iframe.className = elem_class;

                } else
                    iframe = elem;
            }

            iframe.src = BASE_URL;

            iframe.contentWindow.parent_player = this;
        }


        function sendCommand(cmd, args) {
            return iframe.contentWindow.getCommand(cmd, args);
        }


        return {
            //methods
            loadPlaylist: function() {
                sendCommand('loadPlaylist', arguments);
            },
            loadVideoById: function() {
                sendCommand('loadVideoById', arguments);
            },
            loadVideoByUrl: function() {
                sendCommand('loadVideoByUrl', arguments);
            },
            playVideo: function() {
                sendCommand('playVideo', []);
            },
            pauseVideo: function() {
                sendCommand('pauseVideo', []);
            },
            stopVideo: function() {
                sendCommand('stopVideo', []);
            },
            seekTo: function() {
                sendCommand('seekTo', arguments);
            },
            clearVideo: function() {
                sendCommand('clearVideo', arguments);
            },
            nextVideo: function() {
                sendCommand('nextVideo', []);
            },
            previousVideo: function() {
                sendCommand('previousVideo', []);
            },
            playVideoAt: function() {
                sendCommand('playVideoAt', arguments);
            },
            mute: function() {
                sendCommand('mute', []);
            },
            unMute: function() {
                sendCommand('unMute', []);
            },
            isMuted: function() { //return boolean
                return sendCommand('isMuted', []);
            },
            setVolume: function() {
                sendCommand('setVolume', arguments);
            },
            getVolume: function() { //returns integer
                return sendCommand('getVolume', []);
            },
            setLoop: function() {
                sendCommand('setLoop', arguments);
            },
            setShuffle: function() {
                sendCommand('setShuffle', arguments);
            },
            getPlayerState: function() {
                return sendCommand('getPlayerState', []);
            },
            getCurrentTime: function() {
                return sendCommand('getCurrentTime', []);
            },
            //events
            onReady: function() {},
            onStateChange: function() {},
            onError: function() {}
        }
    };

    this.fYT = {
        Player: YTPlayer,
        PlayerState: {
            ENDED: 0,
            PLAYING: 1,
            PAUSED: 2,
            BUFFERING: 3,
            CUED: 5
        }
    };

}).call(this);
