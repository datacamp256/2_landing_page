# Landing Page Project
Because everyone needs a place to land.
## Table of Contents
* [About](#about)
* [Instructions](#instructions)

## About
This project represents a landing page with static content but dynamic navigation.
Feel free to add your own content by following the [instructions](#instructions).

## Instructions
You have to follow some rules to create content which will be added to the navigation bar and does not break other parts.

### Where to ad content
If you want to add your own content, open [index.html](index.html).
You can add your own content between the two lines

`<!-- OWN CONTENT MUST BE ADDED BELOW THIS LINE -->`

and

`<!-- OWN CONTENT MUST BE ADDED ABOVE THIS LINE -->`

Be careful that you write your own content only at the beginning or end of the described area or between two lines of `</section>` (below this) and `<section>` (above this)!

### How to add content
You add content in separate _sections_.
Each section has a fixed structure and contains following attributes:
* an identifier (value of 'id') which must be unique for the whole page
* a short name which will be used in the navigation bar 
  (value of 'data-nav') which should be unique
* a headline above your section 
  (between `<h2>` and `</h2>)
* the section's content 
  (between `</h2>` and `</div>` - Feel free to format the content using html tags).

Apart from this, the following structure must be observed: 
```
<section id="identifier" data-nav="Section 2">
  <div class="landing__container">
    <h2>Headline</h2>
    <p>As much text as you want.</p>
  </div>
</section>
```