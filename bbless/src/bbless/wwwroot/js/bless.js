//Browser Based LESS
//Jeff Hughes

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
        console.log("recursive found: " + extClass + " " + $("." + extClass).length);

        var appendClasses = blessExtendedClasses[extClass].split(",");

        $.each(appendClasses, function (i, e) {
            $.each($("." + extClass).get(), function (i2, e2) {
                var ele = $(e2);

                var attr = $(e2).attr('cursed');

                console.log("attr: " + attr);

                if ($(e2).attr('cursed') === undefined) {
                    ele.addClass(e.trim());
                    console.log(extClass + " extends " + blessExtendedClasses[extClass] + " applying to " + i2);
                } else {
                    console.log(extClass + " extends " + blessExtendedClasses[extClass] + " cursed on " + i2);
                }
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
                      if (prop.indexOf("@bbless") > -1) {
                          var extClass = prop.replace("@bbless", "").trim();
                          console.log(className + " extends " + extClass + " applying to " + $(className).length);

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
        console.log(i + " " + e.href + " " + getDomain(e.href) + " " + document.location.host);

        if (getDomain(e.href) === document.location.host) {
            console.log(" found a local style sheet ");

            $.get(e.href, function (data) {
                ParseClasses(data.split("}"));
            });
        }
    });
});