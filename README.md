This is very much a work in progress - don't judge me, yet!

![Image of 1CursedButton](https://raw.githubusercontent.com/JeffHughes/BrowserBasedLESS/master/bbless/src/bbless/wwwroot/images/BBLESSLogo400.jpg)

# Browser Based LESS
Process dynamic CSS using JQuery.

Most of the time, in my code a &lt;cigar class="cigar cigar-default"> is just a &lt;cigar />.

How hard is it for JQuery to do this?
```

$(".1").addClass("2");
```

So why not use something like this:

```

.button-primary {
    @bbless btn;
    @bbless btn-primary;
    display: block;
    margin: 5px;
}

button {
    @bbless button-primary;
}

```

to write code like this:

```

<button>Normal Button</button>
```

instead of like this:

```

<button class="btn btn-primary" style="display: block; margin: 5px">Normal Button</button>
```

with a couple lines of JQuery magic?

Allowing the functionalty ultimately results in reduced code.

###Libarary Features
- Allow CSS classes to "bbless" (suedo-inherit) other classes
- Validate site-specific CSS usage with meaningful errors

####BBlessed items
BBlessed items are selectors that are "BBlessed" with the classes of other selectors.  It works a lot like inheritence.  But, it's not really inheritence, we're just adding classes using our own keywords for clarity.

```

.button-primary {
    @bbless btn;
    @bbless btn-primary;
    display: block;
    margin: 5px;
}

button {
    @bbless button-primary;
}

```

In this first example, all button elements are "bblessed" by the .button-primary class.  Selectors can have multiple "bblessings".

"bblessings" can be recursive:
```

.first {
    height: 150px;
    width: 150px;
    margin: 25px;
}

.second {
    @bbless first;
    background-color: lightgray;
}

.third {
    @bbless second;
    border: 5px solid orange;
}

```

In the above example, the 'third' class is "bblessed" by the 'second' class (which is "bblessed" by the 'first' class).  The end result is that any item that has class="third", will get all 3 classes at run-time.

####Cursed items
Of course, there will always be the one item that just has to be different ... just add a "cursed" attribute and the bbless library will ignore it.  But, remember, you'll have to add all those classes and styles back in manually for curesed items.

![Image of 1CursedButton](https://raw.githubusercontent.com/JeffHughes/BrowserBasedLESS/master/bbless/src/bbless/wwwroot/images/bblessSample1CursedButton.png)

The second part of the library, makes sure you did it right.

####Commandments
Commandments are a list of rules that the library enforces.

For example: width must be set for items that have class centered

If not, the library will generate a handy and descriptive error in the console and cause the "sinner" to pulsate red or be appended with a small set of horns.

####Sinners
Sinners are objects that break commandments.

####The Damned

####Why
-CSS doesn't natively allow extending the properties of one class to another.

-LESS/SASS do and they're great, but they add a significant layer of complexity (which can be more trouble than it's worth - particularly in static environments).

-I got tired of decorating buttons as buttons, tables as tables, and sections as sections.  I understand the need for it in a large library; because sometimes an &lt;a /> acts like a &lt;button />, or a &lt;div /> acts like a &lt;section />.