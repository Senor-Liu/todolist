'use strict'; 

//初始化localStorage
if(!localStorage.getItem('mytodo')){
    localStorage.setItem('mytodo', JSON.stringify([]));
}
//用一个数组存放localStorage中所有数据
var localArr = JSON.parse(localStorage.getItem('mytodo'));

//页面启动后读取localStorage的数据并显示到页面上
function onload(){
    for (let i = 0; i < JSON.parse(localStorage.getItem('mytodo')).length; i++){
        if(JSON.parse(localStorage.getItem('mytodo'))[i].done === false){
            showItem(JSON.parse(localStorage.getItem('mytodo'))[i].text,false,JSON.parse(localStorage.getItem('mytodo'))[i].date);
        }else{
            showItem(JSON.parse(localStorage.getItem('mytodo'))[i].text,true,JSON.parse(localStorage.getItem('mytodo'))[i].date);
        }
    }
}

//传入item名称和完成状态添加一个DOM
function showItem(item,done,date){
    if (done === false){
        //要添加节点的父节点tbody
        var tbody = document.getElementById('todo_list_body');
    }else{
        var tbody = document.getElementById('done_list_body');
    }
    //创建tr节点
    let tr = document.createElement("tr");
    tr.id = date;

    //创建td节点
    let td = document.createElement("td");
    //添加一个文本框节点
    let newText = document.createElement("input");
    newText.value = item;
    newText.type = "text";
    newText.className = "items_input";
    //添加一个按钮
    let btn_done = document.createElement("input");
    btn_done.type = 'button';
    btn_done.value = "完成";
    btn_done.id = date - 1;
    btn_done.class = date;
    btn_done.className = "items_done";
    //完成按钮onclick事件函数
    btn_done.onclick = function doneItem(){
        for(let i = 0; i < localArr.length; i++){
            if(localArr[i].date === this.class){
                //在localStorage中将完成状态改为true
                localArr[i].done = true;
                localStorage.setItem('mytodo', JSON.stringify(localArr));
                //删除此Item的'完成'按钮
                let thisDoneBtn = document.getElementById(this.class - 1);
                let thisDoneBtnParent = thisDoneBtn.parentElement;
                thisDoneBtnParent.removeChild(thisDoneBtn);
                //将完成的Item在页面中移动到done_list_body
                let child = document.getElementById(this.class);
                let parent = document.getElementById('done_list_body');
                parent.appendChild(child);
                return;
            }
        }
    }
    
    let btn_del = document.createElement("input");
    btn_del.type = 'button';
    btn_del.value = "删除";
    btn_del.class = date;
    btn_del.id = "items_del";
    //删除按钮onclick事件函数
    btn_del.onclick = function delItem(){
        for(let i = 0; i < JSON.parse(localStorage.getItem('mytodo')).length; i++){
            if(JSON.parse(localStorage.getItem('mytodo'))[i].date === this.class){
                localArr.splice(i, 1);
                localStorage.setItem('mytodo', JSON.stringify(localArr));
                //获取要删除的节点和父节点
                let delId = document.getElementById(this.class);
                let parent = delId.parentElement;
                parent.removeChild(delId);
                return;
            }
        }
    }

    //把3个节点添加到td当中
    td.appendChild(newText);
    if(done === false){
        td.appendChild(btn_done);
    }
    td.appendChild(btn_del);
    //把td添加到tr中
    tr.appendChild(td);
    //把tr添加到td中
    tbody.appendChild(tr);
}

//点击添加按钮后执行
function addtodo(){
    var item = document.getElementById('addTodo_item');
    if(item.value.length === 0){
        alert("请输入内容");
        return;
    }
    localArr.push({text:item.value, done:false, date: new Date().getTime()});
    localStorage.setItem('mytodo', JSON.stringify(localArr));
    //console.log(localStorage.getItem('mytodo'));
    showItem(item.value,false,localArr[localArr.length-1].date);
    item.value = '';
}