import React, { useEffect, useState, useRef } from "react";
import { Tooltip } from "react-tooltip";
import { animateScroll as scroll, scroller } from "react-scroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../../components/Loader";
import '../css/style.css';


function Dictionary() {
  const [searchInput, setSearchInput] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [jsonResponse, setJsonResponse] = useState({});
  const [fetching, setFetching] = useState(false);
  const frequencyRef = useRef(null);
  const header = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const urlWithProxy = "https://wordhive.dev/search";
  const urlWithProxyTTS = "https://wordhive.dev/tts";
  

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        document.getElementById("updateFrequency").click();
      }
    });
    if (frequencyRef.current) {
      observer.observe(frequencyRef.current);
    }

    let contentWayPoint;

    contentWayPoint = () => {
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

    contentWayPoint();

    // -------------------------------------Header Nodes---------------------------------------------------------------

    /* !
<!--The MIT License(MIT)

Copyright(c) 2023 Pawel(https://codepen.io/pawelqcm/pen/oxPYox)

  Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files(the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. -->
*/

    (function () {
      var canvas,
        ctx,
        circ,
        nodes,
        mouse,
        SENSITIVITY,
        SIBLINGS_LIMIT,
        DENSITY,
        NODES_QTY,
        ANCHOR_LENGTH,
        MOUSE_RADIUS;

      // how close next node must be to activate connection (in px)
      // shorter distance == better connection (line width)
      SENSITIVITY = 100;
      // note that siblings limit is not 'accurate' as the node can actually have more connections than this value that's because the node accepts sibling nodes with no regard to their current connections this is acceptable because potential fix would not result in significant visual difference
      // more siblings == bigger node
      SIBLINGS_LIMIT = 20;
      // default node margin
      DENSITY = 50;
      // total number of nodes used (incremented after creation)
      NODES_QTY = 0;
      // avoid nodes spreading
      ANCHOR_LENGTH = 20;
      // highlight radius
      MOUSE_RADIUS = 200;

      circ = 2 * Math.PI;
      nodes = [];

      canvas = document.querySelector("canvas");
      resizeWindow();
      mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2,
      };
      ctx = canvas.getContext("2d");
      if (!ctx) {
        alert("Ooops! Your browser does not support canvas :'(");
      }

      function Node(x, y) {
        this.anchorX = x;
        this.anchorY = y;
        this.x =
          Math.random() * (x - (x - ANCHOR_LENGTH)) + (x - ANCHOR_LENGTH);
        this.y =
          Math.random() * (y - (y - ANCHOR_LENGTH)) + (y - ANCHOR_LENGTH);
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.energy = Math.random() * 100;
        this.radius = Math.random();
        this.siblings = [];
        this.brightness = 0;
      }

      Node.prototype.drawNode = function () {
        var color = "rgba(96, 73, 131, " + this.brightness + ")";
        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          2 * this.radius + (2 * this.siblings.length) / SIBLINGS_LIMIT,
          0,
          circ
        );
        ctx.fillStyle = color;
        ctx.fill();
      };

      Node.prototype.drawConnections = function () {
        for (var i = 0; i < this.siblings.length; i++) {
          var color = "rgba(129, 103, 169, " + this.brightness + ")";
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.siblings[i].x, this.siblings[i].y);
          ctx.lineWidth =
            1 - calcDistance(this, this.siblings[i]) / SENSITIVITY;
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      };

      Node.prototype.moveNode = function () {
        this.energy -= 2;
        if (this.energy < 1) {
          this.energy = Math.random() * 100;
          if (this.x - this.anchorX < -ANCHOR_LENGTH) {
            this.vx = Math.random() * 2;
          } else if (this.x - this.anchorX > ANCHOR_LENGTH) {
            this.vx = Math.random() * -2;
          } else {
            this.vx = Math.random() * 4 - 2;
          }
          if (this.y - this.anchorY < -ANCHOR_LENGTH) {
            this.vy = Math.random() * 2;
          } else if (this.y - this.anchorY > ANCHOR_LENGTH) {
            this.vy = Math.random() * -2;
          } else {
            this.vy = Math.random() * 4 - 2;
          }
        }
        this.x += (this.vx * this.energy) / 100;
        this.y += (this.vy * this.energy) / 100;
      };

      function initNodes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes = [];
        for (var i = DENSITY; i < canvas.width; i += DENSITY) {
          for (var j = DENSITY; j < canvas.height; j += DENSITY) {
            nodes.push(new Node(i, j));
            NODES_QTY++;
          }
        }
      }

      function calcDistance(node1, node2) {
        return Math.sqrt(
          Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
        );
      }

      function findSiblings() {
        var node1, node2, distance;
        for (var i = 0; i < NODES_QTY; i++) {
          node1 = nodes[i];
          node1.siblings = [];
          for (var j = 0; j < NODES_QTY; j++) {
            node2 = nodes[j];
            if (node1 !== node2) {
              distance = calcDistance(node1, node2);
              if (distance < SENSITIVITY) {
                if (node1.siblings.length < SIBLINGS_LIMIT) {
                  node1.siblings.push(node2);
                } else {
                  var node_sibling_distance = 0;
                  var max_distance = 0;
                  var s;
                  for (var k = 0; k < SIBLINGS_LIMIT; k++) {
                    node_sibling_distance = calcDistance(
                      node1,
                      node1.siblings[k]
                    );
                    if (node_sibling_distance > max_distance) {
                      max_distance = node_sibling_distance;
                      s = k;
                    }
                  }
                  if (distance < max_distance) {
                    node1.siblings.splice(s, 1);
                    node1.siblings.push(node2);
                  }
                }
              }
            }
          }
        }
      }

      function redrawScene() {
        resizeWindow();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        findSiblings();
        var i, node, distance;
        for (i = 0; i < NODES_QTY; i++) {
          node = nodes[i];
          distance = calcDistance(
            {
              x: mouse.x,
              y: mouse.y,
            },
            node
          );
          if (distance < MOUSE_RADIUS) {
            node.brightness = 1 - distance / MOUSE_RADIUS;
          } else {
            node.brightness = 0;
          }
        }
        for (i = 0; i < NODES_QTY; i++) {
          node = nodes[i];
          if (node.brightness) {
            node.drawNode();
            node.drawConnections();
          }
          node.moveNode();
        }
        requestAnimationFrame(redrawScene);
      }

      function initHandlers() {
        document.addEventListener("resize", resizeWindow, false);
        canvas.addEventListener("mousemove", mousemoveHandler, false);
      }

      function resizeWindow() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      function mousemoveHandler(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }

      initHandlers();
      initNodes();
      redrawScene();
    })();


}, []);

  // Function to format the JSON response object
  function formatJsonResponse(response) {
    const formattedResponse = {};

    // Word
    formattedResponse.word = response[""].word || "";

    // Syllables
    formattedResponse.syllables = response[""].syllables?.list
      ? response[""].syllables.list.join("-")
      : "";
    formattedResponse.syllablesCount = response[""].syllables?.count || 0;

    // Pronunciation
    formattedResponse.pronunciation = response[""].pronunciation || {};
    formattedResponse.pronunciationTypes = Object.keys(
      response[""].pronunciation || {}
    );

    // Definitions
    formattedResponse.definitions =
      response.definitions?.definitions?.map(
        (definition) => definition.definition
      ) || [];

    // Part of Speech (as a Set)
    formattedResponse.partOfSpeech = new Set(
      response.definitions?.definitions?.map(
        (definition) => definition.partOfSpeech
      ) || []
    );

    // Synonyms
    formattedResponse.synonyms = response.synonyms?.synonyms || [];

    // Antonyms
    formattedResponse.antonyms = response.antonyms?.antonyms || [];

    // Rhymes
    formattedResponse.rhymes = response.rhymes?.rhymes?.all || [];

    // Examples
    formattedResponse.examples = response.examples?.examples || [];

    // Frequency
    formattedResponse.frequency = {
      scores: response.frequency?.frequency || 0,
      average: response[""].frequency,
    };

    // TypeOf
    formattedResponse.typeOf = response.typeOf?.typeOf || [];

    // HasParts
    formattedResponse.hasParts = response.hasParts?.hasParts || [];

    // InstanceOf
    formattedResponse.instanceOf = response.instanceOf?.instanceOf || [];

    // HasInstances
    formattedResponse.hasInstances = response.hasInstances?.hasInstances || [];

    // SimilarTo
    formattedResponse.similarTo = response.similarTo?.similarTo || [];

    // Also
    formattedResponse.also = response.also?.also || [];

    // Entails
    formattedResponse.entails = response.entails?.entails || [];

    // MemberOf
    formattedResponse.memberOf = response.memberOf?.memberOf || [];

    // HasMembers
    formattedResponse.hasMembers = response.hasMembers?.hasMembers || [];

    // SubstanceOf
    formattedResponse.substanceOf = response.substanceOf?.substanceOf || [];

    // HasSubstances
    formattedResponse.hasSubstances =
      response.hasSubstances?.hasSubstances || [];

    // InCategory
    formattedResponse.inCategory = response.inCategory?.inCategory || [];

    // HasCategories
    formattedResponse.hasCategories =
      response.hasCategories?.hasCategories || [];

    // UsageOf
    formattedResponse.usageOf = response.usageOf?.usageOf || [];

    // HasUsages
    formattedResponse.hasUsages = response.hasUsages?.hasUsages || [];

    // InRegion
    formattedResponse.inRegion = response.inRegion?.inRegion || [];

    // RegionOf
    formattedResponse.regionOf = response.regionOf?.regionOf || [];

    // PertainsTo
    formattedResponse.pertainsTo = response.pertainsTo?.pertainsTo || [];

    return formattedResponse;
  }
  // Function to reset the JSON response object
  function resetJsonResponse() {
    setJsonResponse({
      word: "",
      synonyms: [],
      antonyms: [],
      rhymes: [],
      definitions: [],
      examples: [],
      pronunciation: {},
      syllables: {},
      frequency: {},
      typeOf: [],
      hasParts: [],
      instanceOf: [],
      hasInstances: [],
      similarTo: [],
      also: [],
      entails: [],
      memberOf: [],
      hasMembers: [],
      substanceOf: [],
      hasSubstances: [],
      inCategory: [],
      hasCategories: [],
      usageOf: [],
      hasUsages: [],
      inRegion: [],
      regionOf: [],
      pertainsTo: [],
    });
  }
  // Information object that consists Titles and Descriptions of Word Relationships
  const information = {
    typeOf: {
      title: "Is a Type Of",
      desc: "Words that are more general than the given word",
    },
    hasTypes: {
      title: "Has Types",
      desc: "More specific examples of types of the given word",
    },
    partOf: {
      title: "Part Of",
      desc: "The larger whole to which the word belongs",
    },
    hasParts: {
      title: "Has Parts",
      desc: "Words that are parts of the given word",
    },
    instanceOf: {
      title: "Is an Instance Of",
      desc: "Words that the given word is an example of",
    },
    hasInstances: {
      title: "Has Instances",
      desc: "Words that are examples of the parameter word",
    },
    similarTo: {
      title: "Similar To",
      desc: "Words that are similar to the given word, but are not synonyms",
    },
    also: {
      title: "Also",
      desc: "Phrases of which the word is a part",
    },
    entails: {
      title: "Entails",
      desc: "Words that are implied by the given word. Usually used for verbs",
    },
    memberOf: {
      title: "Member Of",
      desc: "A group to which the word belongs",
    },
    hasMembers: {
      title: "Has Members",
      desc: "Words that belong to the group defined by the given word",
    },
    substanceOf: {
      title: "Substance Of",
      desc: "Substances to which the given word is a part of",
    },
    hasSubstances: {
      title: "Has Substances",
      desc: "Words that are substances of the given word",
    },
    inCategory: {
      title: "In Category",
      desc: "The domain category to which the given word belongs",
    },
    hasCategories: {
      title: "Has Categories",
      desc: "Categories of the given word",
    },
    usageOf: {
      title: "Usage Of",
      desc: "Words that the given word is a domain usage of",
    },
    hasUsages: {
      title: "Has Usages",
      desc: "Words that are examples of the domain the given word defines",
    },
    inRegion: {
      title: "In Region",
      desc: "Geographical areas where the word is used",
    },
    regionOf: {
      title: "Region Of",
      desc: "Words used in the specified geographical area",
    },
    pertainsTo: {
      title: "Pertains To",
      desc: "Words to which the given word is relevant",
    },
  };

  // Access frequency values directly from jsonResponse
  const averageValue = jsonResponse.frequency?.average || 0;
  const zipfValue = jsonResponse.frequency?.scores?.zipf || 0;
  const perMillionValue = jsonResponse.frequency?.scores?.perMillion || 0;
  const diversityValue = jsonResponse.frequency?.scores?.diversity || 0;
  // Update bootstrap progressbars
  function updateFrequency() {
    $(".chart")
      .data("easyPieChart")
      .update(Math.round((averageValue / 8) * 100));
    // document.getElementById('zipf').setAttribute('style','width:'+Math.round(zipfValue*10)+'%');
    // document.getElementById('million').setAttribute('style','width:'+(perMillionValue / 1000000) * 100+'%');
    // document.getElementById('diversity').setAttribute('style','width:'+(diversityValue / 1) * 100+'%');
    $("#zipf").animate({ width: `${Math.round(zipfValue * 10)}%` }, 2500);
    $("#million").animate(
      { width: `${Math.round((perMillionValue / 1000000) * 1000000)}%` },
      2500
    );
    $("#diversity").animate({ width: `${(diversityValue / 1) * 10}%` }, 2500);
  }

  const smoothScrollToElement = (elementId) => {
    scroller.scrollTo(elementId, {
      duration: 800, // Duration of the smooth scroll animation in milliseconds
      delay: 0, // Delay before starting the smooth scroll animation in milliseconds
      smooth: "easeInOutQuart", // Easing function for the smooth scroll animation
    });
  };

  const pushNotification = (msg, type) => {
    const toastOptions = {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    };

    switch (type) {
      case "error":
        toast.error(msg, toastOptions);
        break;
      case "warning":
        toast.warn(msg, toastOptions);
        break;
      // Add more cases for different notification types if needed
      default:
        toast.info(msg, toastOptions);
        break;
    }
  };

  function getDataFromServer(searchInput) {
    setSearchWord(searchInput);
    resetJsonResponse();
    setIsSuccess(false);

    axios
      .get(urlWithProxy, {
        params: { searchWord: searchInput },
      })
      .then((res) => {
        const formattedResponse = formatJsonResponse(res.data);
        setJsonResponse(formattedResponse);
        setFetching(false);
        document
          .getElementById("searchbar")
          .setAttribute("style", "pointer-events:all !important");

        setupCarousel();
        setIsSuccess(true);
        smoothScrollToElement("smoothFocus");
        // console.log(jsonResponse);
        // console.log(res.data);
      })
      .catch((err) => {
        setFetching(false);
        document
          .getElementById("searchbar")
          .setAttribute("style", "pointer-events:all !important");

        setIsSuccess(false);

        // Show the error notification for status code 500
        // Show the error notification for specific status codes
        if (err.response?.status === 500) {
          const errorMessage =
            err.response?.data?.error || "An error occurred during the request";
          pushNotification(errorMessage, "error");
        } else if (err.response?.status === 502) {
          const errorMessage = "Api Key is Not set, Redirecting you to Activation Portal";
          pushNotification(errorMessage, "warning");
          setTimeout(() => {
            window.location.replace("https://wordhive.app/activate");
          }, 5000);
        } else if (err.request) {
          // Handle network errors (e.g., no internet connection)
          const errorMessage = "Network error. Please check your internet connection.";
          pushNotification(errorMessage, "error");
        } else {
          const errorMessage = "An unknown error occurred.";
          console.log(err)
          pushNotification(errorMessage, "error");
        }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (searchInput !== "") {
      setFetching(true);
      document
        .getElementById("searchbar")
        .setAttribute("style", "pointer-events:none !important");
      getDataFromServer(searchInput);
      // console.log(searchInput); // Loggin the InputTag value after submit
      setSearchInput(""); // Clear the search input value using the state setter
      header.current.focus(); // Loose focus from Input__container
    }
  }
  function handleInputChange(event) {
    setSearchInput(event.target.value);
  }

  const playAudio = (pronun) => {
    axios
      .get(urlWithProxyTTS, {
        params: {
          text: pronun,
        },
      })
      .then((response) => {
        const audio = new Audio(response.data.audioSrc);
        audio.play();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Render word relationships
  const renderWordRelationships = () => {
    const relationshipProperties = [
      "partOfSpeech",
      "typeOf",
      "hasParts",
      "instanceOf",
      "hasInstances",
      "similarTo",
      "also",
      "entails",
      "memberOf",
      "hasMembers",
      "substanceOf",
      "hasSubstances",
      "inCategory",
      "hasCategories",
      "usageOf",
      "hasUsages",
      "inRegion",
      "regionOf",
      "pertainsTo",
    ];

    const relationships = relationshipProperties.filter(
      (property) => jsonResponse[property] && jsonResponse[property].length > 0
    );

    if (relationships.length === 0) {
      return (
        <p className="err">
          <i className="fa-solid fa-triangle-exclamation"></i> We regret to
          inform you that no relationships are available for the provided word
          within our records <i className="fa-solid fa-face-sad-tear"></i>
        </p>
      );
    }

    return (
      <div className="relation-timeline">
        {relationships.map((property, index) => (
          <div className="board" key={index}>
            <span className="icon fa-solid fa-book-open-reader"></span>
            <div className="board-content">
              <h3 className="title">
                {information[property]?.title || property}{" "}
                {information[property] && (
                  <i
                    className="fa-regular fa-circle-question"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={information[property]?.desc || ""}
                  ></i>
                )}
              </h3>
              <p className="description">
                {jsonResponse[property].map((item, index) => (
                  <span className="badge m-2" key={index}>
                    {item}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Funtions From search.js

  (function () {

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

    var goToTop = function () {
      $(".js-gotop").on("click", function (event) {
        event.preventDefault();

        $("html, body").animate(
          {
            scrollTop: $("html").offset().top,
          },
          500,
          "easeInOutExpo"
        );

        return false;
      });

      $(window).scroll(function () {
        var $win = $(window);
        if ($win.scrollTop() > 200) {
          $(".js-top").addClass("active");
        } else {
          $(".js-top").removeClass("active");
        }
      });
    };

    var pieChart = function () {
      $(".chart").easyPieChart({
        scaleColor: false,
        lineWidth: 4,
        lineCap: "butt",
        barColor: "#FF9000",
        trackColor: "#f5f5f5",
        size: 160,
        animate: 3500,
      });
    };

    var skillsWayPoint = function () {
      if ($("#fh5co-skills").length > 0) {
        $("#fh5co-skills").waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
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
      goToTop();
      loaderPage();
      fullHeight();
      parallax();
      pieChart();
      skillsWayPoint();
    });
  })();

  // ---------------------------------------- Search Bar ---------------------------------------------------------

  // ---------------------------------------- Example Slider ---------------------------------------------------------
  function setupCarousel() {
    // Get all the testimonial labels and dots labels
    const testimonialsLabels = Array.from(
      document.querySelectorAll('.testimonials label[for^="t-"]')
    );
    const dotsLabels = Array.from(
      document.querySelectorAll('.dots label[for^="t-"]')
    );

    // Function to apply the initial styles
    function applyInitialStyles() {
      testimonialsLabels.forEach((label, index) => {
        if (index === 0) {
          label.style.transform = "translate3d(0, 0, 0)";
          label.style.zIndex = "4";
        } else {
          label.style.transform = `translate3d(${
            index * 300
          }px, 0, -90px) rotateY(${-index * 15}deg)`;
          label.style.zIndex = "1";
        }
      });

      dotsLabels[0].classList.add("active");
    }

    // Function to handle the checked state
    function handleCheckedState() {
      const checkedValue = this.id;

      testimonialsLabels.forEach((label, index) => {
        const offset =
          index -
          testimonialsLabels.findIndex(
            (item) => item.getAttribute("for") === checkedValue
          );

        if (offset === 0) {
          label.style.transform = "translate3d(0, 0, 0)";
          label.style.zIndex = "4";
        } else {
          const translateX =
            offset > 0 ? `${offset * 300}px` : `${Math.abs(offset) * -300}px`;
          const rotateY =
            offset > 0 ? `${offset * -15}deg` : `${Math.abs(offset) * 15}deg`;
          label.style.transform = `translate3d(${translateX}, 0, -90px) rotateY(${rotateY})`;
          label.style.zIndex = offset === 1 ? "3" : "1";

          // Set zIndex of the 3rd label to 0 when the first dot is checked
          if (offset === -2 && checkedValue === "t-1") {
            label.style.zIndex = "0";
          }
        }
      });

      dotsLabels.forEach((label) => {
        if (label.getAttribute("for") === checkedValue) {
          label.classList.add("active");
        } else {
          label.classList.remove("active");
        }
      });
    }

    // Attach event listener to each testimonial input
    testimonialsLabels.forEach((label) => {
      const inputId = label.getAttribute("for");
      const input = document.getElementById(inputId);
      input.addEventListener("change", handleCheckedState);
    });

    // Apply initial styles on page load
    applyInitialStyles();

    // Attach event listener to each testimonial input
    testimonialsLabels.forEach((label) => {
      const inputId = label.getAttribute("for");
      const input = document.getElementById(inputId);
      input.addEventListener("change", handleCheckedState);
    });
  }
  // -------------------------------------Custom Bootstrap ProgressBar-----------------------------------------------

  $(".progress .progress-bar").progressbar(); // bootstrap 3



  return (
    <>
      <Loader></Loader>
      <Tooltip id="my-tooltip" />
      <ToastContainer newestOnTop />

      <div id="page">
        <header
          tabIndex={1}
          ref={header}
          id="fh5co-header"
          className="fh5co-cover js-fullheight"
          role="banner"
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay"></div>
          <canvas></canvas>
          <div style={{ pointerEvents: "none" }} className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-md-8 col-md-offset-2 text-center">
                <div className="display-t js-fullheight">
                  <div
                    className="display-tc js-fullheight animate-box"
                    data-animate-effect="fadeIn"
                  >
                    <div className="profile-thumb"></div>
                    <h1>
                      <span>
                        Let your mind thrive, with knowledge from WordHive
                      </span>
                    </h1>
                    <br />
                    <h3 id="phrasesCarousel">
                      The key to unlocking knowledge lies in the search for a
                      single word
                    </h3>
                    <br />
                    <form onSubmit={handleSubmit}>
                      <div
                        id="searchbar"
                        className="d-flex justify-content-center"
                      >
                        <div tabIndex={1} className="input__container">
                          <div className="shadow__input"></div>
                          <button
                            type="submit"
                            className="input__button__shadow"
                          >
                            {fetching ? (
                              <svg
                                id="svgloader"
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                              >
                                <circle cx="24" cy="4" r="4" fill="#8066a9" />
                                <circle
                                  cx="12.19"
                                  cy="7.86"
                                  r="3.7"
                                  fill="#7e5f9c"
                                />
                                <circle
                                  cx="5.02"
                                  cy="17.68"
                                  r="3.4"
                                  fill="#7d5891"
                                />
                                <circle
                                  cx="5.02"
                                  cy="30.32"
                                  r="3.1"
                                  fill="#7b5184"
                                />
                                <circle
                                  cx="12.19"
                                  cy="40.14"
                                  r="2.8"
                                  fill="#7a4a77"
                                />
                                <circle
                                  cx="24"
                                  cy="44"
                                  r="2.5"
                                  fill="#78436a"
                                />
                                <circle
                                  cx="35.81"
                                  cy="40.14"
                                  r="2.2"
                                  fill="#763c5d"
                                />
                                <circle
                                  cx="42.98"
                                  cy="30.32"
                                  r="1.9"
                                  fill="#743551"
                                />
                                <circle
                                  cx="42.98"
                                  cy="17.68"
                                  r="1.6"
                                  fill="#722e44"
                                />
                                <circle
                                  cx="35.81"
                                  cy="7.86"
                                  r="1.3"
                                  fill="#302541"
                                />
                              </svg>
                            ) : (
                              <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                height="20px"
                                width="20px"
                              >
                                <path
                                  d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
                                  fillRule="evenodd"
                                  fill="#17202A"
                                ></path>
                              </svg>
                            )}
                          </button>
                          <input
                            type="text"
                            name="searchinput"
                            className="input__search"
                            placeholder="Explore the Word Maze..."
                            onChange={handleInputChange}
                            value={searchInput}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <hr
          id="smoothFocus"
          className={`shine-rule ${isSuccess ? "visible" : "invisible"}`}
        />

        <div className={`reveal ${isSuccess ? "visible" : "invisible"}`}>
          <div id="fh5co-about" className="animate-box">
            <div className="container animate-box">
              <div className="row">
                <div className="col-md-10 col-md-offset-2 fh5co-heading">
                  <h2 id="mainHeading">
                    <b
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Click for Pronounciation"
                    >
                      Lexical Categories for <nobr> {jsonResponse.word}</nobr>
                    </b>
                  </h2>
                  <p>
                    <i>
                      <b>Lexical Categories</b>
                    </i>
                    , also known as parts of speech or grammatical categories,
                    are linguistic categories that classify words based on their
                    syntactic and semantic properties. They help to categorize
                    and organize words in a language according to their
                    grammatical functions and characteristics.
                  </p>
                </div>
              </div>
              <div className="row animate-box">
                <div className="col-md-12">
                  <br />
                  <h3>
                    <i className="fa-solid fa-headphones-simple"></i>{" "}
                    Pronunciation{" "}
                    <i
                      className="fa-regular fa-circle-question"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="How to pronounce a word, according to the International Phonetic Alphabet. May include multiple results if the word is pronounced differently depending on its part of speech"
                    ></i>
                  </h3>
                  <div id="definitions" className="px-5 word-collection">
                    {jsonResponse &&
                    jsonResponse.pronunciationTypes &&
                    jsonResponse.pronunciationTypes.length > 0 ? (
                      jsonResponse.pronunciationTypes.map((type, index) => (
                        <span key={index} className="pronunciations">
                          <span className="type">{type}: </span>
                          <span className="word">
                            {jsonResponse.pronunciation[type]}
                          </span>
                          <a
                            className="playAudio"
                            onClick={() =>
                              playAudio(jsonResponse.pronunciation[type])
                            }
                            rel="noopener noreferrer"
                          >
                            <i className="fa-solid fa-volume-high mx-2"></i>
                          </a>
                        </span>
                      ))
                    ) : (
                      <span className="pronunciations err">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        Regrettably, we were unable to find any Pronunciations
                        for the word you have requested in our database{" "}
                        <i className="fa-solid fa-face-sad-tear"></i>
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <br />
                  <h3>
                    <i className="fa-solid fa-link"></i> Synonyms{" "}
                    <i
                      className="fa-regular fa-circle-question"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Words with similar meanings to the one you searched for"
                    ></i>
                  </h3>
                  {jsonResponse.synonyms && jsonResponse.synonyms.length > 0 ? (
                    <div id="definitions" className="px-5 word-collection">
                      {jsonResponse.synonyms.map((synonym, index) => (
                        <span className="badge m-2" key={index}>
                          <a onClick={() => getDataFromServer(synonym)}>
                            {synonym}
                          </a>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div id="definitions" className="px-5 word-collection">
                      <span className="badge err">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        Regrettably, we were unable to find any Synonyms for the
                        word you have requested in our database{" "}
                        <i className="fa-solid fa-face-sad-tear"></i>
                      </span>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <br />
                  <h3>
                    <i className="fa-solid fa-not-equal"></i> Antonyms{" "}
                    <i
                      className="fa-regular fa-circle-question"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Words with opposite meanings to the one you searched for"
                    ></i>
                  </h3>
                  {jsonResponse.antonyms && jsonResponse.antonyms.length > 0 ? (
                    <div id="definitions" className="px-5 word-collection">
                      {jsonResponse.antonyms.map((antonym, index) => (
                        <span className="badge m-2" key={index}>
                          <a onClick={() => getDataFromServer(antonym)}>
                            {antonym}
                          </a>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div id="definitions" className="px-5 word-collection">
                      <span className="badge err">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        Regrettably, we were unable to find any Antonyms for the
                        word you have requested in our database{" "}
                        <i className="fa-solid fa-face-sad-tear"></i>
                      </span>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <br />
                  <h3>
                    <i className="fa-solid fa-hands-asl-interpreting"></i>{" "}
                    Rhymes{" "}
                    <i
                      className="fa-regular fa-circle-question"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Words that rhyme with the word you searched"
                    ></i>
                  </h3>
                  {jsonResponse.rhymes && jsonResponse.rhymes.length > 0 ? (
                    <div id="definitions" className="px-5 word-collection">
                      {jsonResponse.rhymes.map((rhyme, index) => (
                        <span className="badge m-2" key={index}>
                          <a onClick={() => getDataFromServer(rhyme)}>
                            {rhyme}
                          </a>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div id="definitions" className="px-5 word-collection">
                      <span className="badge err">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        Regrettably, we were unable to find any Rhymes for the
                        word you have requested in our database{" "}
                        <i className="fa-solid fa-face-sad-tear"></i>
                      </span>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <br />
                  <h3>
                    <i className="fa-solid fa-underline"></i> Syllables -{" "}
                    {jsonResponse.syllablesCount || 0}{" "}
                    <i
                      className="fa-regular fa-circle-question"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Shows the word broken down into syllables so that you can pronounce it clearly, syllable by syllable"
                    ></i>
                  </h3>
                  {jsonResponse.syllables &&
                  jsonResponse.syllables.length > 0 ? (
                    <div id="definitions" className="px-5 word-collection">
                      <span className="badge m-2">
                        <a>{jsonResponse.syllables}</a>
                      </span>
                    </div>
                  ) : (
                    <div id="definitions" className="px-5 word-collection">
                      <span className="badge err">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                        Regrettably, we were unable to find any Syllables for
                        the word you have requested in our database{" "}
                        <i className="fa-solid fa-face-sad-tear"></i>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div id="fh5co-resume" className="fh5co-bg-color animate-box">
            {/* <!-------------------------------------------------------------------------- 
		  The MIT License (MIT)
		
		Copyright (c) 2023 CP Lepage (https://codepen.io/cplepage/pen/EozVXL)
		
		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:
		
		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.
		
		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
		------------------------------------------------------------------------------> */}

            <div className="container">
              <div className="row mb-5">
                <div className="col-md-12">
                  <br />
                  <h3>
                    <i className="fa-solid fa-chevron-right"></i> Definitions{" "}
                    <i
                      className="fa-regular fa-circle-question"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Shows definitions of the word you searched"
                    ></i>
                  </h3>
                </div>
              </div>

              {jsonResponse.definitions &&
              jsonResponse.definitions.length > 0 ? (
                jsonResponse.definitions.map((definition, index) => (
                  <React.Fragment key={index}>
                    {index % 2 === 0 ? (
                      <>
                        <div className="row align-items-center how-it-works">
                          <div className="col-2 text-center bottom">
                            <div className="circle">
                              <i className="icon-pencil"></i>
                            </div>
                          </div>
                          <div className="col-8">
                            <h4>Definition #{index + 1}</h4>
                            <p>{definition}</p>
                          </div>
                        </div>
                        {index !== jsonResponse.definitions.length - 1 && (
                          <div className="row timeline">
                            <div className="col-2">
                              <div className="corner top-right"></div>
                            </div>
                            <div className="col-8">
                              <hr />
                            </div>
                            <div className="col-2">
                              <div className="corner left-bottom"></div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="row align-items-center justify-content-end how-it-works">
                          <div className="col-8 text-right">
                            <h4>Definition #{index + 1}</h4>
                            <p>{definition}</p>
                          </div>
                          <div className="col-2 text-center full">
                            <div className="circle">
                              <i className="icon-pencil"></i>
                            </div>
                          </div>
                        </div>
                        {index !== jsonResponse.definitions.length - 1 && (
                          <div className="row timeline">
                            <div className="col-2">
                              <div className="corner right-bottom"></div>
                            </div>
                            <div className="col-8">
                              <hr />
                            </div>
                            <div className="col-2">
                              <div className="corner top-left"></div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <div className="row align-items-center how-it-works">
                  <div className="col-2 text-center bottom">
                    <div className="circle">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <h4>
                      Our sincerest apologies{" "}
                      <i className="fa-solid fa-sad-tear"></i>
                    </h4>
                    <p>
                      We regret to inform you that no definitions are available
                      in our database for the word you submitted
                    </p>
                  </div>
                </div>
              )}

              {jsonResponse.definitions &&
                jsonResponse.definitions.length > 1 && (
                  <div className="row timeline">
                    <div className="col-2">
                      <div className="corner top-right"></div>
                    </div>
                    <div className="col-8">
                      <hr />
                    </div>
                    <div className="col-2">
                      <div className="corner left-bottom"></div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          <div id="fh5co-features" className="animate-box">
            {/* <!-----------------------------------------------------------------------------------

			The MIT License (MIT)
		
		Copyright (c) 2023 Fehrenbach Baptiste (https://codepen.io/medrupaloscil/pen/OJNrLLX)
		
		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:
		
		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.
		
		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE. 
		-----------------------------------------------------------------------------------> */}
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <br />
                  <h3>
                    <i className="fa-solid fa-chevron-right"></i> Examples{" "}
                    <i
                      className="fa-regular fa-circle-question"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Shows few examples of how the word you searched is used in sentences, phrases, etc"
                    ></i>
                  </h3>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="example-carousel">
                    {jsonResponse.examples &&
                    jsonResponse.examples.length > 0 ? (
                      <>
                        {jsonResponse.examples.map((example, index) => (
                          <React.Fragment key={index}>
                            <input
                              type="radio"
                              name="testimonial"
                              id={`t-${index + 1}`}
                              defaultChecked={index === 0}
                            />
                          </React.Fragment>
                        ))}
                        <div className="testimonials">
                          {jsonResponse.examples.map((example, index) => (
                            <label
                              className="item"
                              htmlFor={`t-${index + 1}`}
                              key={index}
                            >
                              <p>{example}</p>
                            </label>
                          ))}
                        </div>
                        <div className="dots">
                          {jsonResponse.examples.map((example, index) => (
                            <label
                              htmlFor={`t-${index + 1}`}
                              key={index}
                            ></label>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="testimonials err">
                        <p className="col-8">
                          <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                          Our apologies, but with regret, we inform you that no
                          examples were found in our database for the word you
                          specified.{" "}
                          <i className="fa-solid fa-face-sad-tear"></i>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="fh5co-skills" className="animate-box">
            <div className="container">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <br />
                  <h3>
                    <i className="fa-solid fa-chevron-right"></i> Frequency
                  </h3>
                  <p className="mb-2">Shows a Frequency score based on :</p>
                  <ul>
                    <li>
                      <b>
                        <i>Zipf</i>
                      </b>
                      , a score indicating how common the word is in the English
                      language, with a range of 1 to 7;
                    </li>
                    <li>
                      <b>
                        <i>PerMillion</i>
                      </b>
                      , the number of times the word is likely to appear in a
                      corpus of one million English words;
                    </li>
                    <li>
                      <b>
                        <i>Diversity</i>
                      </b>
                      , a 0-1 scale the shows the likelyhood of the word
                      appearing in an English document that is part of a corpus.
                    </li>
                  </ul>
                </div>
              </div>

              <button id="updateFrequency" onClick={updateFrequency}></button>
              <div className="row" ref={frequencyRef}>
                <div className="col-md-4 col-sm-12 col-xs-12 my-4 d-flex justify-content-center">
                  <div className="text-center">
                    <div id="chartBar" className="chart">
                      <span>
                        <strong>Frequency</strong>
                        {averageValue}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-md-8 col-sm-12 my-4 py-2">
                  <div className="progress-wrap">
                    <h3>
                      <span className="name-left">Zipf</span>
                      <span className="value-right">
                        <u>{zipfValue}</u> / 7
                      </span>
                    </h3>
                    <div className="progress">
                      <div
                        id="zipf"
                        className="progress-bar progress-bar-2 progress-bar-striped progress-bar-animated active"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="7"
                      ></div>
                    </div>
                  </div>

                  <div className="progress-wrap">
                    <h3>
                      <span className="name-left">PerMillion</span>
                      <span className="value-right">
                        <u>{perMillionValue}</u>
                        <sup>ppm</sup>
                      </span>
                    </h3>
                    <div className="progress">
                      <div
                        id="million"
                        className="progress-bar progress-bar-4 progress-bar-striped progress-bar-animated active"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="1000000"
                      ></div>
                    </div>
                  </div>

                  <div className="progress-wrap">
                    <h3>
                      <span className="name-left">Diversity</span>
                      <span className="value-right">
                        <u>{diversityValue}</u> / 1
                      </span>
                    </h3>
                    <div className="progress">
                      <div
                        id="diversity"
                        className="progress-bar progress-bar-5 progress-bar-striped progress-bar-animated active"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="fh5co-started" className="animate-box">
            {/* 
			The MIT License (MIT)

			Copyright (c) 2023 DariyGRAY (https://codepen.io/DariyGRAY/pen/OBJpZR)

			Permission is hereby granted, free of charge, to any person obtaining a copy
			of this software and associated documentation files (the "Software"), to deal
			in the Software without restriction, including without limitation the rights
			to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
			copies of the Software, and to permit persons to whom the Software is
			furnished to do so, subject to the following conditions:

			The above copyright notice and this permission notice shall be included in all
			copies or substantial portions of the Software.

			THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
			SOFTWARE. 
		*/}

            <div className="overlay"></div>

            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <br />
                  <h3>
                    <i className="fa-solid fa-chevron-right"></i> Relations{" "}
                    <i
                      className="fa-regular fa-circle-question"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Shows various types of relationships between the word you searched and other words that are related to it"
                    ></i>
                  </h3>
                </div>
              </div>

              <div className="row animate-box">
                <div className="col-md-12">{renderWordRelationships()}</div>
              </div>
            </div>
          </div>

          <footer>
            <div id="fh5co-footer" className="fh5co-bg-dark">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <p>
                      <i className="fa-regular fa-face-laugh-beam"></i> YAY!!!
                      You made it all the way to the bottom. Are you having fun
                      learning something new? You may quickly continue by using
                      the arrow on your right bottom to return to the top and
                      begin looking for new words...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          <div className="gototop js-top">
            <a href="#" className="js-gotop">
              <i className="icon-arrow-up22"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dictionary

// <!------------------------------------------- 
// Profile - FREE HTML5 TEMPLATE 
// DESIGNED & DEVELOPED by FreeHTML5.co
    
// Website: 		http://freehtml5.co/
// Email: 			info@freehtml5.co
// Twitter: 		http://twitter.com/fh5co
// Facebook: 		https://www.facebook.com/fh5co
// ---------------------------------------------->