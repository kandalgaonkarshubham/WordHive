import React, { useEffect, useRef } from 'react';
import Loader from "../../components/Loader";
import '../css/style.css';
import { Helmet } from 'react-helmet';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    (function ($) {
      var isMobile = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
          );
        },
      };

      var fullHeight = function () {
        if (!isMobile.any()) {
          $(".js-fullheight").css("height", $(window).height());
          $(window).resize(function () {
            $(".js-fullheight").css("height", $(window).height());
          });
        }
      };

      // Parallax
      var parallax = function () {
        $(window).stellar();
      };

      var contentWayPoint = function () {
        var i = 0;
        $(".animate-box").waypoint(
          function (direction) {
            if (
              direction === "down" &&
              !$(this.element).hasClass("animated-fast")
            ) {
              i++;

              $(this.element).addClass("item-animate");
              setTimeout(function () {
                $("body .animate-box.item-animate").each(function (k) {
                  var el = $(this);
                  setTimeout(
                    function () {
                      var effect = el.data("animate-effect");
                      if (effect === "fadeIn") {
                        el.addClass("fadeIn animated-fast");
                      } else if (effect === "fadeInLeft") {
                        el.addClass("fadeInLeft animated-fast");
                      } else if (effect === "fadeInRight") {
                        el.addClass("fadeInRight animated-fast");
                      } else {
                        el.addClass("fadeInUp animated-fast");
                      }

                      el.removeClass("item-animate");
                    },
                    k * 100,
                    "easeInOutExpo"
                  );
                });
              }, 50);
            }
          },
          { offset: "85%" }
        );
      };

      var skillsWayPoint = function () {
        if ($("#fh5co-skills").length > 0) {
          $("#fh5co-skills").waypoint(
            function (direction) {
              if (
                direction === "down" &&
                !$(this.element).hasClass("animated")
              ) {
                setTimeout(pieChart, 400);
                $(this.element).addClass("animated");
              }
            },
            { offset: "90%" }
          );
        }
      };

      // Loading page
      var loaderPage = function () {
        $(".fh5co-loader").fadeOut(1500);
      };

      $(function () {
        contentWayPoint();
        loaderPage();
        fullHeight();
        parallax();
        skillsWayPoint();
      });
    })(jQuery);

  }, []);

  function toggleExpand(n, link) {
    var featureCopy = document.querySelector(".feature-copy" + n);
    var featureP = document.getElementById("feature" + n);

    featureCopy.classList.toggle("expanded");

    if (featureCopy.classList.contains("expanded")) {
      featureP.style.webkitLineClamp = "unset";
    } else {
      featureP.style.webkitLineClamp = "5";
    }

    if (link) {
      link.style.display = "none";
    }

    document.addEventListener("click", function (event) {
      var featureCopy = document.querySelector(".feature-copy" + n);

      if (!featureCopy.contains(event.target)) {
        featureCopy.classList.remove("expanded");
        var featureP = document.getElementById("feature" + n);
        featureP.style.webkitLineClamp = "5";

        if (link) {
          link.style.display = "block";
        }
      }
    });
  }

  return (
    <>
    <Helmet>
        <title>A captivating web project built using ReactJs, powered by a comprehensive Word API</title>
        <meta name="description" content="As an innovative online dictionary, WordHive offers an immersive word exploration experience, providing users with an array of valuable information and linguistic insights."></meta>
    </Helmet>
      <Loader></Loader>
      <div id="page">
        <div id="fh5co-hero" className="no-js-fullheight mb-5">
          <div className="fh5co-overlay"></div>
          <div className="container">
            <div className="fh5co-intro no-js-fullheight">
              <div className="fh5co-intro-text">
                <div className="fh5co-center-position">
                  <h2 className="animate-box">About</h2>
                  {/* <!-- Background : https://www.needpix.com/photo/download/1362354/honeycomb-pattern-print-wallpaper-background-orange-geometric-scrapbooking-illustration --> */}
                  <h3 className="animate-box"></h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="fh5co-info" className="animate-box">
          <div className="container">
            <div className="row">
              <div className="col-md-12 fh5co-heading text-justify">
                <h2 className="mb-5">
                  <b>
                    <nobr>What is WordHive?</nobr>
                  </b>
                </h2>
                <p>
                  WordHive is a captivating web project built using{" "}
                  <a href="https://react.dev" target="_blank">
                    ReactJs
                  </a>
                  , powered by a comprehensive{" "}
                  <a
                    href="https://rapidapi.com/dpventures/api/wordsapi/"
                    target="_blank"
                  >
                    Word API
                  </a>{" "}
                  sourced from{" "}
                  <a href="https://rapidapi.com/" target="_blank">
                    RapidAPI
                  </a>
                  . As an innovative online dictionary, WordHive offers an
                  immersive word exploration experience, providing users with an
                  array of valuable information and linguistic insights. With
                  WordHive, users can effortlessly search for any word of
                  interest and unlock a treasure trove of lexical knowledge. The
                  application seamlessly presents a wide range of essential word
                  attributes, such as synonyms, antonyms, definitions, example
                  statements, pronunciation, and syllable breakdowns. This
                  comprehensive compilation of word-related data enables users
                  to grasp the nuances and intricacies of each term.
                </p>
              </div>
            </div>

            <div className="row row-bottom-padded-lg my-5 d-flex align-items-center">
              <div className="col-md-6">
                <figure className="animate-box">
                  <img
                    className="img-fluid rounded"
                    src="../images/vite.png"
                    alt="Created in Canva"
                  />
                </figure>
              </div>

              <div ref={aboutRef} className="col-md-6  text-justify">
                <h2 className="fh5co-lead animate-box">
                  Powerful Integration: Unleashing the Potential of React, Vite,
                  and Express
                </h2>
                <p className="fh5co-sub-lead animate-box">
                  In this project, I harnessed the combined power of React,
                  Vite, and Express to create a seamless and efficient web
                  application with the help of{" "}
                  <a
                    target="_blank"
                    href="https://github.com/NathanKr/react-vite-express-setup"
                  >
                    this
                  </a>{" "}
                  setup. Leveraging Express, I set up the backend API calls,
                  allowing for smooth communication between the frontend and the
                  word API. Express provided a robust and flexible framework for
                  handling requests and responses, enabling me to effortlessly
                  integrate the desired functionality.
                </p>
              </div>

              <div className="text-justify mx-2">
                <p className="fh5co-sub-lead animate-box">
                  On the frontend, React played a pivotal role in crafting a
                  dynamic and interactive user interface. With React's
                  component-based architecture, I designed and implemented the
                  various features of WordHive, including the word search,
                  display of word information, and visualization of word
                  relations. React's virtual DOM rendered the components
                  efficiently, ensuring optimal performance and responsiveness.
                </p>
                <p className="fh5co-sub-lead animate-box">
                  To further enhance the development process, I utilized Vite as
                  the build tool and development server. Vite's lightning-fast
                  bundling and hot module replacement capabilities expedited the
                  development cycle, resulting in a seamless development
                  experience. Vite's efficient module loading and compilation
                  mechanisms provided near-instantaneous feedback during
                  development, empowering me to iterate and fine-tune the
                  application rapidly.
                </p>
                <p className="fh5co-sub-lead animate-box">
                  In summary, Express served as the backend foundation, enabling
                  API integration, while React empowered the frontend with its
                  component-based structure and interactive elements. Vite, as
                  the build tool, significantly expedited the development
                  process, ensuring a smooth and efficient development as well
                  as User experience for WordHive.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="fh5co-features" className="animate-box">
          <div className="container text-center">
            <h2>
              <b>WordHive boasts a diverse range of impressive features</b>
            </h2>
            <div className="services-padding">
              <div className="row animate-box">
                <div className="col-md-4 animate-box fadeInUp animated-fast">
                  <div className="feature-left text-center">
                    <span className="icon">
                      <i className="icon-search"></i>
                    </span>
                    <div className="feature-copy feature-copy1">
                      <h3>Comprehensive Word Information</h3>
                      <p id="feature1">
                        WordHive provides users with detailed information about
                        searched words, including synonyms, antonyms,
                        definitions, example statements, pronunciation, and
                        syllable breakdowns
                      </p>
                      <a onClick={() => toggleExpand(1, this)}>Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 animate-box fadeInUp animated-fast">
                  <div className="feature-left text-center">
                    <span className="icon">
                      <i className="icon-flow-tree"></i>
                    </span>
                    <div className="feature-copy feature-copy2">
                      <h3>Word Relations</h3>
                      <p id="feature2">
                        Explore the intricate relationships between words and
                        phrases through WordHive. Uncover hierarchical
                        connections like "is a type of," "has types," and
                        compositional relationships such as "part of" and "is an
                        instance of." Discover similarity associations,
                        entailments, categories, usage contexts, regional
                        relevance, and more
                      </p>
                      <a onClick={() => toggleExpand(2, this)}>Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 animate-box fadeInUp animated-fast">
                  <div className="feature-left text-center">
                    <span className="icon">
                      <i className="icon-users"></i>
                    </span>
                    <div className="feature-copy feature-copy3">
                      <h3>User-Friendly Interface</h3>
                      <p id="feature3">
                        WordHive offers a seamless and intuitive user interface,
                        making it easy for users to navigate, search for words,
                        and access the desired information effortlessly. The
                        interface is thoughtfully designed to provide a visually
                        appealing and engaging platform, making WordHive a
                        delight to use for language enthusiasts of all levels
                      </p>
                      <a onClick={() => toggleExpand(3, this)}>Read More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row animate-box">
                <div className="col-md-4 animate-box fadeInUp animated-fast">
                  <div className="feature-left text-center">
                    <span className="icon">
                      <i className="icon-megaphone"></i>
                    </span>
                    <div className="feature-copy feature-copy4">
                      <h3>Word Pronunciation</h3>
                      <p id="feature4">
                        WordHive offers accurate word pronunciation for each
                        searched word using{" "}
                        <a
                          className="link"
                          target="_blank"
                          href="https://www.npmjs.com/package/elevenlabs-node"
                        >
                          Elevenlabs tts Api
                        </a>
                        . Users can listen to the correct pronunciation to
                        enhance their language learning and improve their spoken
                        language skills. This feature provides an immersive and
                        comprehensive experience, ensuring users can confidently
                        pronounce words correctly
                      </p>
                      <a onClick={() => toggleExpand(4, this)}>Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 animate-box fadeInUp animated-fast">
                  <div className="feature-left text-center">
                    <span className="icon">
                      <i className="icon-genius"></i>
                    </span>
                    <div className="feature-copy feature-copy5">
                      <h3>React-Powered Frontend</h3>
                      <p id="feature5">
                        The frontend of WordHive is built using React.js,
                        enabling a dynamic and interactive user experience.
                        React's component-based architecture facilitates the
                        development of various features, ensuring a smooth and
                        responsive interface
                      </p>
                      <a onClick={() => toggleExpand(5, this)}>Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 animate-box fadeInUp animated-fast">
                  <div className="feature-left text-center">
                    <span className="icon">
                      <i className="icon-map"></i>
                    </span>
                    <div className="feature-copy feature-copy6">
                      <h3>Frequency Scoring</h3>
                      <p id="feature6">
                        Discover the popularity and usage of words in English
                        with Zipf scores (1-7), perMillion frequency (occurrence
                        in a corpus of one million words), and diversity scores
                        (0-1). Gain valuable insights into word commonness,
                        prevalence, and usage diversity, enhancing your
                        understanding of the English language landscape
                      </p>
                      <a onClick={() => toggleExpand(6, this)}>Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer style={{"display":"block"}} className="animate-box">
          <div id="fh5co-footer" className="fh5co-bg-dark">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <i>
                      “This project, <u>WordHive</u>, is a personal endeavor
                      created for learning purposes, leveraging the power of
                      React. Throughout the development process, various
                      open-source components, libraries, and APIs have been
                      utilized to enhance the functionality and user experience.
                      Proper attribution and acknowledgments have been
                      diligently incorporated within the code, giving credit to
                      the respective authors and contributors.
                    </i>
                  </p>
                  <p>
                    <i>
                      WordHive is not intended for commercial purposes, but
                      rather as a showcase of knowledge and exploration in the
                      realm of Web Development.”
                    </i>
                  </p>
                  <p><a style={{color:'#2f3c4f'}} href="https://github.com/kandalgaonkarshubham/WordHive" target="_blank">WordHive Github Repository</a></p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default About



// <!-------------------------------------------- 
// Profile - FREE HTML5 TEMPLATE 
// DESIGNED & DEVELOPED by FreeHTML5.co
    
// Website: 		http://freehtml5.co/
// Email: 			info@freehtml5.co
// Twitter: 		http://twitter.com/fh5co
// Facebook: 		https://www.facebook.com/fh5co
// ---------------------------------------------->