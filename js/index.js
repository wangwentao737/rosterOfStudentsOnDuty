const students = [{
    swept: 1,
    blackboard: 2,
},{
    swept: 2,
    blackboard: 1,
},{
    swept: 3,
    blackboard: 4,
},{
    swept: 4,
    blackboard: 3,
},
]
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
const jsonData = JSON.parse(data);


const container = document.querySelector('.container'); 
const swept = document.querySelector('.swept');
const blackboard = document.querySelector('.blackboard');
function studentChange(counts) {
    swept.innerHTML = students[counts].swept;
    blackboard.innerHTML = students[counts].blackboard;
}
function changeOutData(data,num) {
    
}
function countChange(num) {
    const maxCount = students.length - 1;
    if (num == 1) {
        if (counts== maxCount) {
            counts = 0;
            changeOutData(counts,2)
        } else {
            counts == counts+1;
            changeOutData(counts,2)
        }
    }
    if (num == 0) {
        if (counts == 0) {
            counts = maxCount;
            changeOutData(counts,2)
        }else {
            counts == counts-1;
            changeOutData(counts,2)
        }
    }
}
function nextGroup() {
    countChange(1)
    studentChange()
}
function backGroup() {
    countChange(0)
    studentChange()
}

swept.innerHTML = jsonData.array[0]
 




