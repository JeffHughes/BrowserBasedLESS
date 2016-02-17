This is very much a work in progress - don't judge me, yet!

![Image of 1CursedButton](https://raw.githubusercontent.com/JeffHughes/BrowserBasedLESS/master/bbless/src/bbless/wwwroot/images/BBLESSLogo400.jpg)

#Browser Based LESS
####Linked Encapsulated Style Sheets
###Process dynamic CSS using JQuery.

CSS doesn't natively allow extending the properties of one class to another.

But, how hard is it for JQuery to do this?
```

$(".1").addClass("2");
```

So why not use something like this (with a couple lines of that JQuery magic):

```

.button-primary {
    @bless-with btn;
    @bless-with btn-primary;
    display: block;
    margin: 5px;
}

button {
    @bless-with button-primary;
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

Suck it SASS/LESS; No pre-processors required.

###Library Features
- Allow CSS classes to {bless} (suedo-inherit) other classes
- Validate site-specific CSS usage with meaningful errors

####{Bless}ed items
{Bless}ed items have style sheet selectors that are {bless}ed with the classes of other selectors.  It works a lot like inheritence; kinda-sorta like a mixin.  But, it's not really either, we're just adding classes at run-time.

```

.button-primary {
    @bless-with btn;
    @bless-with btn-primary;
    display: block;
    margin: 5px;
}

button {
    @bless-with button-primary;
}

```

In this first example, all button elements are {bless}ed by the '.button-primary' class. The '.button-primary' class has multiple {bless}ings ('.btn' and '.btn-primary') and some additional properties. So, button elements don't need any class decorations at all in the code to receive '.btn', '.**btn**-primary' (bootstrap) and '.**button**-primary' (local) at run-time.

```

<button>Normal Button</button>
```

results in:

```

<button class="btn btn-primary" style="display: block; margin: 5px">Normal Button</button>
```

at run-time.

----

{Bless}ings can be recursive:
```

.first {
    height: 150px;
    width: 150px;
    margin: 25px;
}

.second {
    @bless-with first;
    background-color: lightgray;
}

.third {
    @bless-with second;
    border: 5px solid orange;
}

```

In the above example, the '.third' class is {bless}ed with the '.second' class (which is {bless}ed with the '.first' class).  The end result is that any item that has class="third", will get all 3 classes at run-time.

```

<div class="third" />
```

results in:

```

<div class="first second third" style="height: 150px; width: 150px; margin: 25px; background-color: lightgray; border: 5px solid orange" />
```

at run-time.

####Cursed items
Of course, there will always be the one item that just has to be different ... just add a "cursed" attribute to an item and the {bbless} library will ignore it.

![Image of 1CursedButton](https://raw.githubusercontent.com/JeffHughes/BrowserBasedLESS/master/bbless/src/bbless/wwwroot/images/bblessSample1CursedButton.png)

------------------------------
------------------------------
The second part of the library, makes sure you did it right.

##The DAMNED
The Demanded Attribute Must Not Equal Default.

####Commandments
Commandments are a list of rules that the library enforces.

For example: width must be set for items that have class="centered",
It's not a default attribute; but required for margin:auto to function properly.

Or: or assumes parent position is absolute (but it's not).

Or: used two conflicting classes (style-sin)

####Sinners
Sinners are objects that break commandments.

If a sinner breaks a commandment, the library will generate a descriptive error in the console and cause the "sinner" to pulsate red or be appended with a small set of horns.

During testing, jQuery runs thru the commandments and all the elements at run-time.

------------------------------
###Why do we need {BBLESS}?

-- I understand the need for decorating buttons as buttons, tables as tables, and sections as sections in a large library; because sometimes an &lt;a /> acts like a &lt;button />, or a &lt;div /> acts like a &lt;section />.  But, most of the time, a &lt;cigar class="cigar cigar-default"> is just a &lt;cigar />.

-LESS/SASS are great, but pre-processing adds a significant layer of complexity (which can be more trouble than it's worth - particularly in static environments).

-We're using JQuery anyway.

-Allowing the functionalty ultimately results in reduced/cleaner code.

-Works on static files.

-Light-footprint.

Ok, so it doesn't blend rgb colors and alphas, but it could be extended to do so.