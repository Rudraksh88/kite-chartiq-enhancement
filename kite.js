// ==UserScript==
// @name        ChartIQ Candlestick Points Info
// @namespace   Violentmonkey Scripts
// @match       https://kite.zerodha.com/chart/*
// @grant       none
// @version     1.0
// @author      -
// @description 8/19/2023, 2:38:19 AM
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
    "use strict";

    // Wait for the target element to be available
    function checkForElement() {
        var chartIframe = document.getElementById("chart-iframe");
        if (chartIframe) {
            var innerDoc = chartIframe.contentDocument || chartIframe.contentWindow.document;

            var targetElement = $(innerDoc).find("cq-hu-static > div:nth-child(1)");

            // Check if the target element and its structure are ready
            if (targetElement.length > 0 && setTimeout(console.log("wait few secs"), 2000)) {
                clearInterval(elementCheckInterval);

                // Wait for the target structure to be ready if needed
                // For example, you can use a specific class or attribute that indicates readiness
                var isReady = $(innerDoc).find("cq-hu-open");

                if (isReady) {
                    // Create a new div element
                    var newDiv = $(`<div id="candle-info" style="position: absolute; margin-left: 1.2rem;width: auto!important;left: 370px;">
                    Pts: <span id="value_span" style="font-size: 12px;"></span>
                    </div>`
                    );

                    // Append the new div element to the target element
                    targetElement.append(newDiv);
                    $(innerDoc).find("#candle-info::after").css("display", "none");

                    console.log("Element found and newDiv appended.");

                    // Bind the event after appending
                    bindEvent(innerDoc);
                }
            }
        }
    }

    // Check for the element every 200ms
    let elementCheckInterval = setInterval(checkForElement, 200);

    // Bind the event
    function bindEvent(innerDoc) {
        // Ensure we bind the event within the iframe's context
        $(innerDoc).find(".chartContainer").mousemove(function (event) {
            const candlestick = $(event.target);
            // console.log(event.target);

            if (candlestick.find("cq-hu-open").text() == "N/A") {
                const valueSpan = $("#value_span", innerDoc);
                valueSpan.css("color", "black");
                valueSpan.text("\u00A0N/A");
            }
            else if (candlestick.length > 0) {
                const openPrice = parseFloat(candlestick.find("cq-hu-open").text());
                const closePrice = parseFloat(candlestick.find("cq-hu-close").text());

                const percentageChange = ((closePrice - openPrice) / openPrice) * 100;
                const pointsMoved = Math.abs(closePrice - openPrice);

                const valueSpan = $("#value_span", innerDoc);

                if (openPrice === "N/A") console.log("LOL");

                let sign = " ";
                if (percentageChange > 0) sign = "+";
                else if (percentageChange == 0) sign = "\u00A0";
                else if (percentageChange < 0) sign = "-";

                valueSpan.text(sign + pointsMoved.toFixed(2) + " (" + percentageChange.toFixed(2) + "%" + ")");

                if (percentageChange > 0) {
                    valueSpan.css("color", "#4caf50");
                } else if (percentageChange == 0) {
                    valueSpan.css("color", "black");
                } else {
                    valueSpan.css("color", "#df514c");
                }
                // console.log(pointsMoved.toFixed(2) + '(' + percentageChange.toFixed(2) + '%' + ')');
            }
        });
    }

    function overrideAfterContent(innerDoc) {
        var style = document.createElement("style");
        style.innerHTML = `
        cq-hu-static > div > div:after {
            content: "";
        }
        `;
        innerDoc.head.appendChild(style);
    }

    overrideAfterContent(innerDoc);
})();
// ==UserScript==
// @name        ChartIQ Candlestick Points Info
// @namespace   Violentmonkey Scripts
// @match       https://kite.zerodha.com/chart/*
// @grant       none
// @version     1.0
// @author      -
// @description 8/19/2023, 2:38:19 AM
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
    "use strict";

    // Wait for the target element to be available
    function checkForElement() {
        var chartIframe = document.getElementById("chart-iframe");
        if (chartIframe) {
            var innerDoc = chartIframe.contentDocument || chartIframe.contentWindow.document;

            var targetElement = $(innerDoc).find("cq-hu-static > div:nth-child(1)");

            // Check if the target element and its structure are ready
            if (targetElement.length > 0 && setTimeout(console.log("wait few secs"), 2000)) {
                clearInterval(elementCheckInterval);

                // Wait for the target structure to be ready if needed
                // For example, you can use a specific class or attribute that indicates readiness
                var isReady = $(innerDoc).find("cq-hu-open");

                if (isReady) {
                    // Create a new div element
                    var newDiv = $(`<div id="candle-info" style="position: absolute; margin-left: 1.2rem;width: auto!important;left: 370px;">
                    Pts: <span id="value_span" style="font-size: 12px;"></span>
                    </div>`
                    );

                    // Append the new div element to the target element
                    targetElement.append(newDiv);
                    $(innerDoc).find("#candle-info:after").css("display", "none");

                    console.log("Element found and newDiv appended.");

                    // Bind the event after appending
                    bindEvent(innerDoc);
                }
            }
        }
    }

    // Check for the element every 200ms
    let elementCheckInterval = setInterval(checkForElement, 200);

    // Bind the event
    function bindEvent(innerDoc) {
        // Ensure we bind the event within the iframe's context
        $(innerDoc).find(".chartContainer").mousemove(function (event) {
            const candlestick = $(event.target);
            // console.log(event.target);

            if (candlestick.find("cq-hu-open").text() == "N/A") {
                const valueSpan = $("#value_span", innerDoc);
                valueSpan.css("color", "black");
                valueSpan.text("\u00A0N/A");
            }
            else if (candlestick.length > 0) {
                const openPrice = parseFloat(candlestick.find("cq-hu-open").text());
                const closePrice = parseFloat(candlestick.find("cq-hu-close").text());

                const percentageChange = ((closePrice - openPrice) / openPrice) * 100;
                const pointsMoved = Math.abs(closePrice - openPrice);

                const valueSpan = $("#value_span", innerDoc);

                if (openPrice === "N/A") console.log("LOL");

                let sign = " ";
                if (percentageChange > 0) sign = "+";
                else if (percentageChange == 0) sign = "\u00A0";
                else if (percentageChange < 0) sign = "-";

                valueSpan.text(sign + pointsMoved.toFixed(2) + " (" + percentageChange.toFixed(2) + "%" + ")");

                if (percentageChange > 0) {
                    valueSpan.css("color", "#4caf50");
                } else if (percentageChange == 0) {
                    valueSpan.css("color", "black");
                } else {
                    valueSpan.css("color", "#df514c");
                }
                // console.log(pointsMoved.toFixed(2) + '(' + percentageChange.toFixed(2) + '%' + ')');
            }
        });
    }

    function overrideAfterContent(innerDoc) {
        var style = document.createElement("style");
        style.innerHTML = `
        cq-hu-static > div > div:after {
            content: "";
        }
        `;
        innerDoc.head.appendChild(style);
    }

    overrideAfterContent(innerDoc);
})();
