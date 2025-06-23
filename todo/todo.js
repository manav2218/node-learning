const fs = require('fs');
const filepath = "./tasks.json";

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        const dataJSON =  dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveTask = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filepath, dataJSON);
}

const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({task});//can pass task as a normal string as well instead of object
    saveTask(tasks);
    console.log("Task added", task);
}

const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach((task, index) => {
        console.log(`${index+1} -> ${task.task}`)
    })
}

const removeTask = (taskNumber) => {
    taskNumber = taskNumber - 1;//to make it according to index
    const tasks = loadTasks();
    const updatedTasks = tasks.filter((task, index) => index !== taskNumber);
    console.log(updatedTasks);
}

const command = process.argv[2]
const argument = process.argv[3]



if(command === "add"){
    addTask(argument);
}
else if(command === "list"){
    listTasks();
}
else if(command === "remove"){
    removeTask(parseInt(argument));
}
else{
    console.log("Command not found");
}

