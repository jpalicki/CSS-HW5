const blogs = [];

//Turn our blog post into an object for array storage
export function blogPost(myTitle, myDay, mySum) {
    this.myTitle = myTitle;
    this.myDay = myDay;
    this.mySum = mySum;
 }

 export function findTitle(title){
    for(var i = 0; i < blogs.length-1; i++) {
        if(blogs[i].myTitle === title)
        {
            return i;
        }
    }
    return -1;
}

export function removeAllChildNodes(parent) {
    for(var j = 0; j < 3; j++) {
        parent.removeChild(parent.firstChild);
    }
}

export function styledCreatePost(title,day,sum) {
    //Create a blog post and assign its entries based on the entered text.
    let postContent = document.createElement("div");

    //Create containers for each individual input, append the inputted text to each container.
    let titleContainer = document.createElement("p");
    titleContainer.setAttribute("type","date");
    let myTitle = document.createTextNode(title);
    titleContainer.appendChild(myTitle);

    let dayContainer = document.createElement("p");
    let dateToText = document.createTextNode(day);
    dayContainer.appendChild(dateToText);

    let sumContainer = document.createElement("p");
    let mySum = document.createTextNode(sum);
    sumContainer.appendChild(mySum);
    
    //Consolidate the individual containers into one.
    postContent.appendChild(titleContainer);
    postContent.appendChild(dayContainer);
    postContent.appendChild(sumContainer);

    // Create element in array for local storage.
    const myPostObj = new blogPost(title,day,sum);
    blogs.push(myPostObj);
    toLocalStorage();

    return postContent;

}

export function styledEditPost(myPost,title,day,sum) {
    // Replace the values of the old blog post on HTML
    //let newContent = document.createElement("div");
    removeAllChildNodes(myPost);

    // Replace the container for title, add the input
    let replaceTitleContainer = document.createElement("p");
    let replaceSTitle = document.createTextNode(title);
    replaceTitleContainer.appendChild(replaceSTitle);

    // Replace the container for date, add the input
    let replaceDayContainer = document.createElement("p");
    let dateToText = document.createTextNode(day);
    replaceDayContainer.appendChild(dateToText);


    // Replace the container for summary, add the input
    let replaceSumContainer = document.createElement("p");
    let replaceSSum = document.createTextNode(sum);
    replaceSumContainer.appendChild(replaceSSum);
    
    //newContent.appendChild(replaceTitleContainer);
    //newContent.appendChild(replaceDayContainer);
    //newContent.appendChild(replaceSumContainer);

    myPost.prepend(replaceSumContainer);
    myPost.prepend(replaceDayContainer);
    myPost.prepend(replaceTitleContainer);
}

// Adds the edit and delete buttons to each individal post.
export function modifyPost(postMenu,myPost,title) {
    // Create edit button functionality
    let editMe = document.createElement("button");
    //editMe.innerHTML = 'Edit';
    editMe.onclick = function () {
        //Re-open textboxes for editing
        postMenu.showModal();
        let newBlogTitle = document.getElementById('blogTitle');
        let newDay = document.getElementById('day');
        let newSum = document.getElementById('sum');
        cancel.addEventListener('click', () => {
            postMenu.close();
        });
        save.onclick = function() {
            styledEditPost(myPost,newBlogTitle.value,newDay.value,newSum.value);
            // Replace the values of the old blog post in array storage
            let replacePost = new blogPost(newBlogTitle.value,newDay.value,newSum.value);
            var replaceInd = findTitle(title); 
            blogs.splice(replaceInd,1,replacePost);
            toLocalStorage();
        }
    }
    editMe.style.cssText = 'border: none; background-color:white;';
    let editImg = document.createElement("img");
    editImg.setAttribute('src','Edit.png');
    editImg.setAttribute('alt','Trash');
    editImg.setAttribute('height', '30px');
    editImg.setAttribute('width', '30px');
    editMe.appendChild(editImg);

    // Create delete button functionality 
    let deleteMe = document.createElement("button");
    //deleteMe.innerHTML = 'Delete';
    deleteMe.onclick = function() {
        myPost.remove();
        let removeInd = findTitle(title);
        blogs.splice(removeInd,1);
        toLocalStorage();
    }
    deleteMe.style.cssText = 'border: none; background-color:white;';
    let deleteImg = document.createElement("img");
    deleteImg.setAttribute('src','Trash.png');
    deleteImg.setAttribute('alt','Trash');
    deleteImg.setAttribute('height', '30px');
    deleteImg.setAttribute('width', '30px');
    deleteMe.appendChild(deleteImg);
    // Add buttons to the post for editing
    let spacer = document.createElement('br');
    myPost.appendChild(editMe);
    myPost.appendChild(deleteMe);
    myPost.appendChild(spacer);
}

export function toLocalStorage() {
    localStorage.setItem('blogs',JSON.stringify(blogs));

}

export function fromLocalStorage(postMenu,addPostBtn) {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs'));
    for(var i = 0; i < storedBlogs.length; i++) {
        let storedPost = new blogPost(storedBlogs[i].myTitle,storedBlogs[i].myDay,storedBlogs[i].mySum);
        let htmlOutline = styledCreatePost(storedPost.myTitle,storedPost.myDay,storedPost.mySum);
        modifyPost(postMenu,htmlOutline,storedPost.myTitle); //Second parameter MUST be myPost, which refers to the paragraph element we created
        document.body.insertBefore(htmlOutline,addPostBtn);
    }
}