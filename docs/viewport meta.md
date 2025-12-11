
Hey Devs, 
If your are web developer you will experience the zoom effect in the older browser or may be sometimes the media querry won't works. if you go and seacrh in the internet it will suggest us to add the <meta name="viewport" content="width=device-width, initial-scale=1.0"> tag in the html 
after adding this you media query will work fine.
Have you ever thought why this tag is used and what is the use of this tag.
Let's debug what happen behinds this tag. 

History of meta width=device-width. 

 Its not the part of any HTML version. It was introduced by the mobile browser and first appears in  2007 by safari browser. 
 

Brwoser view : 

Basically the mobile browsers predendted every websites will be designed for desktop So they created a virtual viewport around 980px wide (varies by browser).this behaviour makes the website zoomed out in the mobile browsers. 

what meta viewport does? 

The meta viewport tells the browser to stop that behaviour and width=device-width part tells
 the browser to set the viewport width to the device width so that it fits perfectly. 

 example : 

 Pixel 9 mobile physical width and height : 1080px x 2424 pixels. but the css pixels will be 360px 
 
 Now the browser will calculate the real device width, not the virtual width. 

 @media (max-width: 720px) now the media query will works as indented. 
 Without the meta tag, the browser thinks the width is 980px → the media query never fires.

 and there is one piece of code initial-scale=1.0 what is the purpose of this ? 
 this will tell the browser to display the page at 100% zoom (no auto-scaling)

 If you don’t set it, the browser may zoom in or zoom out to “fit the page,” making your layout unpredictable.


 
