1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

ans: 
The differences between getElementById, getElementsByClassName, and querySelector / querySelectorAll are given below 
we can select a specific element using getElementById,
With getElementsByClassName, we can select multiple elements by their class,
With querySelector, we can select one element at a time by class, id, or tag,
With querySelectorAll, we can select multiple elements at once by class, id, or tag.


2. How do you create and insert a new element into the DOM?

ans:
To create a new element,i will use document.createElement
Then,i will use getElementById to select the parent and use appendChild to add it.

3. What is Event Bubbling? And how does it work?

ans:
Event Bubbling is when an event moves from the child element up to the parent element 
it look like dropping a pebble in water the ripples move outward from the point of impact,
it works:
Suppose i have a button inside a <div> inside <body>
i click the button, The click event first triggers on the button,
Then the event bubbles up to the <div>, triggering any click handlers there.

4. What is Event Delegation in JavaScript? Why is it useful?

ans:
Event Delegation means placing an event listener on a parent element, which can automatically handle the events of its child elements.It’s needed because you don’t have to attach separate listeners to every child.

5. What is the difference between preventDefault() and stopPropagation() methods?

ans:
preventDefault():It is mainly used to prevent the default browser behavior.
stopPropagation():It is mainly used to prevent the default browser behavior.