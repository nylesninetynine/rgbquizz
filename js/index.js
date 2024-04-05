document.addEventListener("DOMContentLoaded", function () {

    let randomColorSpan = document.getElementById("colorChosen"),
        colorMinSpan = document.getElementById("colorMin"),
        colorMaxSpan = document.getElementById("colorMax"),
        colors = ["red", "green", "blue"],
        colorChosen = colors[Math.floor(Math.random() * colors.length)],
        rgbMax = Math.floor(Math.random() * 256),
        rgbMin = Math.round(rgbMax / 100 * 50),
        allowedTries = 5;

    randomColorSpan.textContent = colorChosen;
    randomColorSpan.style.color = colorChosen;
    randomColorSpan.style.textTransform = "uppercase"
    colorMinSpan.textContent = rgbMin + "";
    colorMaxSpan.textContent = rgbMax + "";

    let tries = 0
    let faulty = 0;

    document.querySelectorAll("td:not(.correct)").forEach(function (square) {
        square.addEventListener("click", function (event) {
            if (!square.classList.contains("correct") && tries < allowedTries) {
                square.textContent = ""
                randomColor(square);
            }
        })
    });

    document.querySelector("#ok").addEventListener("click", function (event) {
        faulty = 0;
        let tiles = document.querySelectorAll("td")
        if (tries < allowedTries) {
            tries++;
        }
        if (tries >= allowedTries) {
            if (tiles.length > 0) {
                document.querySelector(".title").textContent = "Oops.. you've tried " + tries + " times."
                document.querySelector(".subtitle").textContent = "Refresh the page to try again."
                document.querySelector("#status").textContent = ""
                document.querySelector("#ok").style.backgroundColor = "#181818"
            } else if (tiles.length === 0 ){
                document.querySelector(".title").textContent = "Congratulations."
            }
        }

        tiles.forEach(function (square) {
            if (!square.classList.contains("correct")) {

                let style = getComputedStyle(square);
                let squareRgb = style.backgroundColor;
                let matches = squareRgb.match(/\d+/g);

                if (matches) {
                    let red = parseInt(matches[0], 10);
                    let green = parseInt(matches[1], 10);
                    let blue = parseInt(matches[2], 10);

                    compareValues(red, green, blue, square);
                }
            }
        })

        animateTiles()

        if (faulty === 0 ) {
            document.querySelector("#status").textContent = "WINNER!" + " tries: " + tries;
        } else if (faulty > 0 && tries < 5) {
            document.querySelector("#status").textContent = "Close one! tries left: " + (allowedTries - tries);
        }
    })

    function compareValues(red, green, blue, square) {
        if (colorChosen === "red" && rgbMin < red && red < rgbMax) {
            square.textContent = red
            square.classList.add("correct")
            square.style.border = "2px solid white"
        } else if (colorChosen === "red") {
            square.style.border = "2px solid " + red
            square.textContent = "";
            faulty++;
        }
        if (colorChosen === "green" && rgbMin < green && green < rgbMax) {
            square.textContent = green
            square.classList.add("correct")
            square.style.border = "2px solid white"
        } else if (colorChosen === "green") {
            square.style.border = "2px solid " + green
            square.textContent = "";
            faulty++;
        }
        if (colorChosen === "blue" && rgbMin < blue && blue < rgbMax) {
            square.textContent = blue
            square.classList.add("correct")
            square.style.border = "2px solid white"
        } else if (colorChosen === "blue") {
            square.style.border = "2px solid" + blue
            square.textContent = "";
            faulty++;
        }
    }

    function animateTiles() {
        let correctTiles = document.querySelectorAll(".correct");
        let index = 0;

        function scaleTile() {
            if (index >= correctTiles.length) {
                return;
            }

            correctTiles[index].classList.add("scale-up");

            setTimeout(() => {
                correctTiles[index].classList.remove("scale-up");

                setTimeout(() => {
                    index++;
                    scaleTile();
                }, 200);
            }, 200);
        }

        scaleTile();
    }

    function randomColor(square) {
        let R = Math.floor(Math.random() * 256),
            G = Math.floor(Math.random() * 256),
            B = Math.floor(Math.random() * 256);

        square.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
    }
});


