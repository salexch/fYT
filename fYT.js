(function() {

    var YTPlayer = function(elem, options) {

        var isElement = function(obj){
            try {
                return obj instanceof HTMLElement;
            }catch(e){}

            return false;
        };

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
