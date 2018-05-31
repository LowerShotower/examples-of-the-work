import {}  from "./lodash.js";
import {}  from "./Chart.bundle.js";
const {map} = _;
(function () {//
    
    let users,
        sessions,
        currSession = 0,
        scoreboard = document.querySelector(".scoreboard"),
        thead = scoreboard.getElementsByTagName("thead")[0],
        tbody = scoreboard.getElementsByTagName("tbody")[0],
        sessionSelectionBlock = document.querySelector(".session-selection-block");
        

    var p1 = fetch('js/users.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(arr) {
        users = arr;
    })
    .catch( alert );

    var p2 = fetch('js/sessions.json')
    .then(function(response) {
        return response.json(); 
    })
    .then(function(arr) {
        sessions = arr;
    })
    .catch( alert );


    function fillTHeader (thead, session) {
        let headerNamesArr = [];

        for (let i = 0; i < session["puzzles"].length; i++) {
            headerNamesArr.push(session["puzzles"][i]["name"]);
        }
        let counter = 0;
        _.map(thead.firstChild.children,(n,i)=>{
            switch (i) {
                case 0:
                    n.innerHTML = "DisplayName Участника";
                    break;
                case headerNamesArr.length+1: n.innerHTML = "Общее время";
                    break;
                case headerNamesArr.length+2: n.innerHTML = "Comparison";
                    break;
                default: n.innerHTML = headerNamesArr[counter++];
                    break;
            }
        });
    }

    function composeRow(session, users, index) {
        let rowArr = [];
        rowArr.push([users[index]["displayName"]]);
        for (let i = 0; i < session["puzzles"].length; i++) {
            if (session["rounds"][i]["solutions"][ users[index]["uid"] ] == undefined) {
                rowArr.push(["150"]);
            } else{
                rowArr.push([session["rounds"][i]["solutions"][ users[index]["uid"] ]["time"]["$numberLong"],
                            session["rounds"][i]["solutions"][ users[index]["uid"] ]["code"]]);
            }
        }
        rowArr.push([rowArr.slice(1).reduce( (sum, curr) =>  +sum + +curr[0], 0 )]);
        
        return rowArr;
    }

    function createTHeader (table, cols, session) {
        let thead = document.createElement("thead");
        thead.appendChild(document.createElement("tr"));
        for (let i = 0; i < cols; i++) {
            let th = document.createElement("th");
            th.scope = "cols";
            thead.children[0].appendChild(th);
        }
        fillTHeader(thead, session);
        table.appendChild(thead);
    }

    function createTBody (table, cols, rows, session, users) {
        let tbody = document.createElement("tbody");
        for (let j = 0; j < rows; j++) {
            tbody.appendChild(document.createElement("tr"));
            let currRow = composeRow(session, users, j);
            for (let i = 0; i < cols; i++) {
                let td = document.createElement("td");
                if ( currRow[i] != undefined ) { 
                    td.innerHTML = currRow[i][0];
                    let span = document.createElement("span");
                    if ( currRow[i][1] != undefined ) { 
                        span.textContent = currRow[i][1]; 
                    }
                    else { span.textContent = "no solution"; }
                    if ( i!=0 && i!=cols-1 ) { 
                        span.classList.add("tooltiptext");
                        td.appendChild(span);
                    } 
                } else if(currRow[i] == undefined) {
                    let  input = document.createElement('input');
                    input.type = 'checkbox';
                    input.name = 'user';
                    input.value = currRow[0][0];
                    td.appendChild(input);
                }

                tbody.children[j].appendChild(td);
            }
        }
        table.appendChild(tbody);
    }

    function loadSession (session, users){
        let colsNumber = 1 + session["puzzles"].length + 2,
        rowsNumber = users.length;
        createTHeader(scoreboard, colsNumber, session);
        createTBody(scoreboard,colsNumber, rowsNumber, session, users);
    }

    function resetTable(table) {
        table.innerHTML ="";
    }

    sessionSelectionBlock.addEventListener("click", (e) => {
        if (e.target.name == "session") {
            
            switch (e.target.value) {
                case "rsschool":
                    currSession =  0;
                    break;
                case "rsschool-demo":
                    currSession = 1;
                    break;
            }
            resetTable(scoreboard);
            loadSession(sessions[currSession], users);
        }
    });

    Promise.all([p1,p2]).then(values => {///
        sessionSelectionBlock.querySelector('input[value="rsschool"]').checked = true;
        loadSession(sessions[currSession], users);

        let tenUsers = [];
        
        scoreboard.addEventListener('click', e => {
            if (e.target.name == 'user') {
                if(tenUsers.length < 10) {
                tenUsers.length = 0;
                for (let k = 0; k < users.length; k++) {
                    if (scoreboard.querySelectorAll('input[name="user"]')[k].checked == true) {
                        tenUsers.push(composeRow(sessions[currSession],users,k));
                    }
                }
                
                } else { 
                    if(e.target.checked == true) {
                        e.target.checked = false;
                    } else if(e.target.checked == false) {
                        tenUsers.length = tenUsers.length-1;
                    }
                }
            }

            let datasets = _.map(tenUsers,setLineObj);
        
            var ctx = document.getElementById("chartjs-0");
            var myLineChart = new Chart(ctx, {
                "type":"line",
                "data":{
                    "labels": map(sessions[currSession]["puzzles"], "name"),
                    "datasets":datasets
                },
                "options":{}
            });

        });


        function setLineObj (user) {
            return {
                "label":user[0][0],
                "data":_(user).slice(1,10).map(n=>n[0]).value(),
                "fill":false,
                "borderColor":"rgb(" + _.random(0,244)+"," + _.random(0,244)+"," + _.random(0,244)+")",
                "lineTension":0.1
            };
        };
        

    });///
})();//