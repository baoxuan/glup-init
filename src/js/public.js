$(function(){
    var singleRate = "0.119";
 window.onload =function()
  { 
    calcDemand();
    calcTerm();
  };
$(window).on("scroll", function() {
            $(document).scrollTop() > 50 ? $(".backtop").css("visibility", "visible") : $(".backtop").css("visibility", "hidden")
        }),
$(".backtop").on("click",function(){$("body, html").animate({scrollTop:0},400)})
$(".menu").on("click", "li", function() {
            var t = $(this),
                e = t.data("type");
        t.hasClass("current") || (t.addClass("current").siblings().removeClass("current"),
         $(".menu-content").find("li").filter("[data-type=" + e + "]").addClass("current").siblings().removeClass("current"))
        });
$(".select-wrap").on("click", ".select-content", function() {
            var t = $(this),
                e = t.find(".i-select"),
                a = t.parents(".select-wrap"),
                n = a.find(".select-list");
            e.hasClass("i-select-down") ? (n.show(), e.addClass("i-select-up").removeClass("i-select-down")) : (n.hide(), e.addClass("i-select-down").removeClass("i-select-up"))
        })
$(".select-wrap").on("click", ".select-item", function() {
            var t = $(this),
                e = t.parents(".select-wrap"),
                a = e.find(".select-result"),
                n = e.find(".i-select"),
                i = t.text();
            a.text(i), t.addClass("current").siblings().removeClass("current"), n.trigger("click"), e.hasClass("term-select-wrap") && calcTerm()
        })
$(".demand-amount").on("keyup paste", function() {
            calcDemand()
        });
     $(".demand-duration").on("keyup paste", function() {
            calcDemand()
        });


    function calcDemand() {
        var e = +$.trim($(".demand-amount").val()),
            a = +$.trim($(".demand-duration").val());
        (isNaN(e) || 0 > e) && (e = 0), (isNaN(a) || 0 > a) && (a = 0), a = parseInt(a), $(".demand-expect").text("¥" +  mathUtil.formatAmount(e * Math.pow(1 + singleRate / 365, a) - e))
    }

    function calcTerm() {
        var t = $(".select-list").find(".current"),
            e = t.data("duration"),
            a = t.data("rate"),
            n = $(".term-amount").data("max"),
            i = +$.trim($(".term-amount").val());
        (isNaN(i) || 0 > i) && (i = 0), $(".term-expect").text("¥" + (i > n ? "-" : mathUtil.formatAmount(i * a * e / 365)))
    }


    var mathUtil = {
    toPercent: function(t, e) {
        if (!t) return 0;
        var e = e || 2;
        return (Math.round(t * Math.pow(10, e + 2)) / Math.pow(10, e)).toFixed(e)
    },
    formatAmount: function(e, r) {
        if (!e) return 0;
        r = r >= 0 && 20 >= r ? r : 2, e = (e + "").replace(/[^\d\.-]/g, "");
        var s = e.split(".");
        if (0 == r) e = s[0] || "0";
        else if (e.indexOf(".") >= 0) {
            if (s[1].length < r)
                for (var n = 0; n < r - s[1].length; n++) e += "0";
            else if (s[1].length > r && (e = e.substring(0, e.length - (s[1].length - r)), 0 == e.indexOf("-") && !/^0+$/.test(s[1].substring(s[1].length - r))))
                for (var n = e.length - 1; n >= 1; n--)
                    if ("." != e[n]) {
                        if ("9" != e[n]) {
                            e = e.substring(0, n) + (1 + parseInt(e[n])) + e.substring(n + 1);
                            break
                        }
                        if (e = e.substring(0, n) + "0" + e.substring(n + 1), 1 == n) {
                            e = "-1" + e.substring(1);
                            break
                        }
                    }
        } else {
            e += ".";
            for (var n = 0; r > n; n++) e += "0"
        }
        var i = e.split(".")[0].split("").reverse(),
            g = e.split(".")[1];
        for (t = "", n = 0; n < i.length; n++) t += i[n] + ((n + 1) % 3 == 0 && n + 1 != i.length ? "," : "");
        return t = r > 0 ? t.split("").reverse().join("") + "." + g : t.split("").reverse().join(""), "0" == t.indexOf("-,") && (t = "-" + t.substring(2)), t
    },
    toCredit: function(t) {
        return this.formatAmount(t, 0)
    }
};
});