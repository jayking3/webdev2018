/*

The Game Project 5 - Making a complete level

Week 7

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;
var lives = 3;
var score = 0;
var isLost = false;
var isWon = false;
var enemies = [];
var platforms = [];

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;

	// Initialise arrays of scenery objects.
    houseXs =    [-100 + random(-1000,1000), 400 + random(-1000,1000), 900 + random(-1000,1000), 1200 + random(-1000,1000), 1800 + random(-1000,1000), -500 + random(-1000,1000), 2500 + random(-1000,1000), -850 + random(-1000,1000)]
    houseYs =    [-120,-113,-115, -130, -132, -130, -115, -110]
    cloudXs =    [-300 + random(-1000,1000),200 + random(-1000,1000),700 + random(-1000,1000),1000 + random(-1000,1000),1200 + random(-1000,1000),1500 + random(-1000,1000),1999 + random(-1000,1000),2048 + random(-1000,1000)]
    cloudYs =    [-40 + random(-30,30), 20 + random(-30,30), 50 + random(-30,30), 60 + random(-30,30), 10 + random(-30,30), 5 + random(-30,30), -20 + random(-30,30), 3 + random(-30,30)]
    cloudSX =    [0 + random(-1000,1000), 100 + random(-1000,1000), 300 + random(-1000,1000), 500 + random(-1000,1000), 700 + random(-1000,1000), 1000 + random(-1000,1000), -300 + random(-1000,1000), -400 + random(-1000,1000), -750 + random(-1000,1000)]
    cloudSY =    [0 + random(-30,30), -100 + random(-30,30), 100 + random(-30,30), 150 + random(-30,30), 50 + random(-30,30), -50 + random(-30,30),   -30 + random(-30,30), -50 + random(-30,30), 100 + random(-30,30)]
    treeXs  =    [-500 + random(-1000,1000),-200 + random(-1000,1000), 150 + random(-1000,1000), 400 + random(-1000,1000),800 + random(-1000,1000),1300 + random(-1000,1000),1600 + random(-1000,1000),-600 + random(-1000,1000),-1000 + random(-1000,1000),2100 + random(-1000,1000),1800 + random(-1000,1000), -50 + random(-1000,1000)]
    treeYs  =    [-110, -50,-105,-108,-70,-105, -80, -30,  -50, -70, -80, -100]
    mountainXs = [0 + random(-500,500),-150 + random(-500,500), -340 + random(-500,500),400 + random(-500,500),150 + random(-500,500), 500 + random(-500,500), 800 + random(-500,500), -500 + random(-500,500)]
    mountainYs = [0,50, 0,-25,-50, -50,-100,  -75]
    sunXs =      [1024 + random(0,-50)]
    canyonXpos = [200 + random(-100,0),400 + random(-100,0),700 + random(-100,100),1300 + random(-100,100),855 + random(100,300)]
    canyonWidth= [40,30,30,40,40]
    starX =      {x_pos: 1000, y_pos: floorPos_y, isFound: false}
    
    enemies.push({
        x_pos: random(0,350),
        y_pos: floorPos_y,
        size: 15,
        x1: 0 - random(0,100),
        x2: 350 + random(0,100),
        speed: 1,
        enemyRender: function() {
            fill(255,175,175);
            ellipse(this.x_pos,this.y_pos,this.size);
            fill(255)
            rect(this.x_pos - 3, this.y_pos - 2, 6,2)
        },
        enemyMove: function() {
            this.x_pos += this.speed
            if(this.x_pos > this.x2) {
               this.speed = -1;
               }
            if(this.x_pos < this.x1) {
                this.speed = 1;
                }
            },
        enemyCollision: function() {
            if((gameChar_x > this.x_pos - this.size - 10 + scrollPos / 1.25) && (gameChar_x < this.x_pos + this.size + scrollPos / 1.25) && (gameChar_y > this.y_pos - this.size) && (gameChar_y < this.y_pos + this.size)) {
                if(lives == 3) {
                    lives = 2;
                    realPos = 0;
                    scrollPos = 0;
                    gameChar_x = width / 2;
                    gameChar_y = floorPos_y;
                    fill(0);
                } else if(lives == 2) {
                    lives = 1
                    realPos = 0;
                    scrollPos = 0;
                    gameChar_x = width / 2;
                    gameChar_y = floorPos_y;
                } else if(lives == 1) {
                    lives = 0;
                    realPos = 0;
                    scrollPos = 0;
                    gameChar_x = width / 2;
                    gameChar_y = floorPos_y;
                    isLost = true;
                } else {
                    isLost == true;
                }
            }
            
        }
    })
    
    enemies.push({
        x_pos: random(600,800),
        y_pos: floorPos_y,
        size: 15,
        x1: 600 - random(0,100),
        x2: 800 + random(0,100),
        speed: 1,
        enemyRender: function() {
            fill(255,175,175);
            ellipse(this.x_pos,this.y_pos,this.size);
            fill(255)
            rect(this.x_pos - 3, this.y_pos - 2, 6,2)
        },
        enemyMove: function() {
            this.x_pos += this.speed
            if(this.x_pos > this.x2) {
               this.speed = -1;
               }
            if(this.x_pos < this.x1) {
                this.speed = 1;
                }
            },
        enemyCollision: function() {
            if((gameChar_x > this.x_pos - this.size - 10 + scrollPos / 1.25) && (gameChar_x < this.x_pos + this.size + scrollPos / 1.25) && (gameChar_y > this.y_pos - this.size) && (gameChar_y < this.y_pos + this.size)) {
                if(lives == 3) {
                    lives = 2;
                    realPos = 0;
                    scrollPos = 0;
                    gameChar_x = width / 2;
                    gameChar_y = floorPos_y;
                    fill(0);
                } else if(lives == 2) {
                    lives = 1
                    realPos = 0;
                    scrollPos = 0;
                    gameChar_x = width / 2;
                    gameChar_y = floorPos_y;
                } else if(lives == 1) {
                    lives = 0;
                    realPos = 0;
                    scrollPos = 0;
                    gameChar_x = width / 2;
                    gameChar_y = floorPos_y;
                    isLost = true;
                } else {
                    isLost == true;
                }
            }
            
        }
    })
    
    platforms.push({
        x_pos: 200 + random(-100,100),
        y_pos: floorPos_y - 50,
        width: 200,
        height: 30,
        isPlatformed: null,
        platformRender: function() {
            fill(75)
            rect(this.x_pos,this.y_pos,this.width,this.height)  
        },
        platformCollision: function() {
        if((gameChar_y >= this.y_pos - 10 && gameChar_y <= this.y_pos + 10) && (gameChar_x >= this.x_pos + scrollPos / 1.25 && gameChar_x <= this.x_pos + this.width + scrollPos / 1.25)) {
            this.isPlatformed = true;
            isFalling = false;
            isJumping = false;
            gameChar_y = this.y_pos - 10;
            gameChar_y -= 2;
        } else if((gameChar_y < this.y_pos - 20 || gameChar_y > this.y_pos + 10) || (gameChar_x <= this.x_pos + scrollPos / 1.25 || gameChar_x >= this.x_pos + this.width + scrollPos / 1.25)) {
            this.isPlatformed = false;
            }
        }
    })
    
    star1 = {
    starX: 0 + random(-100,100),
    isFound: false,
    drawStar: function(star){
    fill(0,150,200,255)
    beginShape()
    vertex(0 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(50 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    fill(0,255,225,100)
    beginShape()
    vertex(5 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(45 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    fill(0,255,200,100)
    beginShape()
    vertex(10 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(40 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    },

    checkStar: function(star, starW){     
        if((gameChar_x > star + scrollPos / 1.25) && (gameChar_x < star + starW + scrollPos / 1.25) && (gameChar_y > floorPos_y - 25) && (gameChar_y < floorPos_y + 15)){
        star1.isFound = true;
    }else{

        }
    }
}
    
    star2 = {
    starX: 0 + random(-600,600),
    isFound: false,
    drawStar: function(star){
    fill(0,150,200,255)
    beginShape()
    vertex(0 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(50 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    fill(0,255,225,100)
    beginShape()
    vertex(5 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(45 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    fill(0,255,200,100)
    beginShape()
    vertex(10 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(40 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    },

    checkStar: function(star, starW){     
        if((gameChar_x > star + scrollPos / 1.25) && (gameChar_x < star + starW + scrollPos / 1.25) && (gameChar_y > floorPos_y - 25) && (gameChar_y < floorPos_y + 15)){
        this.isFound = true;
    }else{

        }
    }
}
    
    star3 = {
    starX: 0 + random(600,1000),
    isFound: false,
    drawStar: function(star){
    fill(0,150,200,255)
    beginShape()
    vertex(0 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(50 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    fill(0,255,225,100)
    beginShape()
    vertex(5 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(45 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    fill(0,255,200,100)
    beginShape()
    vertex(10 + star, 0 + floorPos_y)
    vertex(25 + star, -25 + floorPos_y)
    vertex(40 + star, 0 + floorPos_y)
    vertex(25 + star, 25 + floorPos_y)
    endShape(CLOSE)
    },

    checkStar: function(star, starW){     
        if((gameChar_x > star + scrollPos / 1.25) && (gameChar_x < star + starW + scrollPos / 1.25) && (gameChar_y > floorPos_y - 25) && (gameChar_y < floorPos_y + 15)){
        this.isFound = true;
    }else{

        }
    }
}
}

	// Draw clouds.
function cloudS(cloudXX,cloudYY){
    noStroke();
    fill(255);
    ellipse(cloudXX + 30, cloudYY + 110,50,50)
    ellipse(cloudXX + 50, cloudYY + 100,37.5,37.5)
    ellipse(cloudXX + 75, cloudYY + 100,25,25)
    ellipse(cloudXX + 25, cloudYY + 125,25,25)
}

function cloud(cloudX,cloudY){
    noStroke();
    fill(255);
    ellipse(cloudX + 0, cloudY + 100,100,100)
    ellipse(cloudX + 50, cloudY + 100,75,75)
    ellipse(cloudX + 75, cloudY + 100,50,50)
    ellipse(cloudX + 25, cloudY + 125,50,50)
    ellipse(cloudX + 105, cloudY + 75,10,10)
}
	// Draw mountains.
function mountain(mountainX, mountainY){
    
    noStroke();
    fill(125)
    triangle(mountainX + 575,150 + mountainY,mountainX + 350,567 + mountainY,mountainX + 900,567 + mountainY)
    
    fill(225)
    triangle(mountainX + 575,150 + mountainY,mountainX + 900, 567 + mountainY, 825 + mountainX,567 + mountainY)
    
    fill(255,255,255,225)
    triangle(mountainX + 575,150 + mountainY,mountainX + 450 + mountainY / 3,382 + mountainY / 2.5,mountainX + 725,343 + mountainY / 1)
}
	// Draw trees.
function tree(treeX,treeY){
    
    noStroke();
    fill(139,69,19)
    beginShape();
    vertex(treeX + 830,treeY + 575)
    vertex(treeX + 825,treeY + 450)
    vertex(treeX + 775,treeY + 450)
    vertex(treeX + 770,treeY + 575)
    vertex(treeX + 775,treeY + 580)
    vertex(treeX + 800,treeY + 575)
    vertex(treeX + 825,treeY + 580)
    endShape(CLOSE);
    
    fill(225,225,255,25)
    triangle(treeX + 830,treeY + 575,treeX + 825,treeY + 450,treeX + 815,treeY + 450)
    
    stroke(0,175,0)
    fill(0,190,0)
    triangle(treeX + 695,treeY + 450,treeX + 905,treeY + 450,treeX + 800,treeY + 250)
    fill(225,225,255,25)
    noStroke()
    triangle(treeX + 800,treeY + 250,treeX + 905,treeY + 450,treeX + 880,treeY + 450)
    
    fill(0,175,0)
    triangle(treeX + 700,treeY + 425,treeX + 900,treeY + 425,treeX + 800,treeY + 225)
    fill(225,225,255,25)
    triangle(treeX + 800,treeY + 225,treeX + 900,treeY + 425,treeX + 875,treeY + 425)
    
    fill(0,160,0)
    noStroke()
    triangle(treeX + 700,treeY + 400,treeX + 900,treeY + 400,treeX + 800,treeY + 200)
    fill(225,225,255,25)
    triangle(treeX + 800,treeY + 200,treeX + 900,treeY + 400,treeX + 875,treeY + 400)
}
	// Draw houses.
function house(houseX,houseY){
    
    noStroke();
    fill(120)
    rect(houseX + 200,houseY + 400,-30,-30)
    
    
    fill(120,69,50);
    rect(houseX + 75,houseY + 400,130,167)
    
    fill(255,255,255,25)
    triangle(houseX + 205,houseY + 400,houseX + 205,houseY + 567,houseX + 185,houseY + 400)
    
    fill(245,222,179)
    rect(houseX + 130,houseY + 567,25,-50)
    
    fill(120)
    rect(houseX + 85,houseY + 420,30,30)
    
    fill(120)
    rect(houseX + 85,houseY + 520,30,30)
    
    fill(160,82,45)
    triangle(houseX + 70,houseY + 403,houseX + 210,houseY + 403,houseX + 140,houseY + 350)
}
	// Draw canyons.
function canyon(canyonX, canyonW){
    fill(50,50,0);
    rect(canyonX, floorPos_y + 10, canyonW, height - floorPos_y);
}
    // Draw the sun.
function sun(sunX){
    fill(255,255,0)
    ellipse(sunX,0,100,100)
}

	// Draw game character.
function standing() {
    //Standing, facing frontwards
    //Add your code here ...
    
    var charCd = {
        head    : gameChar_y - 50,
        body    : gameChar_y - 35,
        arm     : gameChar_y - 35,
        lLeg    : gameChar_y - 5,
        rLeg    : gameChar_y - 5
    }
    
    //head
    fill(255,175,175)
    rect(gameChar_x,charCd.head,15,15);
    fill(255)
    rect(gameChar_x + 3,charCd.head + 10,9,2)
    
    //left arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x - 5,   charCd.arm)
    vertex(gameChar_x - 10,  charCd.arm + 35)
    vertex(gameChar_x - 5,   charCd.arm + 32.5)
    vertex(gameChar_x + 2,   charCd.arm)
    endShape(CLOSE)
    
    //right arm
    beginShape()
    vertex(gameChar_x + 20,  charCd.arm)
    vertex(gameChar_x + 25,  charCd.arm + 35)
    vertex(gameChar_x + 20,  charCd.arm + 32.5)
    vertex(gameChar_x + 13,  charCd.arm)
    endShape(CLOSE)
    
    //left leg
    beginShape()
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x - 5,   charCd.body + 60)
    vertex(gameChar_x,       charCd.body + 60)
    vertex(gameChar_x + 10,  charCd.body + 30)
    endShape(CLOSE)
    
    //right leg
    beginShape()
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body + 60)
    vertex(gameChar_x + 15,  charCd.body + 60)
    vertex(gameChar_x + 5,   charCd.body + 30)
    endShape(CLOSE)
    
    //body
    fill(255,150,150)
    beginShape()
    vertex(gameChar_x,       charCd.body)
    vertex(gameChar_x - 5,   charCd.body)
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body)
    endShape(CLOSE)
}

function wLeft(){
    
    var charCd = {
        head    : gameChar_y - 50,
        body    : gameChar_y - 35,
        arm     : gameChar_y - 35,
        lLeg    : gameChar_y - 5,
        rLeg    : gameChar_y - 5
    }
    
    //head
    fill(255,175,175)
    rect(gameChar_x,charCd.head,15,15);
    fill(255)
    rect(gameChar_x,charCd.head + 10,4.5,2)
    
    //right arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x + 20,  charCd.arm)
    vertex(gameChar_x + 25,  charCd.arm + 35)
    vertex(gameChar_x + 20,  charCd.arm + 32.5)
    vertex(gameChar_x + 13,  charCd.arm)
    endShape(CLOSE)
    
    //left leg
    beginShape()
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x - 5,   charCd.body + 60)
    vertex(gameChar_x,       charCd.body + 60)
    vertex(gameChar_x + 10,  charCd.body + 30)
    endShape(CLOSE)
    
    //right leg
    beginShape()
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body + 60)
    vertex(gameChar_x + 15,  charCd.body + 60)
    vertex(gameChar_x + 5,   charCd.body + 30)
    endShape(CLOSE)
    
    //body
    fill(255,150,150)
    beginShape()
    vertex(gameChar_x,       charCd.body)
    vertex(gameChar_x - 5,   charCd.body)
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body)
    endShape(CLOSE)
    
    //left arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x,   charCd.arm + 2.5)
    vertex(gameChar_x - 10,  charCd.arm + 35)
    vertex(gameChar_x - 5,   charCd.arm + 32.5)
    vertex(gameChar_x + 7,   charCd.arm + 2.5)
    endShape(CLOSE)
}

function wRight(){
    var charCd = {
        head    : gameChar_y - 50,
        body    : gameChar_y - 35,
        arm     : gameChar_y - 35,
        lLeg    : gameChar_y - 5,
        rLeg    : gameChar_y - 5
    }
    
    //head
    fill(255,175,175)
    rect(gameChar_x,charCd.head,15,15);
    fill(255)
    rect(gameChar_x + 10.5,charCd.head + 10,4.5,2)
    
    //left arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x - 5,   charCd.arm)
    vertex(gameChar_x - 10,  charCd.arm + 35)
    vertex(gameChar_x - 5,   charCd.arm + 32.5)
    vertex(gameChar_x + 2,   charCd.arm)
    endShape(CLOSE)
    
    //left leg
    beginShape()
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x - 5,   charCd.body + 60)
    vertex(gameChar_x,       charCd.body + 60)
    vertex(gameChar_x + 10,  charCd.body + 30)
    endShape(CLOSE)
    
    //right leg
    beginShape()
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body + 60)
    vertex(gameChar_x + 15,  charCd.body + 60)
    vertex(gameChar_x + 5,   charCd.body + 30)
    endShape(CLOSE)
    
    //body
    fill(255,150,150)
    beginShape()
    vertex(gameChar_x,       charCd.body)
    vertex(gameChar_x - 5,   charCd.body)
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body)
    endShape(CLOSE)
    
    //right arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x + 15,  charCd.arm + 2.5)
    vertex(gameChar_x + 25,  charCd.arm + 35)
    vertex(gameChar_x + 20,  charCd.arm + 32.5)
    vertex(gameChar_x + 8,  charCd.arm + 2.5)
    endShape(CLOSE)
}

function jForward(){
    var charCd = {
        head    : gameChar_y - 50,
        body    : gameChar_y - 35,
        arm     : gameChar_y - 35,
        lLeg    : gameChar_y - 5,
        rLeg    : gameChar_y - 5
    }
    
    //head
    fill(255,175,175)
    rect(gameChar_x,charCd.head,15,15);
    fill(255)
    ellipse(gameChar_x + 7.5,charCd.head + 10,3,3)
    
    //left arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x - 5,   charCd.arm)
    vertex(gameChar_x - 15,  charCd.arm + 25)
    vertex(gameChar_x - 10,  charCd.arm + 27.5)
    vertex(gameChar_x + 2,   charCd.arm)
    endShape(CLOSE)
    
    //right arm
    beginShape()
    vertex(gameChar_x + 20,  charCd.arm)
    vertex(gameChar_x + 30,  charCd.arm + 25)
    vertex(gameChar_x + 25,  charCd.arm + 27.5)
    vertex(gameChar_x + 13,  charCd.arm)
    endShape(CLOSE)
    
    //left leg
    beginShape()
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x - 7.5, charCd.body + 40)
    vertex(gameChar_x - 5,   charCd.body + 55)
    vertex(gameChar_x,       charCd.body + 50)
    vertex(gameChar_x,       charCd.body + 40)
    vertex(gameChar_x + 10,  charCd.body + 30)
    endShape(CLOSE)
    
    //right leg
    beginShape()
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 22.5,charCd.body + 40)
    vertex(gameChar_x + 20,  charCd.body + 55)
    vertex(gameChar_x + 15,  charCd.body + 50)
    vertex(gameChar_x + 15,  charCd.body + 40)
    vertex(gameChar_x + 5,   charCd.body + 30)
    endShape(CLOSE)
    
    //body
    fill(255,150,150)
    beginShape()
    vertex(gameChar_x,       charCd.body)
    vertex(gameChar_x - 5,   charCd.body)
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body)
    endShape(CLOSE)
}

function jRight(){
    var charCd = {
        head    : gameChar_y - 50,
        body    : gameChar_y - 35,
        arm     : gameChar_y - 35,
        lLeg    : gameChar_y - 5,
        rLeg    : gameChar_y - 5
    }
    
    //head
    fill(255,175,175)
    rect(gameChar_x,charCd.head,15,15);
    fill(255)
    ellipse(gameChar_x + 14.5,charCd.head + 10,2,2)
    
    //left arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x - 5,   charCd.arm)
    vertex(gameChar_x - 15,  charCd.arm + 25)
    vertex(gameChar_x - 10,  charCd.arm + 27.5)
    vertex(gameChar_x + 2,   charCd.arm)
    endShape(CLOSE)
    
    //left leg
    beginShape()
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x - 7.5, charCd.body + 40)
    vertex(gameChar_x - 5,   charCd.body + 55)
    vertex(gameChar_x,       charCd.body + 50)
    vertex(gameChar_x,       charCd.body + 40)
    vertex(gameChar_x + 10,  charCd.body + 30)
    endShape(CLOSE)
    
    //right leg
    beginShape()
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 22.5,charCd.body + 40)
    vertex(gameChar_x + 20,  charCd.body + 55)
    vertex(gameChar_x + 15,  charCd.body + 50)
    vertex(gameChar_x + 15,  charCd.body + 40)
    vertex(gameChar_x + 5,   charCd.body + 30)
    endShape(CLOSE)
    
    //body
    fill(255,150,150)
    beginShape()
    vertex(gameChar_x,       charCd.body)
    vertex(gameChar_x - 5,   charCd.body)
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body)
    endShape(CLOSE)
    
    //right arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x + 15,  charCd.arm + 2.5)
    vertex(gameChar_x + 30,  charCd.arm + 25)
    vertex(gameChar_x + 25,  charCd.arm + 27.5)
    vertex(gameChar_x + 8.5, charCd.arm + 2.5)
    endShape(CLOSE)
}

function jLeft(){
    var charCd = {
        head    : gameChar_y - 50,
        body    : gameChar_y - 35,
        arm     : gameChar_y - 35,
        lLeg    : gameChar_y - 5,
        rLeg    : gameChar_y - 5
    }
    
    //head
    fill(255,175,175)
    rect(gameChar_x,charCd.head,15,15);
    fill(255)
    ellipse(gameChar_x + 0.5,charCd.head + 10,2,2)
    
    //right arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x + 20,  charCd.arm)
    vertex(gameChar_x + 30,  charCd.arm + 25)
    vertex(gameChar_x + 25,  charCd.arm + 27.5)
    vertex(gameChar_x + 13,  charCd.arm)
    endShape(CLOSE)
    
    //left leg
    beginShape()
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x - 7.5, charCd.body + 40)
    vertex(gameChar_x - 5,   charCd.body + 55)
    vertex(gameChar_x,       charCd.body + 50)
    vertex(gameChar_x,       charCd.body + 40)
    vertex(gameChar_x + 10,  charCd.body + 30)
    endShape(CLOSE)
    
    //right leg
    beginShape()
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 22.5,charCd.body + 40)
    vertex(gameChar_x + 20,  charCd.body + 55)
    vertex(gameChar_x + 15,  charCd.body + 50)
    vertex(gameChar_x + 15,  charCd.body + 40)
    vertex(gameChar_x + 5,   charCd.body + 30)
    endShape(CLOSE)
    
    //body
    fill(255,150,150)
    beginShape()
    vertex(gameChar_x,       charCd.body)
    vertex(gameChar_x - 5,   charCd.body)
    vertex(gameChar_x,       charCd.body + 30)
    vertex(gameChar_x + 15,  charCd.body + 30)
    vertex(gameChar_x + 20,  charCd.body)
    endShape(CLOSE)
    
    //left arm
    fill(255,175,175)
    beginShape()
    vertex(gameChar_x,       charCd.arm + 2.5)
    vertex(gameChar_x - 15,  charCd.arm + 25)
    vertex(gameChar_x - 10,  charCd.arm + 27.5)
    vertex(gameChar_x + 7.5, charCd.arm + 2.5)
    endShape(CLOSE)
}

function checkCanyon(canyonX, canyonW){     
    if((gameChar_x > canyonX + scrollPos / 1.25) && (gameChar_x < canyonX + canyonW + scrollPos / 1.25) && (gameChar_y >= floorPos_y - 1)){
        isFalling = true;
        gameChar_y++;
    }else{
            isFalling = false;
    }
}

function playerWon(){
    if(isWon == true) {
        
    }
}

function nextLevel()
{
    console.log('next level');
}


function draw(){
    background(100, 155, 255); //fill the sky blue

    push();
    translate(scrollPos / 400, 0);
    for(i = 0; i <= sunXs.length; i++) {
        sun(sunXs[i]);
    }
    pop();
    
    push();
    translate(scrollPos / 10, 0)
    for(i = 0; i <= cloudSX.length; i++) {
        cloudS(cloudSX[i],cloudSY[i]);
    }
    pop();
    
    push();
    translate(scrollPos / 30, 0);
    for(i = 0; i <= mountainXs.length; i++) {
        mountain(mountainXs[i],mountainYs[i]);
    }
    pop();
    
    push();
    translate(scrollPos / 3, 0)
    for(i = 0; i <= treeXs.length; i++) {
        tree(treeXs[i],treeYs[i]);
    }
    pop();
    
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width * 5, height/4); //draw some green ground

    // Draw clouds.
    push();
    translate(scrollPos / 2, 0)
    for(i = 0; i <= cloudXs.length; i++) {
        cloud(cloudXs[i],cloudYs[i]);
    }
    pop();
    
    // Draw houses.
    push();
    translate(scrollPos / 1.25, 0);
    for(i = 0; i <= houseXs.length; i++) {
        house(houseXs[i],houseYs[i]);
    }
    pop();
    
    push();
    translate(scrollPos / 1.25, 0)
    for(i = 0; i <= canyonXpos.length; i++) {
        canyon(canyonXpos[i],canyonWidth[i]);
    }
    
    for(i = 0; i <= canyonXpos.length; i++) {
        checkCanyon(canyonXpos[i], canyonWidth[i])
    }
    pop();
    
    push();
    translate(scrollPos / 1.25, 0)
    if(star1.isFound == false) {
        star1.drawStar(star1.starX);
    }
    pop();
    
    push();
    translate(scrollPos / 1.25, 0)
        if(star2.isFound == false) {
        star2.drawStar(star2.starX);
    }
    pop();
    
    push();
    translate(scrollPos / 1.25, 0)
        if(star3.isFound == false) {
        star3.drawStar(star3.starX);
    }
    pop();
    
    star1.checkStar(star1.starX, 30);
    star2.checkStar(star2.starX, 30);
    star3.checkStar(star3.starX, 30);
    
    push();
    translate(scrollPos / 1.25, 0);
    for(i = 0; i < enemies.length; i++) {
        enemies[i].enemyRender();
        enemies[i].enemyMove();
        enemies[i].enemyCollision();
    }
    pop();
    
    push();
    translate(scrollPos / 1.25, 0);
    for(i = 0; i < platforms.length; i++) {
        platforms[i].platformRender();
        platforms[0].platformCollision();
    }
    pop();
    
    
    if(gameChar_y > height) {
       if(lives == 3) {
           lives = 2;
           realPos = 0;
           scrollPos = 0;
           gameChar_x = width / 2;
           gameChar_y = floorPos_y;
           fill(0);
       } else if(lives == 2) {
           lives = 1
           realPos = 0;
           scrollPos = 0;
           gameChar_x = width / 2;
           gameChar_y = floorPos_y;
       } else if(lives == 1) {
           lives = 0;
           realPos = 0;
           scrollPos = 0;
           gameChar_x = width / 2;
           gameChar_y = floorPos_y;
           isLost = true;
        } else {
            isLost == true;
        }
       }
    
    
    if(isLeft && isJumping)
        {
        // add your jumping-left code
        jLeft();
        }
        else if(isFalling)
        {
                if(isRight && isFalling) {
                    jRight();   
                }
                    else if(isLeft && isFalling) {
                    jLeft();   
                } else {
                    jForward();
                }
        }
    else if(isRight && isJumping)
        {
        // add your jumping-right code
        jRight();
        }
    else if(isLeft)
        {
        // add your walking left code
        wLeft();
        }
    else if(isRight)
        {
        // add your walking right code
        wRight();
        }
    else if(isJumping)
        {
        // add your jumping facing forwards code
        jForward();
        }
    else
        {
        // add your standing front facing code
        standing();
        }

    for(i = 0; i <= 10; i++) {
        cloudXs[0] -= 0.01;
        cloudXs[1] -= 0.01;
        cloudXs[2] -= 0.01;
        cloudXs[3] -= 0.01;
        cloudXs[4] -= 0.01;
        cloudXs[5] -= 0.01;
        cloudXs[6] -= 0.01;
        cloudXs[7] -= 0.01;
        cloudXs[8] -= 0.01;
        cloudSX[0] -= 0.005;
        cloudSX[1] -= 0.005;
        cloudSX[2] -= 0.005;
        cloudSX[3] -= 0.005;
        cloudSX[4] -= 0.005;
        cloudSX[5] -= 0.005;
        cloudSX[6] -= 0.005;
        cloudSX[7] -= 0.005;
        cloudSX[8] -= 0.005;
    }
    
    if((star1.isFound == true || star2.isFound == true || star3.isFound == true) && !(star1.isFound == true && star2.isFound == true && star3.isFound == true)) {
        score = 1;
    } 
    if((star1.isFound == true && star2.isFound == true && star3.isFound == false) || (star1.isFound == true && star2.isFound == false && star3.isFound == true) || (star1.isFound == false && star2.isFound == true && star3.isFound == true)) {
        score = 2;
    } 
    if(star1.isFound == true && star2.isFound == true && star3.isFound == true) {
        score = 3;
        isWon = true;
    }
    
    fill(0)
    textSize(20);
    
    if(lives == 3) {
        text("Lives:",0,18);
        ellipse(125,10,20,20);
        ellipse(100,10,20,20);
        ellipse(75,10,20,20);
            text("Score: " + score,150,18);
    } else if(lives == 2) {
        text("Lives:",0,18);
        ellipse(100,10,20,20);
        ellipse(75,10,20,20);
            text("Score: " + score,150,18);
    } else if(lives == 1) {
        text("Lives:",0,18);
        ellipse(75,10,20,20);
            text("Score: " + score,150,18);
    } else if(lives == 0) {
        isLost = true;
    } else {
        isLost = true;
    }
    
    if((isWon == true || isLost == true) && !(isWon == true && isLost == true)) {
        textSize(50)
        if(isWon == true) {
            text("You have won!", width/2 - 200,100);
            textSize(15);
            text("You had " + lives + " lives left!",width / 2 - 100,120);
            playerWon();
            nextLevel();
        }
        
    if(isLost == true) {
        text("You have lost!", width/2 - 200,100);
        textSize(15);
        text("Your score was: " + score,width / 2 - 100,120);
        }
    }
    
    if(isWon && isLost) {
        textSize(50)
        text("You have won!", width/2 - 200,100);
        textSize(15);
        text("but you also have no lives, lol",width / 2 - 100,120);
        playerWon();
        nextLevel();
    }


    
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(gameChar_x > width * 0.2)
			{
					gameChar_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(gameChar_x < width * 0.8)
			{
					gameChar_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
	if((gameChar_y < floorPos_y || gameChar_y > floorPos_y) && (!platforms[0].isPlatformed)) {
			gameChar_y += 2;
			isJumping = true;
    }  else {
        isJumping = false;
	}
    
    if((gameChar_y < floorPos_y || gameChar_y > floorPos_y) && platforms[0].isPlatformed == false) {
        isFalling = true;
    }  else if (platforms[0].isPlatformed) {
        isFalling = false;
    } else {
        isFalling = false;
    }

	if(isFalling)
	{
        gameChar_y += 2;
	}

	// Update real position of gameChar for collision detection.
	realPos = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

    
    if(isLost || isWon)
    {
    if(key == ' ')
    {
        nextLevel();
    }
    return;
    }
    
		// console.log(keyCode);
		// console.log(key);

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
					gameChar_y -= 100;
			}
	}
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}