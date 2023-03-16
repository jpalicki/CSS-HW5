let result = document.getElementById('response');
let postBtn = document.getElementById('postBtn');
let getBtn = document.getElementById('getBtn');
let putBtn = document.getElementById('putBtn');
let deleteBtn = document.getElementById('deleteBtn');

let record = document.getElementById('id');
let title = document.getElementById('article_name');
let body = document.getElementById('article_body');

const httpRequest = new XMLHttpRequest();

//Removal function for our output tag because we are using a list
function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Format our response text to be visually pleasing
function format(responseToObject) {
    for(const property in responseToObject) {
        const propertyName = document.createElement("li");
        propertyName.innerHTML = `${property}`;
        const propertyValue = document.createElement("ul");

        //If the current property is headers, format it to be readable, otherwise ignore
        const valueToStr = JSON.stringify(responseToObject[property]);
        if(property === "headers") {
            const splitHeaders = splitter(valueToStr);
            let headerStr = "";
            for(var i = 0; i < splitHeaders.length; i++) {
                headerStr += splitHeaders[i];
                if(i != splitHeaders.length-1) {
                    headerStr += "\n";
                }
            }
            propertyValue.innerText = headerStr;
        } else {
            propertyValue.innerHTML = valueToStr;
        }
        propertyName.appendChild(propertyValue);
        result.appendChild(propertyName);
    }
}

//Split string based on commas
function splitter(propertyValueStr) {
    const words = propertyValueStr.split('\",\"');
    return words;
}


//POST Method
postBtn.addEventListener("click", function() {
    //Add input if none was given.
    if(!record.value) {
        record.value = '0';
    }
    if(!title.value) {
        title.value = 'No Title Provided';
    }if(!body.value) {
        body.value = 'No Body Provided';
    }
    removeChildren(result);
    const today = new Date().toDateString();
    const myPost = {Record: record.value, Title: title.value, Body: body.value, date: today};
    let strSend = JSON.stringify(myPost);

    const httpPost = new XMLHttpRequest();
    httpPost.open('POST','https://httpbin.org/post');
    httpPost.setRequestHeader('Content-Type','application/json');
    httpPost.onreadystatechange = function() {
        if(this.readyState === XMLHttpRequest.DONE) {
            if(httpPost.status === 200) {
                const responseToObject = JSON.parse(httpPost.responseText,"{}");
                format(responseToObject);
            } else {
                console.log('Error ' + httpPost.status);
            }
        }
    }
    httpPost.send(strSend);
});

//GET Method
httpRequest.open('GET','https://httpbin.org/get');
getBtn.onclick = function() {
    //Clear input
    record.value = "";
    title.value = "";
    body.value = "";
    removeChildren(result);
    const responseToObject = JSON.parse(httpRequest.responseText,"{}");
    format(responseToObject);
}

httpRequest.send();

//PUT Method
putBtn.addEventListener("click", function() {
    //Add input if none was given.
    if(!record.value) {
        record.value = '0';
    }
    if(!title.value) {
        title.value = 'No Title Provided';
    }if(!body.value) {
        body.value = 'No Body Provided';
    }
    removeChildren(result);

    const today = new Date().toDateString();
    const myPost = {Record: record.value, Title: title.value, Body: body.value, date: today};
    let strUpdated = JSON.stringify(myPost);

    const httpPut = new XMLHttpRequest();
    httpPut.open('PUT','https://httpbin.org/put');
    httpPut.setRequestHeader('Content-Type','application/json');
    httpPut.onreadystatechange = function() {
        if(this.readyState === XMLHttpRequest.DONE) {
            if(httpPut.status === 200) {
                //result.innerText = httpPut.responseText;
                const responseToObject = JSON.parse(httpPut.responseText,"{}");
                format(responseToObject);
            } else {
                console.log('Error ' + httpPut.status);
            }
        }
    }
    httpPut.send(strUpdated);
});

//Delete method
const httpDelete = new XMLHttpRequest();
httpDelete.open('DELETE','https://httpbin.org/delete');
deleteBtn.onclick = function() {
    //Clear input
    record.value = "";
    title.value = "";
    body.value = "";
    removeChildren(result);
    const responseToObject = JSON.parse(httpDelete.responseText,"{}");
    format(responseToObject);
} 
httpDelete.send();

