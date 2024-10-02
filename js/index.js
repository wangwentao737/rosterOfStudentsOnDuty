const fs = require('fs');
const path = require('path');
const swept = document.querySelector('.swept');
const blackboard = document.querySelector('.blackboard');

function studentChange(counts) {
    swept.innerHTML = students[counts].swept;
    blackboard.innerHTML = students[counts].blackboard;
}

function getCountNumber() {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);
    return +jsonData.array[2];
}

/**
 * @param num {number} 0为月份 1为日期
 */
function getDataNumber(num) {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);
    if (num == 0) {
        return +jsonData.array[0];
    } else if (num == 1) {
        return +jsonData.array[1];
    } 
}
    
/**
 *@param num {number} 注意0为第一组
*/
function wirteCountNumber(num) {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);
    jsonData.array[2] = num;
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(jsonData));
}

/**
 * @param data {number} 更改的数字 
 * @param num {number} 0为月份 1为日期
*/
function wirteOuterData(datas,num) {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);
    jsonData.array[num] = datas;
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(jsonData));
}

/**
 *@param num {number} 1为进 0为退
*/
function countChange(num) {
    const maxCount = students.length - 1;
    let counts = getCountNumber();
    if (num == 1) {
        if (counts== maxCount) {
            counts = 0;
            wirteCountNumber(counts)
        } else {
            counts = counts + 1;
            wirteCountNumber(counts)
        }
    }
    if (num == 0) {
        if (counts == 0) {
            counts = maxCount;
            wirteCountNumber(counts)
        }else {
            counts = counts - 1;
            wirteCountNumber(counts)
        }
    }
}

function dailyChangeOuterData() {
    const month = new Date().getMonth()+1;
    const day = new Date().getDate();
    if (month !== getDataNumber(0) || day !== getDataNumber(1)) {
        wirteOuterData(month,0);
        wirteOuterData(day,1);
        countChange(1)
        studentChange(getCountNumber())
    } else {
        studentChange(getCountNumber())
    }
}

function nextGroup() {
    countChange(1)
    studentChange(getCountNumber())
}

function backGroup() {
    countChange(0)
    studentChange(getCountNumber())
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight'&& e.ctrlKey) {
        nextGroup()
    }
    if (e.key == 'ArrowLeft' && e.ctrlKey) {
        backGroup()
    }
    
})

window.addEventListener('load', dailyChangeOuterData)



