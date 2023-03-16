import {editPost} from './methods.js';
import {createPost} from './methods.js';
import {modifyPost} from './methods.js';
import {blogPost} from './methods.js';
import {toLocalStorage} from './methods.js';
import {fromLocalStorage} from './methods.js';

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
        const newPost = createPost(blogTitle.value,day.value,sum.value);
        modifyPost(postMenu,newPost,blogTitle.value);
        document.body.insertBefore(newPost,addPostBtn);
        postMenu.close();
    }
}

fromLocalStorage(postMenu,addPostBtn);