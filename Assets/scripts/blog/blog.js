const BP_MAIN_DIALOG_SELECTOR = 'main dialog';
const TEMPLATE_SELECTOR = '#dialogRep';
const BLOG_POST_CONT_SELECTOR = 'main > blog-post-cont';
const BLOG_POST_TEMPLATE_SELECTOR = 'blog-post';
const ADD_BTN_SELECTOR = 'button#addPost';

//get next nthBlogPost num
export function getNextNthBlogPostNum(bpContEl) {
  let nextInc = parseInt(bpContEl.dataset.numPosts) + 1;
  return nextInc;
}

export function setNextNthBlogPostNum(nextIncToSetTo, bpContEl) {
  bpContEl.dataset.numPosts = parseInt(nextIncToSetTo);
}

export function remDialogIfPresent(bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR) {
  let dialogElRemoved = false;
  //remove dialog element if present
  let dialogEl = document.querySelector(bpMainDialogSelector);
  let mainEl = document.querySelector('main');
  if(dialogEl) {
    mainEl.removeChild(dialogEl);
    dialogElRemoved = true;
  }
  return dialogElRemoved;
}

export function dispDialogErrMsg(
  errorMsg, 
  dialogEl,
  dialogOutputElSelector='output#dialogRes') 
{
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

export function setDialogFieldsFromPost(dialogEl, bpEl) {
  let bpTitleEl = bpEl.querySelector('output.outPostTitle');
  let bpDateEl = bpEl.querySelector('output.outPostDate');
  let bpSummaryEl = bpEl.querySelector('output.outPostSummary');
  let bpTitle = bpTitleEl.innerHTML;
  let bpDate = bpDateEl.innerHTML;
  let bpSummary = bpSummaryEl.innerHTML;
  let dialogTitleEl = dialogEl.querySelector('input#postTitle');
  let dialogDateEl = dialogEl.querySelector('input#postDate');
  let dialogSummaryEl = dialogEl.querySelector('textarea#postSummary');
  dialogTitleEl.setAttribute('value', bpTitle);
  dialogDateEl.setAttribute('value', bpDate);
  dialogSummaryEl.setAttribute('value', bpSummary);
  dialogSummaryEl.innerHTML = bpSummary; //also set content for textarea
}

export function getDialogFieldVals(dialogEl) {
  let dialogTitleEl = dialogEl.querySelector(`input#postTitle`);
  let dialogDateEl = dialogEl.querySelector(`input#postDate`);
  let dialogSummaryEl = dialogEl.querySelector(`textarea#postSummary`);
  return [dialogTitleEl.value, dialogDateEl.value, dialogSummaryEl.value];
}

//modifyBlogPostFunc is either addBlogPost or editBlogPost
// - use whether bpEl is specified as whether to use addBlogPost (if not) or editBlogPost (if so)
export function addDialogOkCancBtnHandlers(
  dialogEl, 
  mainEl,  
  errMsg,
  modifyBlogPostFunc, 
  bpContEl=undefined,
  bpEl=undefined) {
  //add event listeners to dialogue element for this current blog post
  let dialogCancEl = dialogEl.querySelector('#postCancel');
  let dialogOkEl = dialogEl.querySelector('#postOk');
  dialogCancEl.addEventListener('click', (event) => {
    //remove this dialog element
    mainEl.removeChild(dialogEl);
  });
  dialogOkEl.addEventListener('click', (event) => {
    //get input field values and set those of blog post to it
    let[bpTitle, bpDate, bpSummary] = getDialogFieldVals(dialogEl);

    //only edit blog post if all entries are non-empty
    if(bpTitle && bpDate && bpSummary) {
      if(modifyBlogPostFunc == addBlogPost) {
        //addBlogPost(...)
        modifyBlogPostFunc(bpTitle, bpDate, bpSummary, bpContEl);
      }
      else if(modifyBlogPostFunc == setPostFields) {
        //editBlogPost(...)
        modifyBlogPostFunc(bpEl, bpTitle, bpDate, bpSummary);
      }
      else {
        throw "Modify function not of expected function (addBlogPost or editBlogPost).";
      }
      
      //remove this dialog element
      mainEl.removeChild(dialogEl);
    }
    //else display error message in dialogue box that not all fields are entered
    else {
      dispDialogErrMsg(errMsg, dialogEl);
      //dialogue box not removed from main and so remains visible
    }
  });
}

//add bp event handlers (for "Edit" and "Delete" buttons) 
export function addBlogPostButtonEventHandlers(bpEl, bpContEl) {
  let mainEl = document.querySelector('main');
  let editBtnEl = bpEl.querySelector('.editPost');
  let delBtnEl = bpEl.querySelector('.delPost'); 
  editBtnEl.addEventListener('click', (event) => {
    //remove dialog box if present
    remDialogIfPresent();
    //get dialog box from template
    let dialogEl = getNewDialog();
    //populate dialog box fields from blog post element
    setDialogFieldsFromPost(dialogEl, bpEl);
    //add event listeners to dialogue element for this current blog post
    let errMsg = "Error: please fill in all input fields before submitting this edited blog post.";
    addDialogOkCancBtnHandlers(dialogEl, mainEl, errMsg, setPostFields, bpContEl, bpEl);
    //display dialog box
    mainEl.appendChild(dialogEl);
  });
  delBtnEl.addEventListener('click', (event) => {
    delBlogPost(bpEl, bpContEl);
  });
}

export function addBlogPost(postTitle, postDate, postSummary, bpContEl) 
{
  //get next blog post number
  let nthBlogPost = getNextNthBlogPostNum(bpContEl);
  //update blog post container's inc count
  setNextNthBlogPostNum(nthBlogPost, bpContEl);
  //next/new blog post element
  let nextBpEl = getNewBlogPost(nthBlogPost);
  //add "fields" for blog post
  setPostFields(nextBpEl, postTitle, postDate, postSummary);
  //add event handlers for "Edit" and "Delete" buttons for blog post
  addBlogPostButtonEventHandlers(nextBpEl, bpContEl);
  //add blog post to page
  bpContEl.appendChild(nextBpEl);
}

export function delBlogPost(bpEl, bpContEl) {
  //blog post container
  bpContEl.dataset.numPosts = parseInt(bpContEl.dataset.numPosts) - 1;
  let nthBlogPost = parseInt(bpEl.dataset.nthPost);
  //decrement blog post number of each blog post after this one
  let blogPosts = bpContEl.children;
  for(let i = 0; i < blogPosts.length; i++) {
    if(parseInt(blogPosts[i].dataset.nthPost) > nthBlogPost) {
      blogPosts[i].dataset.nthPost -= 1;
    }
  }
  //remove blog post from container
  bpContEl.removeChild(bpEl);
}

export function addBtnBlogPostEventHandler(
  addBtnSelector=ADD_BTN_SELECTOR,
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  let addBtnEl = document.querySelector(addBtnSelector);
  let mainEl = document.querySelector('main');
  let bpContEl = document.querySelector(blogPostContSelector);
  addBtnEl.addEventListener('click', (event) => {
    //remove dialog box if present
    remDialogIfPresent();
    //clone dialog from template
    let dialogEl = getNewDialog();
    //add event listeners to dialogue element for this current blog post
    let errMsg = "Error: please fill in all input fields before submitting this new blog post.";
    addDialogOkCancBtnHandlers(dialogEl, mainEl, errMsg, addBlogPost, bpContEl);
    //display dialog box
    mainEl.appendChild(dialogEl);
  });
}

export function initBlogPost() {
  //remove dialog box if present
  remDialogIfPresent();
  //add event handler to "Add" button
  addBtnBlogPostEventHandler();
}