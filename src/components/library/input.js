
import 'webpack-jquery-ui';


    var pressedKeys = {};

    function setKey(event, status) {
        var key;
        var code = event.key;
        switch(code) {
            case 'Enter': 
            key = 'ENTER'; break;

            case 'ArrowUp': 
            case 'w': 
            key = 'UP'; break;

            case 'ArrowDown': 
            case 's': 
            key = 'DOWN'; break;

            case 'ArrowLeft': 
            case 'a': 
            key = 'LEFT'; break;

            case 'ArrowRight': 
            case 'd': 
            key = 'RIGHT'; break;

        default:
            // Convert ASCII codes to letters
            
            if (code != undefined){
                key = code.toUpperCase();
            }
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {

        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };

