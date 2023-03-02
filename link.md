# Links to pages:
Below are links to the site, Github repo, and specific files/pages used for parts specific to Assignment #4 (this assignment).
## Main links:
### Github repo link:
https://github.com/mreswick/cse134b-hw4
### Site page link:
https://fantastic-crisp-5be5aa.netlify.app/

## Solution page/file links:
### Links to the dialog and blog pages:
Note that these are acccesible from the last section on my "Experiments" page of my site (ie they are linked from my main site as well, on my "Experiments" page). However, the direct links to these pages are also given here:
 - https://fantastic-crisp-5be5aa.netlify.app/nativedialogs.html
 - https://fantastic-crisp-5be5aa.netlify.app/customdialogs.html
 - https://fantastic-crisp-5be5aa.netlify.app/crud.html
 - https://fantastic-crisp-5be5aa.netlify.app/styledcrud.html
### Paths to dialog and blog styles + scripts:
Styles for the styled blog page are located in:
 - Assets/styles/blog/styledblog.css
Scripts for the dialog and blog pages are at:
 - Assets/scripts/blog/blog.js
   - This is the script used for the unstyled blog page. Note that the script used for the unstyled blog page is the same as for the styled blog page (hence this is for both), and that there are no extra script files for the styled blog page than there are for the unstyled blog page. Ie, this is the only script file for each.
  - Assets/scripts/customdialog.js
    - This contains JS for the custom dialogs' page.
  - Assets/scripts/dist/purify.min.js
    - This contains DOMPurify. The way I include DOMPurify in this project is I simply include it from this file. This is used for sanitization of user inputs.
### Paths to HTML/CSS additions:
The new search page is located at:
 - search_results.html
and its corresponding style rules at:
 - Assets/styles/search_results.css
The CSS style rules for printing the "Experience" page are located in:
 - Assets/styles/print/print_experience.css
Other HTML and CSS files mentioned in changelog.md have also had changes.