# library
Library project for The Odin Project

---Features---

-Add any books you like with their title, author, page count, and whether or not you've read them.

-Edit exisiting book info.

-Book counter

-Responsive book grid

-Nifty retro theming


---Devlog---

April 17th, 2022

	First full day of working on this library project. Had the basic layout and colour scheme set up already yesterday, but I immediately had the idea to make the books have more pages on screen based on the actual pagecounts entered. This probably would've been pretty easy to do with an absolutely positioned image under the page cover, and having that image just slide further out based on the size of the book. I decided to instead use divs and css to generate trapezoids that progressively get smaller, creating a sense of perspective on the book. Even if it's a stupider way to implement this overall, I think it'll still end up being good practice.
	
	Kinda tired today. Should be able to sleep well tonight and make some good progress on this tomorrow. Was still able to implement a decent looking book layout with randomized cover art. Also implemented the skeleton for the add book input panel pretty quickly. Should be easy enough to add functionality, as most of the pieces are all there. I'll probably limit the scope of the fancy stuff I add to this from here on out, as I want to speed through some more of TOP and really invest time in the bigger projects. We'll see.

April 18th, 2022

	New keyboard and mouse came in way earlier than expected, so that's nice. Unfortunately the hard part will be editing books apparently. Adding a new book was a relatively simple process, but editing existing content is proving to be a huge pain in the ass. Thought I might be done with this project by the end of the day, but not so sure if that'll be the case anymore. It'll eventually work though, and by the time it does I'm sure the trouble will be worth it.

	Wow, several hours later and still massively struggling, not sure what the issue is yet. Will have to take a break for now and come back tomorrow with a fresh set of eyes. I think I built this from the ground up in a way that would screw me over down the line. That or I don't understand objects yet. Probably the latter.

April 19th, 2022

	New day, new bright vision on the project. Started the day off by quickly realizing that the submit book button effects were being applied based on how many time you click the edit button, since I nested them for some reason. took that even listener out to be on its own and it behaved nicely pretty quickly. Cleaned up some of the related functions for consistency and readability, and now it all works as expected. With the new functions I set up yesterday, it was super easy to add an option to remove a book too. Since this doesn't actualy remove the book object, I could even have a trash bin to readd deleted books super easily. So yeah, I mostly understood how objects worked I was just underutilizing their power.

April 20th, 2022

	Project was essentially done yesterday. Now I just have to clean it up a bit. Added some new fonts, and changed some colours around. Fixed placement of some buttons. Added a book counter, which was super easy since I already had a variable tracking cell count for the book grid and updating everytime it would change. Now just to add some cute button an input animations and I can move on with my life.

	Was finishing up the new style updates when I noticed that the read/unread dropdown wasn't updating books properly. Found where the issue was, still don't understand what caused it. Simply rewrote how the book displays find what to show based on input, and it works fine now. Another example of where I may need to spend more time on objects.

---To-Do---

DONE-Scale binding to book size
DONE-Add pages based on book size
DONE-Generate book info on book
DONE-Input options for adding a new book
DONE-Clean up UI
DONE-make an amount of book equal to (fix rows) 
DONE-randomize or generate book art?
DONE-Edit button for books
CANCEL-Make every other page jut out
CANCEL-bottom margin for books based on page count
CANCEL-SHADOWS
DONE-form verification for add book panel
DONE-add 70s design squiggles and some big stylized numbers like in 70s architecture
DONE-Input from hitting enter or hitting submit
DONE-Limit pages added to bottom of book
DONE-delete book button
DONE-books are too big when alone, add max book width
DONE-Add messages for invalid input
