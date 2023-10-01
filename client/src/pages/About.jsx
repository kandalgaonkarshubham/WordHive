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

  function openGitRepo() {
    let urlToOpen = 'https://github.com/kandalgaonkarshubham/WordHive';
    window.open(urlToOpen, '_blank');
  }

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
                  {/* <p><a style={{color:'#2f3c4f'}} href="https://github.com/kandalgaonkarshubham/WordHive" target="_blank">WordHive Github Repository</a></p> */}
                  <button onClick={openGitRepo} class="GithubBtn">
                  <svg class="GithubsvgIcon" viewBox="0 0 496 512" height="1.4em" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                  <span class="Githubtext">Github</span>
                </button>
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