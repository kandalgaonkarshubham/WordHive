/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import '../css/activate.css';
import '../css/mdtimepicker.css';

function Activate() {
  const passwordInput = useRef();
  const intervalInput = useRef();
  const [passCodeAuthorized, setpassCodeAuthorized] = useState(false);
  const [axiosCall, setaxiosCall] = useState(false);
  const passCode = import.meta.env.VITE_PASSCODE; // Password stored in Netlify Environment Variable
  let tValue;

  useEffect(() => {

    body.style.height = '100vh';

    let timePicker = document.getElementById("timepicker");

    // eslint-disable-next-line no-undef
    mdtimepicker(timePicker, {
      theme: "purple",
      type: "minute", // Show only minutes
      format: "mm",
    });

    // passwordInput.current.disabled = true;
    if (passCodeAuthorized) {
      timePicker.addEventListener("click", function () {
        var digitElements = document.querySelectorAll(".mdtp__digit");
        digitElements.forEach(function (digitElement) {
          digitElement.classList.remove("active");
        });
        // document.querySelector('.rotate-90').classList.add('active');
        document.querySelector(".mdtp__time_m").innerHTML = "00";

        document.querySelector(".mdtp__hour_holder").classList.add("hidden");
        document
          .querySelector(".mdtp__minute_holder")
          .classList.remove("hidden");

        document.querySelector(".mdtp__time_h").style.display = "none";
        document.querySelector(".mdtp__timedots").style.display = "none";
        document.querySelector(".mdtp__ampm").style.display = "none";
        document.querySelector(".mdtp__am").style.display = "none";
        document.querySelector(".mdtp__pm").style.display = "none";

        var timeMElement = document.querySelector(".mdtp__time_m");

        // Check if sibling span with the class "manual_mdtp__span" already exists
        if (
          !timeMElement.nextElementSibling ||
          !timeMElement.nextElementSibling.classList.contains(
            "manual_mdtp__span"
          )
        ) {
          var siblingSpan = document.createElement("span");
          siblingSpan.textContent = " Minutes"; // Customize the content of the sibling span
          siblingSpan.classList.add("manual_mdtp__span"); // Add the class "manual_mdtp__span" to the span
          timeMElement.insertAdjacentElement("afterend", siblingSpan);
        }
      });

      if (intervalInput.current) {
        const handleChange = function () {
          updateInputWithMinutesString(this.value);
        };
        intervalInput.current.addEventListener("change", handleChange);

        // Clean up the event listener when the component is unmounted
        return () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          intervalInput.current.removeEventListener("change", handleChange);
        };
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passCodeAuthorized]);

  const validatePasscode = () => {
    let enteredPasscode = passwordInput.current.value;
    // console.log(passwordInput.current.value);
    let barElement = document.querySelector(".bar");

    if (enteredPasscode == passCode) {
      barElement.classList.remove("invalid");
      barElement.classList.add("valid");
      document.querySelectorAll(".label-char").forEach(function (labelChar) {
        labelChar.classList.remove("invalid");
        labelChar.classList.add("valid");
      });
      setTimeout(() => {
        setpassCodeAuthorized(true);
      }, 1000);
      passwordInput.current.readOnly = true;
    } else {
      barElement.classList.add("invalid");
      document.querySelectorAll(".label-char").forEach(function (labelChar) {
        labelChar.classList.add("invalid");
      });
    }
  };

  const updateInputWithMinutesString = (minutes) => {
    tValue = minutes;
    intervalInput.current.value = intervalInput.current.value + " Minutes";
    // console.log(tValue);
  };

  function sendApiActivationCall() {
    let apiCallback = document.querySelector(".api-callback");

    if (tValue != "00") {
      document.getElementById("buttonSpan").innerText = "";
      setaxiosCall(true);
      // Axios request to activate the API key
      axios
        .get(`https://wordhive.dev/activateAPI?t=${tValue}`)
        .then((response) => {
          const data = response.data;
          // Check if the API key activation was successful
          if (data.success) {
            console.log("API key activated successfully:", data.message);
            // Handle the success case here
            document.getElementById("myButton").classList.remove("error");
            document.getElementById("myButton").classList.add("success");
            apiCallback.style.color = "green";
            apiCallback.innerHTML =
              data.message + "<br/>Redirecting you back to WordHive";
            document.getElementById("buttonSpan").innerText = "Success";
            document.getElementById("myButton").disabled = true;
            setaxiosCall(false);
            setTimeout(() => {
              window.location.replace("https://www.wordhive.app/dictionary");
            }, 2000);
          } else {
            console.error("API key activation failed:", data.message);
            // Handle the error case here
            document.getElementById("myButton").classList.add("error");
            apiCallback.style.color = "red";
            apiCallback.innerText = data.message;
            document.getElementById("buttonSpan").innerText = "Error";
            setTimeout(function () {
              document.getElementById("myButton").classList.remove("error");
              document.getElementById("buttonSpan").innerText = "Submit";
            }, 3000);
            setaxiosCall(false);
          }
        })
        .catch((error) => {
          console.error("Error occurred during API key activation:", error);
          // Handle any errors during the request
          document.getElementById("myButton").classList.add("error");
          setTimeout(function () {
            document.getElementById("myButton").classList.remove("error");
          }, 3000);
          apiCallback.style.color = "red";
          apiCallback.innerText = error.message;
          document.getElementById("buttonSpan").innerText = "Error";
          setTimeout(function () {
            document.getElementById("buttonSpan").innerText = "Submit";
          }, 3000);
          setaxiosCall(false);
        });
    } else {
      apiCallback.style.color = "#ccc";
      apiCallback.innerText = "Empty Value";
    }
  }

  return (
    <>
      {/* <!--! First Input Element taken from https://uiverse.io/AbanoubMagdy1/afraid-yak-99 --> */}
      {/* <!--! Second Input Element taken from https://uiverse.io/Satwinder04/pink-bat-77 --> */}
      {/* <!--! Button Element taken from https://uiverse.io/adamgiebl/rude-bear-14 --> */}
      {passCodeAuthorized ? (
        <div className="devcontainer">
          <img
            className="logo"
            src="/png/logofull.png"
            alt="Logo created with the help of app.logo.com"
          />
          <div className="row">
            <div className="col-12">
              <div className="input-container">
                <input
                  ref={intervalInput}
                  type="text"
                  id="timepicker"
                  required=""
                  placeholder="Choose the Interval"
                />
                <div className="underline"></div>
              </div>

              <button
                id="myButton"
                className="button mx-auto"
                onClick={sendApiActivationCall}
              >
                <span id="buttonSpan">Submit</span>
                {axiosCall && (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#604983"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                )}
              </button>
              <p className="api-callback"></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="devcontainer">
          <img
            className="logo"
            src="/png/logofull.png"
            alt="Logo created with the help of app.logo.com"
          />
          <h3>Enter the Passcode</h3>
          <h3>{passCode}</h3>
          <div className="row">
            <div className="col-12">
              <div className="wave-group">
                <input
                  ref={passwordInput}
                  maxLength="5"
                  type="password"
                  className="input"
                  id="passcode"
                  onKeyUp={validatePasscode}
                  required
                />
                <span className="bar"></span>
                <label className="label">
                  <span className="label-char" style={{ "--index": 0 }}>
                    P
                  </span>
                  <span className="label-char" style={{ "--index": 1 }}>
                    a
                  </span>
                  <span className="label-char" style={{ "--index": 2 }}>
                    s
                  </span>
                  <span className="label-char" style={{ "--index": 3 }}>
                    s
                  </span>
                  <span className="label-char" style={{ "--index": 4 }}>
                    C
                  </span>
                  <span className="label-char" style={{ "--index": 5 }}>
                    o
                  </span>
                  <span className="label-char" style={{ "--index": 6 }}>
                    d
                  </span>
                  <span className="label-char" style={{ "--index": 7 }}>
                    e
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Activate;
