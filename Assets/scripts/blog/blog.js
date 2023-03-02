//constants (mostly selectors for elements on the page)
const BP_MAIN_DIALOG_SELECTOR = 'main dialog#dialAddEdit';
const BP_MAIN_DIALOG_CONF_DEL_SELECTOR = 'main dialog#confDel';
const BP_TEMPLATE_DIALOG_CONF_DEL_SELECTOR = 'dialog#confDel';
const TEMPLATE_SELECTOR = '#dialogRep';
const BLOG_POST_CONT_SELECTOR = 'main > blog-post-cont';
const BLOG_POST_TEMPLATE_SELECTOR = 'blog-post';
const ADD_BTN_SELECTOR = 'button#addPost';
const LOCAL_STORAGE_ARR_KEY = 'blogPostArrKey';

//the index of (UTC) iso datetime-local string to slice 
//to get up to and including last minute
const END_ISO_MIN_IND = 16; 

/*
  For use with local storage, CONCEPTUALLY define an array of:
    {
      nthBlogPost: ...
      postTitle: ...
      postDate: ...
      postSummary: ...
    }
  objects representing the blog posts, and load
  at window load/startup. 
  NOTE that this is actually achieved below
  (by updateLocalStorageBPs) by storing the innerHTML
  of the blog post container element, rather than
  an actual/explicit array. This innerHTML string
  is later parsed as HTML children elements, however,
  thereby achieving an array as children when (re)loading
  the window/page.
*/

/*
  General usage notes: 
    - Blog posts are put within a custom container. This
    container maintains a data attribute that is the number
    of blog posts on the page (ie that are within its HTML),
    and each blog post also has a data attribute that gives
    its number in the HTML (and thus page display). Whenever
    a blog post is added, this blog post number increments;
    and whenever a blog post is deleted, all blog posts after
    it, with greater such number, have this number be
    decremented and reassigned to them. The result is 
    conceptually a list of blog posts within a blog post
    container with "ids" (not in the HTML sense) that are
    their number/position in this list (which is the order
    they appear in the HTML and resultingly on the page).
    If inspecting the HTML page as you add or delete blog
    posts, you will see these numbers for the respecitve
    blog posts and the blog post container update.
    - The overall JS works by keeping in the HTML
    a template element with a blog-post, dialog for
    adding or editing a blog post, and a dialog element
    for deleting an element. These are cloned from
    this template and added to the main element to be
    shown modally when displayed, and removed when
    no longer needed. Blog psots are thus cloned
    from a template provided in this template element.
    This template element and inner HTML is already
    present in the HTML for the respective blog
    post pages (crud.html and styledcrud.html).
    - Common parameters seen below:
      - bpEl: this is a blog post element.
      - dialogEl: this is a dialog element (either
        for adding/editing a blog post, or for
        confirming deletion)
      - val: the value to sanitize
      - bpContEl: the container element for blog
        posts on the page.
      - mainEl: the main element of the page
      - *Selector: if a variable is suffixed by 'Selector',
        then it is a string argument for selecting
        that element from the given location on the page
        (namely either the template to clone from,
        or from the main page content).
      - nextIncToSetTo: this is the next blog post number
        to set to.
    - The only JS function for selecting elements that is used
      here apart from explicit node traversal (such as
      with children) is querySelector(...). Selectors
      are thus written using CSS syntax.
  */ 

//gets datetime-local string's date and hours:minutes as string
function getCurrDateTimeForHTMLInputEl() {
  return (new Date()).toISOString().slice(0, END_ISO_MIN_IND);
}

//sets the dialog data-time. This is set to be readonly.
//Usage note: this means that the user cannot themself set the
//date/time (at least if obeying the JS here). Also, whenever
//they update their post, the post will be updated with the current
//date-time, which will also be readonly. 
function setDialogDateTime(dialogEl) {
  let dialogDateEl = dialogEl.querySelector('input#postDate');
  dialogDateEl.setAttribute('value', getCurrDateTimeForHTMLInputEl());
  //after setting datetime, set its datetime to readonly
  dialogDateEl.setAttribute('readonly', true);
  return dialogEl;
}

//sanitize user input
function sanitize(_, val) {
  return DOMPurify.sanitize(`${val}`)
}

//update local storage with blog post container content (ie the blog posts:
//assume that the only children elements of the blog post container
//element are blog posts / blog-post elements.)
export function updateLocalStorageBPs(bpContEl) {
  localStorage[LOCAL_STORAGE_ARR_KEY] = bpContEl.innerHTML;
}

//show the dialog page modally on the page
export function showDialogEl(mainEl, dialogEl) {
  //display dialog box
  mainEl.appendChild(dialogEl);
  dialogEl.showModal();
}

//get next nthBlogPost num
export function getNextNthBlogPostNum(bpContEl) {
  let nextInc = parseInt(bpContEl.dataset.numPosts) + 1;
  return nextInc;
}

//update the blog post number
export function setNextNthBlogPostNum(nextIncToSetTo, bpContEl) {
  bpContEl.dataset.numPosts = parseInt(nextIncToSetTo);
}

//remove dialog element from page (main element) if present
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

//display dialog error message.
// - dialogOutputElSelector: selects the output element in the
//   dialog element (dialogEl) to display the error message
//   (errorMsg) in.
export function dispDialogErrMsg(
  errorMsg, 
  dialogEl,
  dialogOutputElSelector='output#dialogRes') 
{
  let dialogOutputEl = dialogEl.querySelector(dialogOutputElSelector);
  dialogOutputEl.innerHTML = errorMsg;
  dialogOutputEl.hidden = false;
  dialogOutputEl.style.display = 'block';
}

//get blog post field elements and return them
//(for post title, date, and summary)
export function getPostFieldEls(bpEl) {
  let bpTitleEl = bpEl.querySelector('output.outPostTitle');
  let bpDateEl = bpEl.querySelector('output.outPostDate');
  let bpSummaryEl = bpEl.querySelector('output.outPostSummary');
  return [bpTitleEl, bpDateEl, bpSummaryEl];
}

//get blog post field element "values" (innerHTML's)
export function getPostFields(bpEl) {
  let [bpTitleEl, bpDateEl, bpSummaryEl] = getPostFieldEls(bpEl);
  return [bpTitleEl.innerHTML, bpDateEl.innerHTML, bpSummaryEl.innerHTML];
}

//set blog post fields to corresponding arguments
export function setPostFields(bpEl, postTitle, postDate, postSummary, bpContEl) {
  let [bpTitleEl, bpDateEl, bpSummaryEl] = getPostFieldEls(bpEl);
  bpTitleEl.innerHTML = postTitle;
  bpDateEl.innerHTML = postDate;
  bpSummaryEl.innerHTML = postSummary;

  //update local storage
  updateLocalStorageBPs(bpContEl);
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
export function getNewDialog(dialogSelector='dialog#dialAddEdit', templateSelector=TEMPLATE_SELECTOR) {
  let templateContEl = document.querySelector(templateSelector).content;
  let dialogEl = templateContEl.querySelector(dialogSelector).cloneNode(true);
  return dialogEl;
}

//takes in a blog post element (bpEl) and the corresponding dialog elemet (dialogEl),
//and initialzies the fields of that dialog element from this blog post.
//The postHeader parameter is used to change the dialog's header for whether
//it is being used to edit an existing blog post or add a new blog post.
export function setDialogFieldsFromPost(dialogEl, bpEl, postHeader='Post') {
  let bpTitleEl = bpEl.querySelector('output.outPostTitle');
  let bpDateEl = bpEl.querySelector('output.outPostDate');
  let bpSummaryEl = bpEl.querySelector('output.outPostSummary');
  let bpTitle = bpTitleEl.innerHTML;
  let bpDate = bpDateEl.innerHTML;
  let bpSummary = bpSummaryEl.innerHTML;
  let dialogTitleEl = dialogEl.querySelector('input#postTitle');
  let dialogDateEl = dialogEl.querySelector('input#postDate');
  let dialogSummaryEl = dialogEl.querySelector('textarea#postSummary');
  let dialogHeaderEl = dialogEl.querySelector('label#headerTitle');
  dialogTitleEl.setAttribute('value', bpTitle);
  dialogDateEl.setAttribute('value', bpDate);
  dialogSummaryEl.setAttribute('value', bpSummary);
  dialogSummaryEl.innerHTML = bpSummary; //also set content for textarea
  dialogHeaderEl.innerHTML = postHeader;
}

//gets the field values from the dialog element, sanitized
export function getDialogFieldVals(dialogEl) {
  let dialogTitleEl = dialogEl.querySelector(`input#postTitle`);
  let dialogDateEl = dialogEl.querySelector(`input#postDate`);
  let dialogSummaryEl = dialogEl.querySelector(`textarea#postSummary`);
  return [sanitize`${dialogTitleEl.value}`, 
    sanitize`${dialogDateEl.value}`, 
    sanitize`${dialogSummaryEl.value}`];
}

//modifyBlogPostFunc is either addBlogPost or editBlogPost
// - use whether bpEl is specified as whether to 
//   use addBlogPost (if not) or editBlogPost (if so)
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
    //hide dialog element (for use with showModal() as I use it, note to self)
    dialogEl.close();
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
        modifyBlogPostFunc(bpEl, bpTitle, bpDate, bpSummary, bpContEl);
      }
      else {
        throw "Modify function not of expected function (addBlogPost or editBlogPost).";
      }
      //hide dialog element (for use with showModal() as I use it, note to self)
      dialogEl.close();
      //remove this dialog element
      mainEl.removeChild(dialogEl);
    }
    //else display error message in dialogue box that not all fields are entered
    else {
      dispDialogErrMsg(errMsg, dialogEl);
      //dialogue box not removed from main and so remains visible (note: actually
      //need to call showModal to remain open)
    }
  });
}

//add bp event handlers (for "Edit" and "Delete" buttons) 
export function addBlogPostButtonEventHandlers(bpEl, bpContEl) {
  //select relevant elements
  let mainEl = document.querySelector('main');
  let editBtnEl = bpEl.querySelector('.editPost');
  let delBtnEl = bpEl.querySelector('.delPost'); 
  editBtnEl.addEventListener('click', (event) => {
    //remove dialog box if present
    remDialogIfPresent();
    //get dialog box from template
    let dialogEl = getNewDialog();
    //populate dialog box fields from blog post element
    setDialogFieldsFromPost(dialogEl, bpEl, 'Edit Post:'); //'New Post:' by default currently
    //update date of dialog to current date-time:
    setDialogDateTime(dialogEl);
    //add event listeners to dialogue element for this current blog post
    let errMsg = "<em>Error:</em> please fill in all input fields before submitting this edited blog post.";
    addDialogOkCancBtnHandlers(dialogEl, mainEl, errMsg, setPostFields, bpContEl, bpEl);
    //display dialog box
    showDialogEl(mainEl, dialogEl);
  });
  delBtnEl.addEventListener('click', (event) => {
    delBlogPost(bpEl, bpContEl);
  });
}

//add/create a new blog post and add it to the page
export function addBlogPost(postTitle, postDate, postSummary, bpContEl, updateLocalStorage=true) {
  //get next blog post number
  let nthBlogPost = getNextNthBlogPostNum(bpContEl);
  //update blog post container's inc count
  setNextNthBlogPostNum(nthBlogPost, bpContEl);
  //next/new blog post element
  let nextBpEl = getNewBlogPost(nthBlogPost);
  //add "fields" for blog post
  setPostFields(nextBpEl, postTitle, postDate, postSummary, bpContEl);
  //add event handlers for "Edit" and "Delete" buttons for blog post
  addBlogPostButtonEventHandlers(nextBpEl, bpContEl);
  //add blog post to page
  bpContEl.appendChild(nextBpEl);

  //this is put in an if so that can upon 
  //initial window/page load add blog posts without
  //updating local storage each time (ie so that can 
  //conceptually do a single batch
  //before updating local storage)
  if(updateLocalStorage) {
    //update local storage
    updateLocalStorageBPs(bpContEl);
  }
}

//get the dialog element for confirming whether to delete a blog post
export function getDelConfirmDialog(delDialogSelector=BP_TEMPLATE_DIALOG_CONF_DEL_SELECTOR, templateSelector=TEMPLATE_SELECTOR) {
  return getNewDialog(delDialogSelector, templateSelector);
}

//delete the passed blog post (bpEl) from the blog post container (bpContEl)
export function delBlogPost(bpEl, bpContEl, 
  delMainDialogSelector=BP_MAIN_DIALOG_CONF_DEL_SELECTOR) {
  remDialogIfPresent(delMainDialogSelector);
  let dialogConfDelEl = getDelConfirmDialog();
  setTimeout(() => {
    //show confirm deletion prompt
    let mainEl = document.querySelector('main');
    mainEl.appendChild(dialogConfDelEl);
    dialogConfDelEl.showModal();
    //add event handlers for the ok and cancel buttons of this dialog element
    let cancBtn = document.getElementById('confCbtn');
    let okBtn = document.getElementById('confOKbtn');
    cancBtn.addEventListener('click', (event) => {
      remDialogIfPresent(delMainDialogSelector);
    });
    okBtn.addEventListener('click', (event) => {
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
      //update local storage
      updateLocalStorageBPs(bpContEl);
      //remove dialog from page
      remDialogIfPresent(delMainDialogSelector);
    });
  }, 0);
}

//add an event handler to an "add" button
//for adding a new blog post when clicked.
export function addBtnBlogPostEventHandler(
  addBtnSelector=ADD_BTN_SELECTOR,
  blogPostContSelector=BLOG_POST_CONT_SELECTOR) 
{
  //select add blog post button, main, and blog post
  //container elements
  let addBtnEl = document.querySelector(addBtnSelector);
  let mainEl = document.querySelector('main');
  let bpContEl = document.querySelector(blogPostContSelector);
  //add event listener to add button for adding a new blog post
  //when clicked
  addBtnEl.addEventListener('click', (event) => {
    //remove dialog box if present
    remDialogIfPresent();
    //clone dialog from template
    let dialogEl = getNewDialog();
    //update date of dialog to current date-time:
    setDialogDateTime(dialogEl);
    //add event listeners to dialogue element for this current blog post
    let errMsg = "<em>Error:</em> please fill in all input fields before submitting this edited blog post.";
    addDialogOkCancBtnHandlers(dialogEl, mainEl, errMsg, addBlogPost, bpContEl);
    //display dialog box
    showDialogEl(mainEl, dialogEl);
  });
}

//loads blog posts from local storage onto page
export function addBlogPostsFromLocalStorage(blogPostContSelector=BLOG_POST_CONT_SELECTOR) {
  let bpContEl = document.querySelector(blogPostContSelector);
  let savedBPsAsStr = localStorage.getItem(LOCAL_STORAGE_ARR_KEY);
  let addedBPsFromLocalStorage = false;
  if(savedBPsAsStr) {
    //use dummy bp cont el to parse innerHTML to get children nodes
    let bpContDummyEl = document.createElement('div');
    bpContDummyEl.innerHTML = savedBPsAsStr;
    let updateLocalStorage = false;
    //1st child is an <aside>, so skip over that
    for(let i = 1; i < bpContDummyEl.children.length; i++) {
      let currBpChild = bpContDummyEl.children[i];
      let [currBpTitle, currBpDate, currBpSummary] = getPostFields(currBpChild);
      //if last iteration, update local storage when adding blog post
      if(i == bpContDummyEl.children.length - 1) {
        updateLocalStorage = true;
      }
      addBlogPost(currBpTitle, currBpDate, currBpSummary, bpContEl, updateLocalStorage);
      addedBPsFromLocalStorage = true;
    }
  }
  return addedBPsFromLocalStorage;
}

// loads sample blog posts. Note that these should only be loaded
// if there is nothing to load from local storage
export function addSampleBlogPosts(blogPostContSelector=BLOG_POST_CONT_SELECTOR) {
  //don't update local storage with these sample posts
  let bpContEl = document.querySelector(blogPostContSelector);
  let sampBPs = [
    {
      title: 'Recruitment?',
      date: '2023-02-27T22:48',
      summary: 'Hi Misha! We are from the Snowflake org, and were hoping to connect with you. ' +
        'We sent a form submission in case.'
    },
    {
      title:'Photos',
      date: '2023-01-24T10:32',
      summary: 'We are having a wedding. Let me know if you would like to take some shots ' +
        'for us at 888-555-1555.'
    },
    {
      title: 'Nice dog!',
      date: '2023-02-12T09:56',
      summary: 'Love your dog! Thought I would send some appreciation your way.'
    }
  ];
  for(let i = 0; i < sampBPs.length; i++) {
    let currPostData = sampBPs[i];
    let [bpTitle, bpDate, bpSummary] = [currPostData.title, currPostData.date, currPostData.summary];
    addBlogPost(bpTitle, bpDate, bpSummary, bpContEl);
  }
}

//initialize the JS for a blog post for this page
export function initBlogPost() {
  //remove dialog box if present
  remDialogIfPresent();
  //add/load/restore any blog post(s) from local storage
  if(!addBlogPostsFromLocalStorage()) {
    //if no blog posts loaded from local storage, then
    //add some default ones.
    addSampleBlogPosts();
  };
  //add event handler to "Add" button
  addBtnBlogPostEventHandler();
}