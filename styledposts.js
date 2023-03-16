import {styledEditPost} from './styledmethods.js';
import {styledCreatePost} from './styledmethods.js';
import {modifyPost} from './styledmethods.js';
import {blogPost} from './styledmethods.js';
import {toLocalStorage} from './styledmethods.js';
import {fromLocalStorage} from './styledmethods.js';

const addPostBtn = document.getElementById('addPostBtn');
const postMenu = document.getElementById('newPost');
const cancel = document.getElementById('cancel');
const save = document.getElementById('save');

let blogTitle = document.getElementById('blogTitle');
let day = document.getElementById('day');
let sum = document.getElementById('sum');





addPostBtn.addEventListener('click', postFunct);
function postFunct() {
    postMenu.showModal();
    cancel.addEventListener('click', () => {
        postMenu.close();
    });
    save.onclick = function() {
        const newPost = styledCreatePost(blogTitle.value,day.value,sum.value);
        modifyPost(postMenu,newPost,blogTitle.value);
        document.body.insertBefore(newPost,addPostBtn);
        postMenu.close();
    }
}
//defaultPosts(postMenu);
fromLocalStorage(postMenu,addPostBtn);