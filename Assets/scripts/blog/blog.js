const BP_MAIN_DIALOG_SELECTOR = 'main dialog';
const TEMPLATE_SELECTOR = '#dialogRep';
const BLOG_POST_CONT_SELECTOR = 'main > blog-post-cont';
const BLOG_POST_TEMPLATE_SELECTOR = 'blog-post';
const ADD_BTN_SELECTOR = 'button#addPost';

//get next nthBlogPost num
export function getNextNthBlogPostNum(blogPostContSelector=BLOG_POST_CONT_SELECTOR) {
  let blogPostContEl = document.querySelector(blogPostContSelector);
  blogPostContEl.dataset.numPosts = parseInt(blogPostContEl.dataset.numPosts) + 1;
  let nextInc = parseInt(blogPostContEl.dataset.numPosts); //nthBlogPost
  return nextInc;
}

export function remDialogIfPresent(bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR) {
  let dialogElRemoved = false;
  //remove dialog element if present
  let dialogEl = document.querySelector(bpMainDialogSelector);
  console.log('In remDialogIfPresent, bpMainDialogSelector: ', bpMainDialogSelector);
  console.log('In remDialogIfPresent, dialogEl: ', dialogEl);
  console.log('In remDialogIfPresent, bpContEl: ', document.querySelector(BLOG_POST_CONT_SELECTOR));
  let mainEl = document.querySelector('main');
  if(dialogEl) {
    mainEl.removeChild(dialogEl);
    dialogElRemoved = true;
  }
  console.log('In remDialogIfPresent after rem, dialogEl: ', dialogEl);
  console.log('In remDialogIfPresent after rem, bpContEl: ', document.querySelector(BLOG_POST_CONT_SELECTOR));
  return dialogElRemoved;
}

export function dispDialogErrMsg(
  errorMsg, 
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR, 
  dialogOutputElSelector='output#dialogRes') 
{
  let dialogEl = document.querySelector(bpMainDialogSelector);
  let dialogOutputEl = dialogEl.querySelector(dialogOutputElSelector);
  dialogOutputEl.innerHTML = errorMsg;
  dialogOutputEl.hidden = false;
}

export function setPostFields(bpEl, postTitle, postDate, postSummary) {
  let bpTitleEl = bpEl.querySelector('output.outPostTitle');
  bpTitleEl.innerHTML = postTitle;
  let bpDateEl = bpEl.querySelector('output.outPostDate');
  bpDateEl.innerHTML = postDate;
  let bpSummaryEl = bpEl.querySelector('output.outPostSummary');
  bpSummaryEl.innerHTML = postSummary;
}

//gets new blog post element (clone) from template element
export function getNewBlogPost(
  nthBlogPost, 
  templateSelector=TEMPLATE_SELECTOR, 
  blogPostTemplateSelector=BLOG_POST_TEMPLATE_SELECTOR) 
{
  //template content
  let templateCont = document.querySelector(templateSelector).content;
  console.log("getNewBlogPost templateCont: ", templateCont);
  console.log("getNewBlogPost bp el to clone: ", templateCont.querySelector(blogPostTemplateSelector));
  //next/new blog post element
  let nextBlogEl = templateCont.querySelector(blogPostTemplateSelector).cloneNode(true);
  nextBlogEl.dataset.nthPost = nthBlogPost;
  return nextBlogEl;
}

//gets new dialog element (clone) from template element
export function getNewDialog(templateSelector=TEMPLATE_SELECTOR) {
  let templateContEl = document.querySelector(templateSelector).content;
  let dialogEl = templateContEl.querySelector('dialog').cloneNode(true);
  return dialogEl;
}

export function setDialogFieldsFromPost(dialogEl, bpEl, 
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR) {
  let bpTitleEl = bpEl.querySelector('output.outPostTitle');
  let bpDateEl = bpEl.querySelector('output.outPostDate');
  let bpSummaryEl = bpEl.querySelector('output.outPostSummary');
  let bpTitle = bpTitleEl.innerHTML;
  let bpDate = bpDateEl.innerHTML;
  let bpSummary = bpSummaryEl.innerHTML;
  console.log('dialogEl in setDialogFieldsFromPost: ', dialogEl);
  let dialogTitleEl = dialogEl.querySelector('input#postTitle');
  let dialogDateEl = dialogEl.querySelector('input#postDate');
  let dialogSummaryEl = dialogEl.querySelector('textarea#postSummary');
  console.log('In setDialogFieldsFromPost: ');
  console.log(' dialogTitleEl: ', dialogTitleEl);
  console.log(' dialogDateEl: ', dialogDateEl);
  console.log(' dialogSummaryEl: ', dialogSummaryEl);
  dialogTitleEl.setAttribute('value', bpTitle);
  dialogDateEl.setAttribute('value', bpDate);
  dialogSummaryEl.setAttribute('value', bpSummary);
}

export function getDialogFieldVals(dialogEl, bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR) {
  console.log("dialogEl in getDialogFieldVals: ", dialogEl);
  console.log("dialogEl in main: ", document.querySelector(bpMainDialogSelector));
  let dialogTitleEl = dialogEl.querySelector(`${bpMainDialogSelector} input#postTitle`);
  let dialogDateEl = dialogEl.querySelector(`${bpMainDialogSelector} input#postDate`);
  let dialogSummaryEl = dialogEl.querySelector(`${bpMainDialogSelector} textarea#postSummary`);
  console.log("dialog field els: ", [dialogTitleEl, dialogDateEl, dialogSummaryEl]);
  return [dialogTitleEl.value, dialogDateEl.value, dialogSummaryEl.value];
}

//modifyBlogPostFunc is either addBlogPost or editBlogPost
export function addDialogOkCancBtnHandlers(
  dialogEl, 
  mainEl, 
  nthBlogPost, 
  errMsg,
  modifyBlogPostFunc, 
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) {
  //add event listeners to dialogue element for this current blog post
  let dialogCancEl = dialogEl.querySelector('#postCancel');
  let dialogOkEl = dialogEl.querySelector('#postOk');
  dialogCancEl.addEventListener('click', (event) => {
    //remove this dialog element
    mainEl.removeChild(dialogEl);
  });
  dialogOkEl.addEventListener('click', (event) => {
    console.log('In addDialogOkCancBtnHandlers dialogOk click event handler, blogPostContEl: ', document.querySelector(blogPostContSelector));
    //get input field values and set those of blog post to it
    let[bpTitle, bpDate, bpSummary] = getDialogFieldVals(dialogEl);
    console.log('In addDialogOkCancBtnHandlers dialogOk click event handler after getDialogFieldVals, blogPostContEl: ', document.querySelector(blogPostContSelector));

    //only edit blog post if all entries are non-empty
    if(bpTitle && bpDate && bpSummary) {
      modifyBlogPostFunc(nthBlogPost, bpTitle, bpDate, bpSummary, blogPostContSelector);
      //remove this dialog element
      mainEl.removeChild(dialogEl);
    }
    //else display error message in dialogue box that not all fields are entered
    else {
      dispDialogErrMsg(errMsg);
      //dialogue box not removed from main and so remains visible
    }
  });
}

export function addBlogPostButtonEventHandlers(
  nthBlogPost, 
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR,
  templateSelector=TEMPLATE_SELECTOR, 
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  console.log('In addBlogPostButtonEventHandlers, bpMainDialogSelector: ', bpMainDialogSelector);
  let blogPostContEl = document.querySelector(blogPostContSelector);
  console.log('In addBlogPostButtonEventHandlers: blogPostContEl: ', blogPostContEl);
  let mainEl = document.querySelector('main');
  let bpEl = blogPostContEl.querySelector(`blog-post[data-nth-post='${nthBlogPost}']`);
  console.log('bpEl in addBlogPostButtonEventHandlers: ', bpEl);
  let editBtnEl = bpEl.querySelector('.editPost');
  let delBtnEl = bpEl.querySelector('.delPost');
  editBtnEl.addEventListener('click', (event) => {
    console.log('In editBtnEl click event handler: blogPostContEl: ', document.querySelector(blogPostContSelector));
    //remove dialog box if present
    remDialogIfPresent(bpMainDialogSelector);
    console.log('In editBtnEl click event handler after remDialogIfPresent: blogPostContEl: ', document.querySelector(blogPostContSelector));
    //get dialog box from template
    let dialogEl = getNewDialog(templateSelector);
    //populate dialog box fields from blog post element
    setDialogFieldsFromPost(dialogEl, bpEl);
    //display dialog box
    mainEl.appendChild(dialogEl);
    console.log('In editBtnEl click event handler, just before addDialogOkCancBtnHandlers.');
    //add event listeners to dialogue element for this current blog post
    let errMsg = "Error: please fill in all input fields before submitting this edited blog post.";
    addDialogOkCancBtnHandlers(dialogEl, mainEl, nthBlogPost, errMsg, editBlogPost, blogPostContSelector);
  });
  delBtnEl.addEventListener('click', (event) => {
    delBlogPost(nthBlogPost);
  });
}

export function addBlogPost(nextInc, postTitle, postDate, postSummary, 
  blogPostContSelector=BLOG_POST_CONT_SELECTOR,
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR,
  templateSelector=TEMPLATE_SELECTOR, 
  blogPostTemplateSelector=BLOG_POST_TEMPLATE_SELECTOR) 
{
  console.log("In addBlogPost, bpMainDialogSelector: ", bpMainDialogSelector);
  //blog post container
  let blogPostContEl = document.querySelector(blogPostContSelector);
  
  //next/new blog post element
  let nextBlogEl = getNewBlogPost(nextInc, templateSelector, blogPostTemplateSelector);
  //add "fields" for blog post
  setPostFields(nextBlogEl, postTitle, postDate, postSummary);
  console.log("post to create: ", nextBlogEl);
  //add blog post to page
  blogPostContEl.appendChild(nextBlogEl);
  //add event handlers for "Edit" and "Delete" buttons for blog post
  addBlogPostButtonEventHandlers(nextInc, bpMainDialogSelector, 
    templateSelector, blogPostContSelector);
}

export function delBlogPost(
  nthBlogPost, 
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  //blog post container
  let blogPostContEl = document.querySelector(blogPostContSelector);
  blogPostContEl.dataset.numPosts = parseInt(blogPostContEl.dataset.numPosts) - 1;
  //decrement blog post number of each blog post after this one
  let blogPosts = blogPostContEl.children;
  for(let i = 0; i < blogPosts.length; i++) {
    if(blogPosts[i].dataset.nthPost > parseInt(nthBlogPost)) {
      blogPosts[i].dataset.nthPost -= 1;
    }
  }
  //remove blog post from container
  let blogPostEl = blogPostContEl.querySelector(`blog-post[data-nth-post='${nthBlogPost}']`);
  blogPostContEl.removeChild(blogPostEl);
}

export function editBlogPost(
  nthBlogPost, 
  postTitle, 
  postDate, 
  postSummary,
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  //blog post container
  console.log('editBlogPost blogPostContSelector: ', blogPostContSelector);
  let blogPostContEl = document.querySelector(blogPostContSelector);
  console.log('editBlogPost blogPostContEl: ', blogPostContEl);
  //edit nth blog post
  let bpEl = blogPostContEl.querySelector(`blog-post[data-nth-post='${nthBlogPost}']`);
  //edit "fields" for blog post
  setPostFields(bpEl, postTitle, postDate, postSummary);
}

export function addBtnBlogPostEventHandler(
  addBtnSelector=ADD_BTN_SELECTOR,
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR, 
  templateSelector=TEMPLATE_SELECTOR, 
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  let addBtnEl = document.querySelector(addBtnSelector);
  let mainEl = document.querySelector('main');
  addBtnEl.addEventListener('click', (event) => {
    //remove dialog box if present
    remDialogIfPresent(bpMainDialogSelector);
    //clone dialog from template
    let dialogEl = getNewDialog(templateSelector);
    console.log("dialogEl: ", dialogEl);
    console.log("mainEl: ", mainEl);
    //display dialog box
    mainEl.appendChild(dialogEl);
    //add event listeners to dialogue element for this current blog post
    let errMsg = "Error: please fill in all input fields before submitting this new blog post.";
    let nthBlogPost = getNextNthBlogPostNum(blogPostContSelector);
    addDialogOkCancBtnHandlers(dialogEl, mainEl, nthBlogPost, errMsg, addBlogPost, blogPostContSelector);
  });
}

export function initBlogPost() {
  //remove dialog box if present
  remDialogIfPresent();
  //add event handler to "Add" button
  addBtnBlogPostEventHandler();
}