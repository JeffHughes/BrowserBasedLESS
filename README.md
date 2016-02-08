This is very much a work in progress - don't judge me, yet!

![Image of 1CursedButton](https://raw.githubusercontent.com/JeffHughes/BrowserBasedLESS/master/bbless/src/bbless/wwwroot/images/BBLESSLogo400.jpg)

# BrowserBasedLESS
Process dynamic CSS using JQuery.

I got tired of decorating buttons as buttons, tables as tables, and sections as sections.  I understand the need for it in a large library; because sometimes an &lt;a /> acts like a &lt;button />, or a &lt;div /> acts like a &lt;section />.  But, most of the time, in my code a &lt;cigar class="cigar cigar-default"> is just a &lt;cigar />.

CSS doesn't natively allow extending the properties of one class to another.

But, how hard is it for jquery to do this?
```

$(".1").addClass("2");
```

So why not write code like this:

```

<button>Normal Button</button>
```

instead of like this:

```

<button class="btn btn-primary">Normal Button</button>
```

using

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

and a couple lines of JQuery magic?

###Features
- Allow CSS classes to inherit other classes
- Validate site-specific CSS usage with meaningful errors

####BBlessed items
BBlessed items are selectors that are "BBlessed" with the classes of other selectors.  It works a lot like inheritence.  But, it's not really inheritence, we're just adding classes to objects that have other classes.  So, we'll use that familiar LESS like variable structure with our own keywords for clarity.

Selectors can have multiple "bblessings"
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
In this first example, all button elements are "bblessed" by the .button-primary class.

"bblessings" can be recursive.
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

In the above example, the 'third' class is "bblessed" by the 'second' class (which is "bblessed" by the 'first' class).

####Cursed items
Of course, there will always be the one item that just has to be different ... just add a "cursed" attribute and BBLESS wont add all the classes back in.  But, remember, you'll have to do it yourself.

![Image of 1CursedButton](https://raw.githubusercontent.com/JeffHughes/BrowserBasedLESS/master/bbless/src/bbless/wwwroot/images/bblessSample1CursedButton.png)

The second part of the library, makes sure you did it right.

####Commandments
Commandments are a list of rules that the library enforces.

For example: width must be set for items that have class centered

If not, the library will generate a handy and descriptive error in the console and cause the "sinner" to pulsate red or be appended with a small set of horns.

####Sinners

####The Damned