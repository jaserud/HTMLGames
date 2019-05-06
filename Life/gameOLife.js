var app = angular.module("gameOLife", []);

var tiles1;
var tiles2;
var set = true;
var n = 0;

app.run(function ($rootScope, $interval) {
    $rootScope.set = function (i) { setType(i); };

    function update() {
        if (n != 0) {
            updateTiles();
            if (set) {
                $rootScope.tiles = tiles2;
                set = false;
            } else {
                $rootScope.tiles = tiles1;
                set = true;
            }
        }
    }

    $interval(update, 1000);
});

function updateTiles() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            checkSurrounding(i, j);
        }
    }
}

function checkSurrounding(x, y) {
    if (set) {
        tiles = tiles1;
        tilesNew = tiles2;
    } else {
        tiles = tiles2;
        tilesNew = tiles1;
    }
    count = 0;
    [-1, 0, 1].forEach(
        (elem1) => {
            [-1, 0, 1].forEach(
                (elem2) => {
                    temp1 = x + elem1;
                    temp2 = y + elem2;
                    if (!(temp1 == x && temp2 == y) &&
                        (temp1 >= 0) && (temp1 < n) &&
                        (temp2 >= 0) && (temp2 < n)) {
                        count += tiles[temp1][temp2];
                    }
                });
        });

    var live = tiles[x][y] === 1;
    if (live) {
        if (count < 2 || count > 3)
            tilesNew[x][y] = 0;
    } else {
        if (count == 3)
            tilesNew[x][y] = 1;
    }
}

function setType(i) {
    switch (i) {
        case 0:
            tiles1 =
                [[0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]];
            tiles2 =
                [[0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]];
            set = true;
            n = 5;
            break;
        case 1:
            tiles1 =
                [[0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0]];
            tiles2 =
                [[0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0]];
            set = true;
            n = 6;
            break;
        case 2:
            tiles1 =
                [[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]];
            tiles2 =
                [[0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]];
            set = true;
            n = 6;
            break;
    }
}