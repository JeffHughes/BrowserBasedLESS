/*******************************************************
 * Copyright (C) 2016 Jeff Hughes <me@jeffhughes.com>
 *
 * This file is part of BBLESS.   http://BBLESS.net
 *
 * License: http://opensource.org/licenses/MIT
 *******************************************************/

var blessExtendedClasses = new Object();

function getDomain(url) {
    if (url === null) return "";

    url = url.replace(/https?:\/\/(www.)?/i, '');
    if (url.indexOf('/') === -1) {
        return url;
    }

    return url.split('/')[0];
}

function recursionCheck(extClass) {
    if (blessExtendedClasses.hasOwnProperty(extClass)) {
        // console.log("recursive found: " + extClass + " " + $("." + extClass).length);

        var appendClasses = blessExtendedClasses[extClass].split(",");

        $.each(appendClasses, function (i, e) {
            $.each($("." + extClass).get(), function (i2, e2) {
                if ($(e2).attr('cursed') === undefined)
                    $(e2).addClass(e.trim());
            });

            recursionCheck(blessExtendedClasses[extClass]);
        });
    }
}

function ParseClasses(classes) {
    $.each(classes,
      function (i, e) {
          var split1 = e.split("{");
          var className = split1[0];
          if (className !== undefined)
              className = className.trim();

          var AllProps = split1[1];
          if (AllProps !== undefined)
              AllProps = AllProps.trim();

          if (AllProps !== undefined) {
              if (AllProps.indexOf(";") > -1)
                  var props = AllProps.split(";");
              else
                  var props = AllProps;

              $.each(props, function (propIndex, prop) {
                  if (prop !== undefined)
                      if (prop.indexOf("@bless-with") > -1) {
                          var extClass = prop.replace("@bless-with", "").trim();
                          // console.log(className + " is blessed by " + extClass + " applying to " + $(className).length);

                          $(className).addClass(extClass);

                          recursionCheck(extClass);

                          var key = className.replace(".", "");

                          if (blessExtendedClasses.hasOwnProperty(key)) {
                              blessExtendedClasses[key] += "," + extClass;
                          } else {
                              blessExtendedClasses[key] = extClass;
                          }
                      }
              });
          }
      });
}

$(function () {
    var classes = $("style").text().split("}");
    ParseClasses(classes);

    $.each(document.styleSheets, function (i, e) {
        //console.log(i + " " + e.href + " " + getDomain(e.href) + " " + document.location.host);

        if (getDomain(e.href) === document.location.host) {
            //console.log(" found a local style sheet ");

            $.get(e.href, function (data) {
                ParseClasses(data.split("}"));
            });
        }
    });
});