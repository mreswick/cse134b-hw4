

export function addBlogPost(postTitle, postDate, postSummary,
  templateSelector='#dialogRep', blogPostContSelector='main > blog-post-cont',
  blogPostTemplateSelector='template > blog-post') {
  //template content
  let templateCont = document.querySelector(templateSelector).content;
  
  //blog post container
  let blogPostContEl = document.querySelector(blogPostContSelector);
  blogPostContEl.dataset.numPosts = parseInt(blogPostContEl.dataset.numPosts) + 1;
  let nextInc = parseInt(blogPostContEl.dataset.numPosts);
  
  //next/new blog post element
  let nextBlogEl = templateCont.querySelector(blogPostTemplateSelector).cloneNode(true);
  nextBlogEl.dataset.nthPost = nextInc;
  //nextBlogEl.id = `${nextBlogEl.id}${nextInc}`;

  //add "fields" for blog post
  let nextPostTitleEl = nextBlogEl.querySelector('output#outPostTitle');
  nextPostTitleEl.innerHTML = postTitle;
  let nextPostDateEl = nextBlogEl.querySelector('output#outPostDate');
  nextPostDateEl.innerHTML = postDate;
  let nextPostSummaryEl = nextBlogEl.querySelector('output#outPostSummary');
  nextPostSummaryEl.innerHTML = postSummary;

  //add blog post to page
  blogPostContEl.appendChild(nextBlogEl);
}

export function delBlogPost(nthBlogPost, blogPostContSelector='main > blog-post-cont') {
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

export function editBlogPost(nthBlogPost, postTitle, postDate, postSummary,
  blogPostContSelector='main > blog-post-cont') {
  //blog post container
  let blogPostContEl = document.querySelector(blogPostContSelector);

  //edit nth blog post
  let blogPost = blogPostContEl.querySelector(`blog-post[data-nth-post=${nthBlogPost}]`);
  //edit "fields" for blog post
  let postTitleEl = blogPost.querySelector('output.outPostTitle');
  postTitleEl.innerHTML = postTitle;
  let postDateEl = blogPost.querySelector('output.outPostDate');
  postDateEl.innerHTML = postDate;
  let postSummaryEl = blogPost.querySelector('output.outPostSummary');
  postSummaryEl.innerHTML = postSummary;
}

export function addBlogPostButtonEventHandlers(nthBlogPost, bpMainDialogSelector='main dialogue',
templateSelector='#dialogRep', blogPostContSelector='main > blog-post-cont') {
  let blogPostContEl = document.querySelector(blogPostContSelector);
  let bpEl = blogPostContEl.querySelector(`blog-post[data-nth-post=${nthBlogPost}]`);
  let editBtnEl = bpEl.querySelector('.editPost');
  let delBtnEl = bpEl.querySelector('.delPost');
  let templateContEl = document.querySelector(templateSelector).content;
  editBtnEl.addEventListener('click', (event) => {
    //remove dialog box if present
    let dialogEl = bpEl.querySelector(bpMainDialogSelector);
    let mainEl = document.querySelector('main');
    if(dialogEl) {
      mainEl.removeChild(dialogEl);
    }
    //get dialog box from template
    dialogEl = templateContEl.querySelector('dialog').cloneNode(true);
    //populate dialog box fields from blog post element
    let bpTitleEl = bpEl.querySelector('output.outPostTitle');
    let bpDateEl = bpEl.querySelector('output.outPostDate');
    let bpSummaryEl = bpEl.querySelector('output.outPostSummary');
    let bpTitle = bpTitleEl.innerHTML;
    let bpDate = bpDateEl.innerHTML;
    let bpSummary = bpSummaryEl.innerHTML;
    let dialogTitleEl = dialogEl.querySelector('dialog#postTitle');
    let dialogDateEl = dialogEl.querySelector('dialog#postDate');
    let dialogSummaryEl = dialogEl.querySelector('dialog#postSummary');
    dialogTitleEl.setAttribtue('value', bpTitle);
    dialogDateEl.setAttribtue('value', bpDate);
    dialogSummaryEl.setAttribtue('value', bpSummary);
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
      //get input field values and set those of blog post to it
      bpTitle = dialogTitleEl.value;
      bpDate = dialogDateEl.value;
      bpSummary = dialogSummaryEl.value;
      editBlogPost(nthBlogPost, bpTitle, bpDate, bpSummary);
      // bpTitleEl.innerHTML = bpTitle;
      // bpDateEl = bpDate;
      // bpSummaryEl.innerHTML = bpSummary;
      //remove this dialog element
      mainEl.removeChild(dialogEl);
    });
  });
  delBtnEl.addEventListener('click', (event) => {
    delBlogPost(nthBlogPost);
  });
}

export function addBtnBlogPostEventHandler(addBtnSelector='button#addPost') {
  
}