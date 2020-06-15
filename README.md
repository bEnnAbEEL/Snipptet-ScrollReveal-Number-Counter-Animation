# Process Explanation

## The JS File

* In the JS files there is a site scripts that includes the code to make it work. You can change it as needed.
* The selector code looks like this.
```js
 ScrollReveal().watch(
    "YOUR JQUERY SELECTOR HERE e.g. '.single-stat-container .stat-number' in this case",
    function onEnter(el) {
      customCounter();
    },
    function onExit(el) {
    }
  );
```

## HTML File

* In the html file you need to add these two classes to your selector.
```html
<div class="timer count-number"></div>
```
* The first one `<div class="timer"></div>`  is used for the conter to run the animation. e.g.
  ![](md-images/01%20-%20Class%20timer%20animation.gif)
*  The second one `<div class="count-number"></div>` is used to format the integer value with appropriate commas seperation. e.g.
  ![](md-images/02%20-%20Class%20count-number%20animation.gif)
* The third value you need to provide is `data-to=1000`. The value until you need the counter to run. e.g.
```html
	<div
		class="timer stat-number"
		data-to="100000"
	></div>
```
* Lastly you need to add the speed of the counter using `data-speed=1500` data attribute. You can also change this speed as you need. e.g.
```html
	<div
		class="timer stat-number"
		data-to="100000"
		data-speed="1500"
	></div>
```

> That's it you are all set to see the animation like this.

  ![](md-images/03%20-%20Final%20animation%20image.gif)
