const BP_MAIN_DIALOG_SELECTOR = 'main dialogue';
const TEMPLATE_SELECTOR = '#dialogRep';
const BLOG_POST_CONT_SELECTOR = 'main > blog-post-cont';
const BLOG_POST_TEMPLATE_SELECTOR = 'template > blog-post';
const ADD_BTN_SELECTOR = 'button#addPost';

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
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR, 
  dialogOutputElSelector='dialog#dialogRes') 
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
  let dialogTitleEl = dialogEl.querySelector(`${bpMainDialogSelector}#postTitle`);
  let dialogDateEl = dialogEl.querySelector(`${bpMainDialogSelector}#postDate`);
  let dialogSummaryEl = dialogEl.querySelector(`${bpMainDialogSelector}#postSummary`);
  dialogTitleEl.setAttribtue('value', bpTitle);
  dialogDateEl.setAttribtue('value', bpDate);
  dialogSummaryEl.setAttribtue('value', bpSummary);
}

export function getDialogFieldVals(dialogEl, bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR) {
  let dialogTitleEl = dialogEl.querySelector(`${bpMainDialogSelector}#postTitle`);
  let dialogDateEl = dialogEl.querySelector(`${bpMainDialogSelector}#postDate`);
  let dialogSummaryEl = dialogEl.querySelector(`${bpMainDialogSelector}#postSummary`);
  return [dialogTitleEl.value, dialogDateEl.value, dialogSummaryEl.value];
}

//modifyBlogPostFunc is either addBlogPost or editBlogPost
export function dialogOkBtnHandler(
  dialogEl, mainEl, nthBlogPost, errorMsg, 
  modifyBlogPostFunc, blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  //get input field values and set those of blog post to it
  [bpTitle, bpDate, bpSummary] = getDialogFieldVals(dialogEl);
  //only edit blog post if all entries are non-empty
  if(bpTitle && bpDate && bpSummary) {
    modifyBlogPostFunc(nthBlogPost, bpTitle, bpDate, bpSummary, blogPostContSelector);
    //remove this dialog element
    mainEl.removeChild(dialogEl);
  }
  //else display error message in dialogue box that not all fields are entered
  else {
    dispDialogErrMsg(errorMsg);
    //dialogue box not removed from main and so remains visible
  }
}

export function addBlogPost(postTitle, postDate, postSummary, 
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR,
  templateSelector=TEMPLATE_SELECTOR, 
  blogPostContSelector=BLOG_POST_CONT_SELECTOR,
  blogPostTemplateSelector=BLOG_POST_TEMPLATE_SELECTOR) 
{
  //blog post container
  let blogPostContEl = document.querySelector(blogPostContSelector);
  blogPostContEl.dataset.numPosts = parseInt(blogPostContEl.dataset.numPosts) + 1;
  let nextInc = parseInt(blogPostContEl.dataset.numPosts);
  
  //next/new blog post element
  let nextBlogEl = getNewBlogPost(nextInc, templateSelector, blogPostTemplateSelector);
  //nextBlogEl.id = `${nextBlogEl.id}${nextInc}`;
  //add "fields" for blog post
  setPostFields(nextBlogEl, postTitle, postDate, postSummary);
  //add event handlers for "Edit" and "Delete" buttons for blog post
  addBlogPostButtonEventHandlers(nextInc, bpMainDialogSelector, 
    templateSelector, blogPostContSelector);
  //add blog post to page
  blogPostContEl.appendChild(nextBlogEl);
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
  let blogPostEl = blogPostContEl.querySelector(`blog-post[data-nth-post=${nthBlogPost}]`);
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
  let blogPostContEl = document.querySelector(blogPostContSelector);
  //edit nth blog post
  let bpEl = blogPostContEl.querySelector(`blog-post[data-nth-post=${nthBlogPost}]`);
  //edit "fields" for blog post
  setPostFields(bpEl, postTitle, postDate, postSummary);
}

export function addBlogPostButtonEventHandlers(
  nthBlogPost, 
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR,
  templateSelector=TEMPLATE_SELECTOR, 
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  let blogPostContEl = document.querySelector(blogPostContSelector);
  let bpEl = blogPostContEl.querySelector(`blog-post[data-nth-post=${nthBlogPost}]`);
  let editBtnEl = bpEl.querySelector('.editPost');
  let delBtnEl = bpEl.querySelector('.delPost');
  editBtnEl.addEventListener('click', (event) => {
    //remove dialog box if present
    remDialogIfPresent(bpMainDialogSelector);
    //get dialog box from template
    let dialogEl = getNewDialog(templateSelector);
    //populate dialog box fields from blog post element
    setDialogFieldsFromPost(dialogEl, bpEl);
    //display dialog box
    mainEl.addChild(dialogEl);
    //add event listeners to dialogue element for this current blog post
    let dialogCancEl = dialogEl.querySelector('#postCancel');
    let dialogOkEl = dialogEl.querySelector('#postOk');
    dialogCancEl.addEventListener('click', (event) => {
      //remove this dialog element
      mainEl.removeChild(dialogEl);
    });
    dialogOkEl.addEventListener('click', (event) => {
      let errMsg = "Error: please fill in all input fields before submitting this edited blog post.";
      dialogOkBtnHandler(dialogEl, mainEl, nthBlogPost, errMsg, editBlogPost, blogPostContSelector);
    });
  });
  delBtnEl.addEventListener('click', (event) => {
    delBlogPost(nthBlogPost);
  });
}

export function addBtnBlogPostEventHandler(
  addBtnSelector=ADD_BTN_SELECTOR,
  bpMainDialogSelector=BP_MAIN_DIALOG_SELECTOR, 
  templateSelector=TEMPLATE_SELECTOR, 
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  let addBtnEl = document.querySelector(addBtnSelector);
  addBtnEl.addEventListener('click', (event) => {
    //remove dialog box if present
    remDialogIfPresent(bpMainDialogSelector);
    //clone dialog from template
    let dialogEl = getNewDialog(templateSelector);
    //display dialog box
    mainEl.addChild(dialogEl);
    //add event listeners to dialogue element for this current blog post
    let dialogCancEl = dialogEl.querySelector('#postCancel');
    let dialogOkEl = dialogEl.querySelector('#postOk');
    dialogCancEl.addEventListener('click', (event) => {
      //remove this dialog element
      mainEl.removeChild(dialogEl);
    });
    dialogOkEl.addEventListener('click', (event) => {
      let errMsg = "Error: please fill in all input fields before submitting this new blog post.";
      dialogOkBtnHandler(dialogEl, mainEl, nthBlogPost, errMsg, addBlogPost, blogPostContSelector);
    });
  });
}

export function initBlogPost() {
  //remove dialog box if present
  remDialogIfPresent();
  //add event handler to "Add" button
  addBtnBlogPostEventHandler();
}