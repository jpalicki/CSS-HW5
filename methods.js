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

export function createPost(title,day,sum) {
    //Create a blog post and assign its entries based on the entered text.
    let myPost = document.createElement("p");
    let postContent = document.createElement("div");
    let myTitle = document.createTextNode(title);
    let gap1 = document.createTextNode("     ");
    let myDay = document.createTextNode(day);
    let gap2 = document.createTextNode("     ");
    let mySum = document.createTextNode(sum);
    
    postContent.appendChild(myTitle);
    postContent.appendChild(gap1);
    postContent.appendChild(myDay);
    postContent.appendChild(gap2);
    postContent.appendChild(mySum);
    myPost.appendChild(postContent);

    // Create element in array for local storage.
    const myPostObj = new blogPost(title,day,sum);
    blogs.push(myPostObj);
    toLocalStorage();

    return myPost;

}

export function editPost(myPost,title,day,sum) {
    // Replace the values of the old blog post on HTML
    let newContent = document.createElement("div");
    let replaceTitle = document.createTextNode(title);
    let gap1 = document.createTextNode("     ");
    let replaceDay = document.createTextNode(day);
    let gap2 = document.createTextNode("     ");
    let replaceSum = document.createTextNode(sum);
    newContent.appendChild(replaceTitle);
    newContent.appendChild(gap1);
    newContent.appendChild(replaceDay);
    newContent.appendChild(gap2);
    newContent.appendChild(replaceSum);
    myPost.replaceChild(newContent, myPost.firstElementChild);
}

// Adds the edit and delete buttons to each individal post.
export function modifyPost(postMenu,myPost,title) {
    // Create edit button functionality
    let editMe = document.createElement("button");
    editMe.innerHTML = 'Edit';
    editMe.onclick = function () {
        //Re-open textboxes for editing
        postMenu.showModal();
        let newBlogTitle = document.getElementById('blogTitle');
        let gap1 = document.createTextNode("     ");
        let newDay = document.getElementById('day');
        let gap2 = document.createTextNode("     ");
        let newSum = document.getElementById('sum');
        cancel.addEventListener('click', () => {
            postMenu.close();
        });
        save.onclick = function() {
            editPost(myPost,newBlogTitle.value,newDay.value,newSum.value);
            // Replace the values of the old blog post in array storage
            let replacePost = new blogPost(newBlogTitle.value,newDay.value,newSum.value);
            var replaceInd = findTitle(title); 
            blogs.splice(replaceInd,1,replacePost);
            toLocalStorage();
        }
    }
    // Create delete button functionality 
    let deleteMe = document.createElement("button");
    deleteMe.innerHTML = 'Delete';
    deleteMe.onclick = function() {
        myPost.remove();
        let removeInd = findTitle(title);
        blogs.splice(removeInd,1);
        toLocalStorage();
    }
    // Add buttons to the post for editing
    myPost.appendChild(editMe);
    myPost.appendChild(deleteMe);
}

export function toLocalStorage() {
    localStorage.setItem('blogs',JSON.stringify(blogs));

}

export function fromLocalStorage(postMenu,addPostBtn) {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs'));
    for(var i = 0; i < storedBlogs.length; i++) {
        let storedPost = new blogPost(storedBlogs[i].myTitle,storedBlogs[i].myDay,storedBlogs[i].mySum);
        let htmlOutline = createPost(storedPost.myTitle,storedPost.myDay,storedPost.mySum);
        modifyPost(postMenu,htmlOutline,storedPost.myTitle); //Second parameter MUST be myPost, which refers to the paragraph element we created
        document.body.insertBefore(htmlOutline,addPostBtn);
    }
}