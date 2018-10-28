document.getElementById('issue-form').addEventListener('submit', saveIssue);

function saveIssue(e) {

    var issueId = chance.guid();
    var issueDesc = document.getElementById('issue-description').value;
    var issueSeverity = document.getElementById('issue-severity').value;
    var issueAssigned = document.getElementById('issue-assigned').value;
    var issueStatus = 'Open';
    
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssigned,
        status: issueStatus
    };

    if(localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    else{
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    // reset form 
    document.getElementById('issue-form').reset();

    fetchIssues();
    e.preventDefault();
}

function setStatusClose(id) {

    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i=0; i<issues.length; i++){
        if(issues[i].id == id){
            issues[i].status = 'Close';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {

    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i=0; i<issues.length; i++){
        if(issues[i].id == id){
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}


function fetchIssues() {
     var issues = JSON.parse(localStorage.getItem('issues'));
     var issuesList = document.getElementById('issue-list');
     issuesList.innerHTML = '';

    for(var i=0; i<issues.length; i++){
         var id = issues[i].id;
         var desc = issues[i].description;
         var severity = issues[i].severity;
         var assignedTo = issues[i].assignedTo;
         var status = issues[i].status;

         issuesList.innerHTML += 

            `<div class="well">
            <p>Issue Id: ${ id }</p>
            <p><span class="label label-info">${ status }</span></p>
            <h4>${ desc }</h4>
            <p><span class="glyphicon glyphicon-time"></span>&nbsp; ${ severity }</p>
            <p><span class="glyphicon glyphicon-user"></span>&nbsp; ${ assignedTo }</p>
            <a href="#" class="btn btn-warning" onclick="setStatusClose('${ id }')">Close</a>
            <a href="#" class="btn btn-danger" onclick="deleteIssue('${ id }')">Delete</a>
            </div>`;
    }    
}
