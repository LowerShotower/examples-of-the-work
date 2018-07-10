import tasksHtml from './index.html';
import './index.scss';

export let  parent,
            tasksMenu,
            selectedTask;

export function loadTo(parent) {
    $(parent).append(tasksHtml);
    tasksMenu = $(parent).children('#tasksMenu');

     tasksMenu.find('#tasks').on( 'click', (e)=>{
        //  if($(e.target).is('.menu-el')){
        //     console.log('woops');
            onTasksMenuSubmit(e.target);
        // }
     } );

    tasksMenu.find('#tasks').children('.menu-el').attr('tabindex', 0).first().focus();
    tasksMenu.find('#tasks').children('.menu-el').attr('tabindex', 0).on('keydown', (event)=> {
        let ct = event.currentTarget;
        if(event.key == 'ArrowLeft' ) { // left or up
                $(ct).prev().focus();
        }
        if(event.key == 'ArrowRight' ) { // right or down
            $(ct).next().focus();
        }
        if($("#modalMenu").css("display") != 'none' && $("#modalMenu").css("display") != undefined ){
            if(event.key == 'Enter') { 
                onTasksMenuSubmit(ct);
            }
        }
        
    });
}

export function onTasksMenuSubmit(e){
    selectedTask = $(e).data("taskName");
    let ev = $.Event("tasksMenuSubmitted");
    tasksMenu.trigger(ev);
}

export function clear(){
    if(tasksMenu != null && tasksMenu != undefined) tasksMenu.remove();
}

export function disableBtns () {
    tasksMenu.children('#tasks').children("button").each( (i, e)=>{ 
        $(e).prop("disabled", true);
    } );
}