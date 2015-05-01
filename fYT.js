;(function() {

    //var BASE_URL = 'https://cdn.rawgit.com/salexch/fYT/0fe5ef2986fac1ce5e2252b7fdbbb04c1a77b884/index.html';
    var BASE_URL = 'http://youtubepl.local';

    //TODO add playerVars.origin = DOMAIN_NAME

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
            options = options || {};

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
                    var elem_width = elem.offsetWidth;
                    var elem_height = elem.offsetHeight;

                    elem.remove();
                    iframe.id = elem_id;
                    iframe.className = elem_class;
                    iframe.style.width = elem_width + 'px';
                    iframe.style.height = elem_height + 'px';
                } else
                    iframe = elem;
            } else if (elem.nodeName != 'IFRAME') {

            } else
                iframe = elem;

            if (options && options.width)
                iframe.style.width = options.width + 'px';
            if (options && options.height)
                iframe.style.height = options.height + 'px';

            options.width = iframe.offsetWidth;
            options.height = iframe.offsetHeight;

            var that = this;
            iframe.onload = function() {
                this.contentWindow.parent_player = that;
                this.contentWindow.init(options);
            };

            iframe.src = BASE_URL;
        }


        function sendCommand(cmd, args) {
            return iframe.contentWindow.getCommand(cmd, args);
        }

        //methods
        this.loadPlaylist = function() {
            sendCommand('loadPlaylist', arguments);
        };
        this.loadVideoById = function() {
            sendCommand('loadVideoById', arguments);
        };
        this.loadVideoByUrl = function() {
            sendCommand('loadVideoByUrl', arguments);
        };
        this.playVideo = function() {
            sendCommand('playVideo', []);
        };
        this.pauseVideo = function() {
            sendCommand('pauseVideo', []);
        };
        this.stopVideo = function() {
            sendCommand('stopVideo', []);
        };
        this.seekTo = function() {
            sendCommand('seekTo', arguments);
        };
        this.clearVideo = function() {
            sendCommand('clearVideo', arguments);
        };
        this.nextVideo = function() {
            sendCommand('nextVideo', []);
        };
        this.previousVideo = function() {
            sendCommand('previousVideo', []);
        };
        this.playVideoAt = function() {
            sendCommand('playVideoAt', arguments);
        };
        this.mute = function() {
            sendCommand('mute', []);
        };
        this.unMute = function() {
            sendCommand('unMute', []);
        };
        this.isMuted = function() { //return boolean
            return sendCommand('isMuted', []);
        };
        this.setVolume = function() {
            sendCommand('setVolume', arguments);
        };
        this.getVolume = function() { //returns integer
            return sendCommand('getVolume', []);
        };
        this.setLoop = function() {
            sendCommand('setLoop', arguments);
        };
        this.setShuffle = function() {
            sendCommand('setShuffle', arguments);
        };
        this.getPlayerState = function() {
            return sendCommand('getPlayerState', []);
        };
        this.getCurrentTime = function() {
            return sendCommand('getCurrentTime', []);
        };
        //events
        this.onReady = function() {};
        this.onStateChange = function() {};
        this.onError = function() {};

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
