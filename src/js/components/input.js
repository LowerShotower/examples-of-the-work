
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
            key = code.toUpperCase();
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
         
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        event.preventDefault();
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        event.preventDefault();
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };

    export function bindKeyboardNavTo(parent){

    }

    let spaceWasPressed = false;
    
    export function ksortable(target, options) {
          $(target).sortable(options);
          $(target).disableSelection(options);
          $('.answer').attr('tabindex', 0).first().focus();
            $('.answer').attr('tabindex', 0).on('keydown' ,function(event) {
                if(event.key == ' ') {
                    console.log(event.key);
                    event.preventDefault();
                    if(spaceWasPressed == false) spaceWasPressed = true;
                    else spaceWasPressed = false;
                }
              if(event.key == 'ArrowLeft' || event.key == 'ArrowUp') { // left or up
                if(spaceWasPressed){
                    event.preventDefault();
                    $(this).insertBefore($(this).prev());
                    $(this).focus();
                } else {
                    $(this).prev().focus();
                }
              }
              if(event.key == 'ArrowRight' || event.key == 'ArrowDown') { // right or down
                if(spaceWasPressed){
                    $(this).insertAfter($(this).next()); 
                    event.preventDefault();
                    $(this).focus();
                } else {
                    $(this).next().focus();
                }
              }
              if(event.key == 'Tab') {
                event.preventDefault();
                  if(event.shiftKey){
                    $(this).next().focus();
                  } else{
                    $(this).prev().focus();
                  }
              }
          });
        }

        export function keysSimple(parent, choosenAnswer) {
            
            // parent.children('.answer').first().focus();
          }
