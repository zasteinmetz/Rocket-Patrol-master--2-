/*
Hand of Chaos
By Zackary Steinmetz
04/18/20
I did not know we were supposed to keep track of how long, but so I didn't keep track
however I spend just about every free hour I had in between classes perhaps more than 
I should because for artwork I used photoshop having never used it before and made cutscenes
that were deceptively time consuming. For all that I'm not even sure if it's a full 100 points
which is a shame for all it took me, but I don't want to add any more. So I think at least
15 hours but it could just be a very long 10

Implement a simultaneous two-player mode (30)
 
Display the time remaining (in seconds) on the screen (10)
 
Implement the speed increase that happens after 30 seconds in the original game (5)
 
Track a high score that persists across scenes and display it in the UI (5)
 
Replace the UI borders with new artwork (10)
I got rid of the green bar and put a new background on the play screen in addition to the UI 
I added for the other mods. (Does that count? I’m a little confused by what the description means)
 
Create a new title screen (e.g., new artwork, typography, layout) (10)
(I altered the title screen in terms of layout and added a new backdrop which is separate from the 
    one for the play screen)
 
My changes (20)
(I have the players switch control every five seconds causing the spaceships to switch what they score for. 
For instance, if player 1 had control of p1Rocket they will now control p2Rocket and vice versa. 
This did not involve me just reloading the rocket such as when it goes off-screen, but while it is already 
being moved by the other player. Additionally, there will be two scores tracking UI for each player and will 
switch too, that is to say, player 1 will always score points for the p1Scoreboard even if they control p2Rocket. 
It’s a lot more complicated than it sounds, certainly it felt easier than simultaneous control so I could see it 
getting 30 but I know for a fact it’s 20)
 
Miscellaneous (10?)
I know I didn’t exactly get approval for the cutscenes to count as part of my mod (mostly because I didn’t 
originally plan them to be that elaborate), however I managed to get a complicated series of scene 
transitions using various placements of dialogue as well as going back to some of the same scenes with 
altered layout by toggling a boolean in main.js. I also didn’t technically change the genre (unless you 
consider it to move from sci-fi to something like cosmic horror) but the cutscenes did I feel alter 
the tone of the piece at least. I don’t know I just like the state that it’s in now and don’t want to 
add anything that feels too much for what I’ve got already. The cutscenes really broke me towards the 
end and it feels like kind of a waste that they won’t count.

*/


//Game Configuration
let config = {
    type: Phaser.CANVAS,
    width : 640,
    height: 480,
    scene: [ Menu, Dialogue, Trapped, Mockery, Demonstration, Encouragement,  Play]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let starSpeed = 4;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;

// set highScore to 0
let highScore = 0;

// set firstTime to false to order cutscences
let firstTime = false;