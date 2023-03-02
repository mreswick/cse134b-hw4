# cse134b-hw4
## Misha Reswick
## A15994771
### Link to site:
 - https://fantastic-crisp-5be5aa.netlify.app/
(Also check the link.md file for more links.)
### Notes:
 - As noted in link.md:
   - The only external script file that I myself coded for the unstyled blog page (crud.html) and styled blog page (styledcrud.html) is Assets/scripts/blog/blog.js. The underlying script for both is thus the same.
   - Assets/scripts/dist/purify.min.js is to include DOMPurify.
   - Assets/scripts/customdialog.js contains a script file for the custiom dialogs (customdialogs.html) page.
 - For implementation of the blog pages:
   - Notes as comments at the top of the above-mentioned blog.js file help explain overall how the code works. However, as details also given here: the script utilizies a template element, in which three primary elements reside: a blog-post element and two dialog elements. Two custom elements are used: this blog-post element, as well as a blog post container element. (The usage of custom elements seemed to make sense for this use case, as they are functioninig in ways unique to a blog post. A blog post is also an element that may be repeated, if there is more than one blog post). Blog posts are kept track of through a 'data-nth-post' data attribute on each blog post, as well as a 'data-num-posts' data attribute on the blog post container. 'data-num-posts' maintains the number of blog posts currently in the blog. 'data-nth-post' maintains the number of the current blog post, starting from 1 for the first blog post.
     - Whenever a blog post gets deleted, all blog posts "after" it in the HTML, and thus with higher data-nth-post attribute value, have that attribute be decremented (along with data-num-posts getting decremented also). In this way, the data-nth-post attributes across blog posts are always contiguous, starting from 1, and data-num-posts always maintains the number of blog posts, (assuming no user interference in dev tools of course). This is useful when identifying blog posts.
   - When a new blog post is added, it is cloned from the given blog-post in the template, and added to the page, with 'data-num-posts' being incremented, and with it having its data-nth-post be the subsequent integer. 
   - For more on how the dialogs work:
     - When a dialog is displayed, it is cloned from the template, added to the page, and shown in a modal fashion. 
     - There are two distinct dialogs. One is used both either if a user goes to edit a post, or whether they are creating a new post. The only difference is in the title, which is changed via a JS parameter.
       - For this dialog element that is used to edit or add a new blog post, its date-time is readonly, and always set to the current date-time. This was a design choice on my part, as I do not think that a user should be able to manually edit the date-time of their blog post (as that could be percieved as decieving if not the actual date/time they made the post). This field is also updated if they go to edit the post and confirm their choice. Editing a post thus updates the date-time of it, and again, in a readonly fashion.
       - The second dialog is used to confirm whether the user wished to delete that blog post.
      - When a dialog or blog-post is closed/deleted, it is removed from the page. A new one is thus cloned from template whenever another is to reappear/be-used.
    - Unless explicitly requested to be styled, I did not perform major styling of the blog posts or dialogs. However, I did add some background styling (such as a footer and background color) to match the general theme of the rest of the site.
