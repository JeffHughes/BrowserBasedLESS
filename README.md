This is very much a work in progress - don't judge me, yet!

![Image of 1CursedButton](https://raw.githubusercontent.com/JeffHughes/BrowserBasedLESS/master/bbless/src/bbless/wwwroot/images/BBLESSLogo400.jpg)

# BrowserBasedLESS
Process dynamic CSS using JQuery.

I got tired of decorating buttons as buttons, tables as tables, and sections as sections.  I understand the need for it in a large library; because sometimes an &lt;a /> is a button.  But, most of the time, a &lt;cigar class="cigar cigar-default"> is just a &lt;cigar />

CSS doesn't natively allow extending the properties of one class to another.

But, how hard is it for jquery to do this?
```
onload
$(".1").addClass("2");
```

So why not write code like this:

```
html
<button>Normal Button</button>
```

instead of like this:

```
html
<button class="btn btn-primary">Normal Button</button>
```

using

```
css
<style>
    .button-primary {
        @bbless btn;
        @bbless btn-primary;
        display: block;
        margin: 5px;
    }

    button {
        @bbless button-primary;
    }
</style>
```

and a couple lines of JQuery magic?

###Features
- Allow CSS classes to inherit other classes
- Validate CSS usage with meaningful console errors

@@bbless

####cursed items
Of course, there will always be

![Image of 1CursedButton](https://raw.githubusercontent.com/JeffHughes/BrowserBasedLESS/master/bbless/src/bbless/wwwroot/images/bblessSample1CursedButton.png)