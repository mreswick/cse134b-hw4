

export function addBlogPost(postTitle, postDate, postSummary,
  templateSelector='#dialogRep', 
  blogPostContSelector='main > blog-post-cont',
  blogPostTemplateSelector='template > blog-post'
  //,

 // blogPostSelector = 'main blog-post-cont', blogPostContId = 'blogPostCont'
 ) 
  {
  //template content
  let templateCont = document.querySelector(templateSelector).content;
  
  //blog post container
  let blogPostContEl = document.querySelector(blogPostContSelector);
  blogPostContEl.numPosts = parseInt(blogPostContEl.num-posts) + 1
  let nextInc = parseInt(blogPostContEl.numPosts);
  
  //next/new blog post element
  let nextBlogEl = templateCont.querySelector(blogPostTemplateSelector).cloneNode(true);
  nextBlogEl.id = `${nextBlogEl.id}${nextInc}`;

  //add "fields" for blog post
  let nextPostTitleEl = nextBlogEl.querySelector('output#outPostTitle');
  nextPostTitleEl.innerHTML = postTitle;
  let nextPostDateEl = nextBlogEl.querySelector('output#outPostDate');
  nextPostDateEl.innerHTML = postDate;
  let nextPostSummaryEl = nextBlogEl.querySelector('output#outPostSummary');
  nextPostSummaryEl.innerHTML = postSummary;

  //add blog post to page
  blogPostContEl.appendChild(nextBlogEl);

  // let nextPostTitleElId = `${nextPostTitleEl.id}${nextInc}`;
  // let nextPostDateElId

  // let blogContEl = document.querySelector(blogPostSelector);
  // let newBlogEl = document.getElementById(blogPostContId);
  
}