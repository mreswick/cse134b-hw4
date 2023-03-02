# Change Log:
## Edits:
- Added search icon to main navigation menu. This required changing the layout and experimenting with spacing for the desktop, tablet/small-laptop, and mobile views. This also required changing the menu navigation for each page.
Bug fix: also fixed a "bug" that was preventing me from clicking on the search bar in tablet and mobile. I found the issue to be that my subnavigation for those media query sizes was only having its opacity go to zero, but was still rendering on the page, and so blocking the selection of the search bar that effectively lay underneath it. 
- Changed the font size and spacing of main navigation menu items in general. (For instance, they are now larger on home page, and the spacing is more consistent.)
- Created a new page (at search_results.html and search_results.css) that is linked to by the search icon in the main navigation. This search page features a custom search bar (ie that is styled by css) that also features an "x" button to clear the input with custom JS.
The search engine on this page is powered by Swiftype. PLEASE NOTE: I originally tried using Google CSE (Google's Custom Search Engine), but could not get any search results for my site to appear with it (even when restricting searches to be limited to only my site). After some reading, I believe this is because Google has not indexed/crawled my site yet. I tried manually adding a sitemap, and have also checked two Netlify plugins/"integrations" which together create a sitemap and submit it to big search engines like Google. As of early morning 2/28/2023, it does not appear to have been indexed yet. For this reason, I chose to implement the in-site search with a different search engine. I first looked at Algolia, but Switftype overall appeared more promising (at least with my limited experience and limited knowledge of both). My aim is to use Switftype at least for the intermission until Google indexes my site so that it can become useable with Google CSE. However, Swiftype only has a 14 day free trial, which began 2/26/2023. If my website is not graded by then, it may break (though if this is the case and Google's CSE isn't ready to be setup yet, I can look into purchase options for Swiftype).
- This search_results.html page also uses media queries to adapt based on browser width, based on my experimentation. Also, one of the CSS rules I added for this page utilizes !important: this is in order to override the display property of what is effectively a popup that Swiftype would otherwise inject on the page. This rule prevents that from being rendered. Along similar lines, the search results would show through the subnavigation menu on mobile (as it extends far enough down to on mobile / small browser width); to fix this, I gave this sub navigation menu a higher z-index. In summary, Swiftype was not a perfect fit out of the box, and needed experimetnation and tweaking to try to get right.
- Brought in and used icons (search icon in main navigation for each page, and "x" for search bar on my Search page).
- What Swiftype powers is the search engine and the autofilling of search results into a container element I have on my Search page, as well as autocompletion of the input element in the search bar on that page.
- Google Analytics: added Google Analytics tracking to the main pages of my website (namely the non-dialogue, non-blog ones). I checked this by looking at the "Realtime" data, and could see my logins (such as from desktop and mobile). I also have verified that data is coming in on the Data Stream for it. Google Analytics tracks who visits the site, and such as whether they are visiting from desktop or mobile. (It also appears to track their location). This is thus useful for gleaning more information about the people who visit my site. 
- Experience/resume print: modified my Experience page's CSS so that it can be printed and appear nicely. Ie, if one goes to my Experience page and clicks "Print" for printing the page, then separate styles will be used to make it printer-friendly. This involved adding media queries to have certain styling and elements (such as the footer and main navigation at the top of the page) not appear, as well as changing the spacing, borders, and layout of the page  including not displaying certain content). This effectively has turned my Experience page into also a printable resume (along with a section about "lessons learned" still present).
 - Added Assignment #4 dialog and blog pages (at nativeidalogs.html, customdialogs.html, crud.html, and styledcrud.html) to Experiments page, with appropriate styling, as an additional section. This required additional HTML on the  experiments page, and more styling for it for this new section in experiments.css. Like the rest of the pages, this page remains responsive with this new section (ie ok with desktop, tablet/small-laptop, and mobile).
 - Updated line heights and margins on Experiments page (greater line heights for readability, smaller margins to look cleaner).
 - Updated line heights and margins on Home page (index.html and index.css), particularly for mobile, to be more spacious / less crowded.
 - Tweaked spacing of drop-down sub menu for mobile for main navigation.

## Summary of changes:
 - ### JS:
  - Google Analytics added to each main page
  - Swiftype search engine, auto-completion, and populating/displaying of search results for 
    in-site search engine (to search across my site's pages).
 - ### HTML/CSS:
  - Search page added (search_results.html), with custom search bar (styled in Assets/styles/search_results.css).
  - Search icon added to main navigation and main navigation menus (nested) updated appropriately for desktop, 
    tablet/small-laptop, and mobile. When clicked, this redirects to the Search page.
  - Experience page has newly-added media queries (in new Assets/styles/print/print_experience.css) to change the page layout for printing. This is thus visible only if one goes to print the page, but turns that page into a printable resume and lessons learned for me.
  - Assignment #4 pages added as links in new section to Experiments page. Minimal styling is added the page for each to keep the theme of the site.
  - Minor edits + bug fixes (such as spacing and line heights for mobile on various site pages to make them less crowded and look cleaner). 
  - (All content was already in place, so there was no placeholder content to replace.)




