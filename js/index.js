document.addEventListener("DOMContentLoaded", function () {

    let randomColorSpan = document.getElementById("colorChosen"),
        colorMinSpan = document.getElementById("colorMin"),
        colorMaxSpan = document.getElementById("colorMax"),
        colors = ["red", "green", "blue"],
        colorChosen = colors[Math.floor(Math.random() * colors.length)],
        rgbMax = Math.floor(Math.random() * (256 - 50)) + 50,
        rgbMin = Math.round(rgbMax / (Math.floor(Math.random() * 3) + 1.5)),
        allowedTries = 5;

    randomColorSpan.textContent = colorChosen;
    randomColorSpan.style.color = colorChosen;
    randomColorSpan.style.textTransform = "uppercase"
    colorMinSpan.textContent = rgbMin + "";
    colorMaxSpan.textContent = rgbMax + "";

    let title = document.querySelector(".title"),
        subtitle = document.querySelector(".subtitle"),
        status = document.querySelector("#status"),
        button = document.querySelector("#check"),
        refresh = document.querySelector("#reload"),
        table = document.querySelector(".game-table")

    let tries = 0
    let faulty = 0;

    refresh.addEventListener("click", function () {
        location.reload()
    })

    document.getElementById('info').addEventListener('click', function () {
        document.getElementById('info-element').style.display = 'block';
    });

    document.getElementById('info-element').addEventListener('click', function () {
        this.style.display = 'none';
    });

    document.getElementById('red-input').addEventListener('input', updateBackgroundColor);

    document.getElementById('green-input').addEventListener('input', updateBackgroundColor);

    document.getElementById('blue-input').addEventListener('input', updateBackgroundColor);

    document.querySelector('#info-element #orange-example').addEventListener('click', function (event) {
        event.stopPropagation();
    });

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
                document.body.classList.add('failure');
                title.textContent = "Game Over"
                subtitle.textContent = "Reload to try again."
                status.style.opacity = "0"
                button.style.opacity = "0"
                button.classList.add("disabled")

            } else if (tiles.length === 0) {
                title.textContent = "YOU WON"
                document.body.classList.add('success');
                table.style.backgroundColor = "green"
                subtitle.textContent = "Refresh the page to play again."
                button.style.opacity = "0"
                button.classList.add("disabled")
            }
        } else if (tries <= allowedTries && tiles.length === 0) {
            title.textContent = "YOU WON."
            document.body.classList.add('success');
            table.style.backgroundColor = "green"
            subtitle.textContent = "Refresh the page to play again."
            button.style.opacity = "0"
            button.classList.add("disabled")
        }

        console.log(tiles.length)

        animateTiles()

        if (faulty === 0) {
            status.textContent = "Solved in " + tries + " tries.";
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

    // Animate correct tiles
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

    // Function for the experimentation Tile
    function updateBackgroundColor() {
        const red = document.getElementById('red-input').value;
        const green = document.getElementById('green-input').value;
        const blue = document.getElementById('blue-input').value;

        document.getElementById('orange-example').style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

        document.getElementById('red-value').textContent = red;
        document.getElementById('green-value').textContent = green;
        document.getElementById('blue-value').textContent = blue;
    }

    // Generate a random Color
    function randomColor(square) {
        let R = Math.floor(Math.random() * 256),
            G = Math.floor(Math.random() * 256),
            B = Math.floor(Math.random() * 256);

        square.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
    }
});


