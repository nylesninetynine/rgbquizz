document.addEventListener("DOMContentLoaded", function () {

    let randomColorSpan = document.getElementById("colorChosen"), colorMinSpan = document.getElementById("colorMin"),
        colorMaxSpan = document.getElementById("colorMax"), colors = ["red", "green", "blue"],
        colorChosen = colors[Math.floor(Math.random() * colors.length)], rgbMax = Math.floor(Math.random() * 256),
        rgbMin = Math.round(rgbMax / 100 * 50), allowedTries = 5;

    randomColorSpan.textContent = colorChosen;
    randomColorSpan.style.color = colorChosen;
    randomColorSpan.style.textTransform = "uppercase"
    colorMinSpan.textContent = rgbMin + "";
    colorMaxSpan.textContent = rgbMax + "";

    let title = document.querySelector(".title"),
        subtitle = document.querySelector(".subtitle"),
        status = document.querySelector("#status"),
        button = document.querySelector("#ok"),
        refresh = document.querySelector("#refresh")

    let tries = 0
    let faulty = 0;

    refresh.addEventListener("click", function (){
        location.reload()
    })

    document.querySelectorAll("td:not(.correct)").forEach(function (square) {
        square.addEventListener("click", function (event) {
            if (!square.classList.contains("correct") && tries < allowedTries) {
                square.textContent = ""
                randomColor(square);
            }
        })
    });

    let tiles = document.querySelectorAll("td:not(.correct)");

    button.addEventListener("click", function (event) {
        if (this.classList.contains('disabled')) {
            return;
        }
        faulty = 0;
        if (tries < allowedTries) {
            tries++;
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

        tiles = document.querySelectorAll("td:not(.correct)");

        if (tries >= allowedTries) {
            if (tiles.length > 0) {
                title.textContent = "Oops.. you're out of tries."
                subtitle.textContent = "Reload to try again."
                status.textContent = ""
                button.style.backgroundColor = "#181818"
                button.classList.add("disabled")

            } else if (tiles.length === 0) {
                title.textContent = "Congratulations."
                subtitle.textContent = "Solved in " + tries + " tries."
                button.style.backgroundColor = "#181818"
                button.classList.add("disabled")
            }
        } else if (tries <= allowedTries && tiles.length === 0) {
            title.textContent = "Congratulations."
            subtitle.textContent = "Solved in: " + tries + " tries."
            button.style.backgroundColor = "#181818"
            button.classList.add("disabled")
        }

        console.log(tiles.length)

        animateTiles()

        if (faulty === 0) {
            status.textContent = "Refresh the page to play again." ;
        } else if (faulty > 0 && tries < 5) {
            status.textContent = " Tries left: " + (allowedTries - tries);
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
        let R = Math.floor(Math.random() * 256), G = Math.floor(Math.random() * 256),
            B = Math.floor(Math.random() * 256);

        square.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
    }
});


