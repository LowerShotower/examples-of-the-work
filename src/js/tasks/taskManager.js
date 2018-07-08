import MathsTask from './maths/index';
import EngToRusTask from './engToRus/index';
import WordsTask from './words/index';
import SynthesisTask from './synthesis/index';
import {sample} from 'lodash-es';
import InsertCharTask from './InsertChar/index';
import HistoryTask from './history/index';
import DiapasonTask from './diapason/index';
import CapitalTask from './capital/index';
import RainbowTask from './rainbow/index';
import LegsTask from './legs/index';
import OrderTask from './order/index';
import CommonWordTask from './commonWord/index';
import SentenceTask from './sentence/index';
import JsQuizTask from './jsQuiz/index';
import DaysTask from './days/index';
//***************** taskManager ******************************* */

export function generateTask(type){
    let task;
    let taskList = {
        "maths":  MathsTask,
        "engToRus": EngToRusTask,
        "words":  WordsTask,
        "synthesis":  SynthesisTask,
        "insertChar":  InsertCharTask,
        "history":  HistoryTask,
        "diapason":  DiapasonTask,
        "capital":  CapitalTask,
        "rainbow":  RainbowTask,
        "legs":  LegsTask,
        "order":  OrderTask,
        "commonWord":  CommonWordTask,
        "sentence":  SentenceTask,
        "jsQuiz":  JsQuizTask,
        "days":  DaysTask,
    }
    if(type){
        task = taskList[type];
    } else{
        task = sample(taskList);
    }
    
    return new task();
}



export function getAvaliableTasksNames(){
    // return map(tD, (v, k) => {return k} );
}