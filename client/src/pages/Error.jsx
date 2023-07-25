import React, { useEffect, Fragment } from "react";
import "../css/404.css";

function Error() {

  useEffect(() => {

    let changeBodyBackground = () => {

      const bodyStyle = document.body.style;

      bodyStyle.background =
        "radial-gradient(ellipse at center, #3e2f55 0%, #1f2029 100%) fixed no-repeat";
      bodyStyle.background +=
        ",-ms-radial-gradient(ellipse at center, #3e2f55 0%, #1f2029 100%) fixed no-repeat";
      bodyStyle.background +=
        ",-moz-radial-gradient(ellipse at center, #3e2f55 0%, #1f2029 100%) fixed no-repeat";
      bodyStyle.background +=
        ",-o-radial-gradient(ellipse at center, #3e2f55 0%, #1f2029 100%) fixed no-repeat";
      bodyStyle.background +=
        ",-webkit-gradient(radial, center center, 0, center center, 497, color-stop(0, #3e2f55), color-stop(1, #1f2029))";
      bodyStyle.background +=
        ",-webkit-radial-gradient(ellipse at center, #3e2f55 0%, #1f2029 100%) fixed no-repeat";
      bodyStyle.fontFamily = "Source Sans Pro, sans-serif";
      bodyStyle.webkitFontSmoothing = "antialiased;";
      bodyStyle.margin = "0px;";
    };
    changeBodyBackground();

    $(function () {
      var liWidth = $("li").css("width");
      $("li").css("height", liWidth);
      $("li").css("lineHeight", liWidth);
      var totalHeight = $("#wordsearch").css("width");
      $("#wordsearch").css("height", totalHeight);
    });
    let causeRepaintsOn = $("h1, h2, h3, p");
    $(window).resize(function () {
      causeRepaintsOn.css("z-index", 1);
    });
    $(window).on("resize", function () {
      var liWidth = $(".one").css("width");
      $("li").css("height", liWidth);
      $("li").css("lineHeight", liWidth);
      var totalHeight = $("#wordsearch").css("width");
      $("#wordsearch").css("height", totalHeight);
    });

    $(function () {
      /* 4 */
      $(this)
        .delay(1500)
        .queue(function () {
          $(".one").addClass("selected");
          $(this).dequeue();
        })
        /* 0 */
        .delay(500)
        .queue(function () {
          $(".two").addClass("selected");
          $(this).dequeue();
        })
        /* 4 */
        .delay(500)
        .queue(function () {
          $(".three").addClass("selected");
          $(this).dequeue();
        })
        /* P */
        .delay(500)
        .queue(function () {
          $(".four").addClass("selected");
          $(this).dequeue();
        })
        /* A */
        .delay(500)
        .queue(function () {
          $(".five").addClass("selected");
          $(this).dequeue();
        })
        /* G */
        .delay(500)
        .queue(function () {
          $(".six").addClass("selected");
          $(this).dequeue();
        })
        /* E */
        .delay(500)
        .queue(function () {
          $(".seven").addClass("selected");
          $(this).dequeue();
        })
        /* N */
        .delay(500)
        .queue(function () {
          $(".eight").addClass("selected");
          $(this).dequeue();
        })
        /* O */
        .delay(500)
        .queue(function () {
          $(".nine").addClass("selected");
          $(this).dequeue();
        })
        /* T */
        .delay(500)
        .queue(function () {
          $(".ten").addClass("selected");
          $(this).dequeue();
        })
        /* F */
        .delay(500)
        .queue(function () {
          $(".eleven").addClass("selected");
          $(this).dequeue();
        })
        /* O */
        .delay(500)
        .queue(function () {
          $(".twelve").addClass("selected");
          $(this).dequeue();
        })
        /* U */
        .delay(500)
        .queue(function () {
          $(".thirteen").addClass("selected");
          $(this).dequeue();
        })
        /* N */
        .delay(500)
        .queue(function () {
          $(".fourteen").addClass("selected");
          $(this).dequeue();
        })
        /* D */
        .delay(500)
        .queue(function () {
          $(".fifteen").addClass("selected");
          $(this).dequeue();
        });
    });

  }, []);



  return (
    <>
      <div id="wrap">
      <div id="wordsearch">
        <ul>
          <li>k</li>

          <li>v</li>

          <li>n</li>

          <li>z</li>

          <li>i</li>

          <li>x</li>

          <li>m</li>

          <li>e</li>

          <li>t</li>

          <li>a</li>

          <li>x</li>

          <li>l</li>

          <li className="one">4</li>

          <li className="two">0</li>

          <li className="three">4</li>

          <li>y</li>

          <li>y</li>

          <li>w</li>

          <li>v</li>

          <li>b</li>

          <li>o</li>

          <li>q</li>

          <li>d</li>

          <li>y</li>

          <li>p</li>

          <li>a</li>

          <li className="four">p</li>

          <li className="five">a</li>

          <li className="six">g</li>

          <li className="seven">e</li>

          <li>v</li>

          <li>j</li>

          <li>a</li>

          <li className="eight">n</li>

          <li className="nine">o</li>

          <li className="ten">t</li>

          <li>s</li>

          <li>c</li>

          <li>e</li>

          <li>w</li>

          <li>v</li>

          <li>x</li>

          <li>e</li>

          <li>p</li>

          <li>c</li>

          <li>f</li>

          <li>h</li>

          <li>q</li>

          <li>e</li>

          <li className="eleven">f</li>

          <li className="twelve">o</li>

          <li className="thirteen">u</li>

          <li className="fourteen">n</li>

          <li className="fifteen">d</li>

          <li>s</li>

          <li>w</li>

          <li>q</li>

          <li>v</li>

          <li>o</li>

          <li>s</li>

          <li>m</li>

          <li>v</li>

          <li>f</li>

          <li>u</li>
        </ul>
      </div>

      <div id="main-content">
        <h1>We couldn't find what you were looking for.</h1>

        <p>Unfortunately the page you were looking for <u><b><i>“{window.location.pathname.replace(/^\//, '')}”</i></b></u> could not be found. It may be
        temporarily unavailable, moved or no longer exist.</p>

        <p>Check the URL you entered for any mistakes and try again. Alternatively, search
        for whatever is missing or take a look around the rest of our site.</p>

        {/* <div id="search">
          <form>
            <input type="text" placeholder="Search" />
          </form>
        </div> */}

        <div id="navigation">
          <a className="navigation" href="/home">Home</a>
          <a className="navigation" href="/dictionary">Dictionary</a>
          <a className="navigation" href="/about">About</a>
        </div>
      </div>
      </div>
    </>
  );
}

export default Error

//  <!--------------------------------------------------------------------------
// The MIT License (MIT)

// Copyright (c) 2023 gavra (https://codepen.io/gavra/pen/VwaNXN)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// -------------------------------------------------------------------------------->