//Created by Illia (Locket Breeze)
//My YouTube: https://www.youtube.com/channel/UCSgnWlNrNLCzQtj6TkRskOw

console.log("Created by Illia (Locket Breeze)");
console.log("My YouTube: https://www.youtube.com/channel/UCSgnWlNrNLCzQtj6TkRskOw");

background = new Audio("sounds\\background.wav");
background.loop = true;
battle_start = new Audio("sounds\\battle_start.mp3");
button_hovered = new Audio("sounds\\button_hover.mp3");

let canvas = document.getElementsByTagName("canvas")[0];
let c = canvas.getContext("2d");
c.mozImageSmoothingEnabled = false;
c.webkitImageSmoothingEnabled = false;
c.msImageSmoothingEnabled = false;
c.imageSmoothingEnabled = false;
canvas.width = innerWidth;
canvas.height = innerHeight;
image_size = Math.max(canvas.width, canvas.height)/20;
mouse = {x: -1, y: -1, hovered: -1};
game = {game:false, menu: true, item: -1, bot_item: -1};
i = false;
langs = {
    uk: {
        choose: "Виберіть предмет:",
        you: "Ви",
        bot: "Бот",
        lose: "БОТ ПЕРЕМАГАЄ😥",
        win: "ВИ ПЕРЕМОГЛИ!😋",
        draw: "НІЧИЯ😊"
    },
    "uk-UA": {
        choose: "Виберіть предмет:",
        you: "Ви",
        bot: "Бот",
        lose: "БОТ ПЕРЕМАГАЄ😥",
        win: "ВИ ПЕРЕМОГЛИ!😋",
        draw: "НІЧИЯ😊"
    },
    ru: {
        choose: "Выберите предмет:",
        you: "Вы",
        bot: "Бот",
        lose: "БОТ ПОЛУЧАЕТ ПОБЕДУ😥",
        win: "ВЫ ВЫГРАЛИ!😋",
        draw: "НИЧЬЯ😊"
    },
    "ru-RU": {
        choose: "Выберите предмет:",
        you: "Вы",
        bot: "Бот",
        lose: "БОТ ПОЛУЧАЕТ ПОБЕДУ😥",
        win: "ВЫ ВЫГРАЛИ!😋",
        draw: "НИЧЬЯ😊"
    },
    en: {
        choose: "Choose your item:",
        you: "You",
        bot: "Bot",
        lose: "BOT WON😥",
        win: "YOU WON!😋",
        draw: "DRAW😊"
    },
    "en-US": {
        choose: "Choose your item:",
        you: "You",
        bot: "Bot",
        lose: "BOT WON😥",
        win: "YOU WON!😋",
        draw: "DRAW😊"
    }
}
your_lang = navigator.language;
your_dict = langs[your_lang]? langs[your_lang]: langs["en"];

timings = {
    PLAYER_X: -image_size, 
    PLAYER_Y: canvas.height/2-image_size/2,
    BOT_X: canvas.width,
    BOT_Y: canvas.height/2-image_size/2
}

rules = {0:1, 1:2, 2:0};

s_paper = {
    normal:"assets\\paper.png",
    hover:"assets\\paperhover.png"
}
s_rock = {
    normal:"assets\\rock.png",
    hover:"assets\\rockhover.png"
}
s_scissors = {
    normal:"assets\\scissors.png",
    hover:"assets\\scissorshover.png"
}
let particles = [];
Paper = new Image(16, 16);
Paper.src = s_paper.normal;
Rock = new Image(16, 16);
Rock.src = s_rock.normal;
Scissors = new Image(16, 16);
Scissors.src = s_scissors.normal;
list_items = ["Rock", "Scissors", "Paper"];

Corona = new Image(16, 16);
Corona.src = "assets\\corona.png";

AndroidDownload = new Image(96, 16);
AndroidDownload.src = "assets\\android_download.png";

bg_r = 184;
bg_g = 72;
bg_b = 228;
bg_a = 0;

addEventListener("mouseup", event => {
    if (mouse.hovered == -1 | !game.game){
        return;
    } else if (mouse.hovered < 3) {
        game.item = mouse.hovered;
        game.bot_item = Math.floor(Math.random()*3);
        game.game = false;
        mouse.hovered = -1;
        canvas.style.cursor = "auto";
        timings = {
            PLAYER_X: -image_size, 
            PLAYER_Y: canvas.height/2,
            BOT_X: canvas.width,
            BOT_Y: canvas.height/2
        }
        create_unvinnete(() => {
            game.menu = false;
            create_vinnete(() => {
                game.game=true;
                stop_background();
                play_start();
                setTimeout(process, 0);
            });
        })
    }
    else if (mouse.hovered == 3){
        window.location.replace("app.apk");
    }
})

addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener("resize", event => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    image_size = Math.max(canvas.width, canvas.height)/20;
    timings.PLAYER_X = i? canvas.width/2+image_size/2-i:-image_size; 
    timings.BOT_X = i? canvas.width/2+image_size/2+i:canvas.width;
    mouse.x = -1;
    mouse.y = -1;
    mouse.hovered = -1;
});

function create_vinnete(after){
    bg_a = 0;
    let v = setInterval((aft) => {
        if (bg_a < 1){
            bg_a += 0.005;
        } else {
            bg_a = 1;
            aft();
            clearInterval(v);
        }
    }, 10, after);
};

function create_unvinnete(after){
    bg_a = 1;
    let unv = setInterval((aft) => {
        if (bg_a > 0.005){
            bg_a -= 0.005;
        } else {
            bg_a = 0;
            aft();
            clearInterval(unv);
        }
    }, 10, after);
};

class Particle{
    constructor(x, y){
        this.direction = Math.random()*(Math.PI*2);
        this.endDir = Math.random()*(Math.PI*2);
        this.long = Math.ceil(Math.random()*10)+20;
        this.alpha = 1;
        this.color = `rgb(255, 255, 255, ${this.alpha})`;
        this.x = x;
        this.y = y;
    }
    draw(){
        this.color = `rgb(255, 255, 255, ${this.alpha})`;
        this.x += Math.sin(this.direction)*2;
        this.y += Math.cos(this.direction)*2;
        this.endDir += 0.1;
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = 3;
        c.lineCap = "round";
        c.lineTo(this.x, this.y);
        c.lineTo(this.x+Math.sin(this.endDir)*this.long, this.y+Math.cos(this.endDir)*this.long);
        c.stroke();
        c.closePath();
        if (this.alpha < 0.1){
            particles.splice(particles.indexOf(this), 1);
        }
        this.alpha /= 1.02;
    }
}

function spawnParticles(x, y, count){
    for (i=0; i<count; i++){
        particles.push(new Particle(x, y));
    }
}

function process(){
    i=0;
    let battle = setInterval(()=>{
        if (i<=canvas.width/2+image_size/2){
            timings.PLAYER_X += 10;
            timings.BOT_X -= 10;
            i += 10;
        } else {
            timings.PLAYER_X = canvas.width/2-image_size/2;
            timings.BOT_X = canvas.width/2-image_size/2;
            spawnParticles(canvas.width/2, timings.BOT_Y+image_size/2, 40);
            game.win = rules[game.item] == game.bot_item? your_dict.win: rules[game.bot_item] == game.item? your_dict.lose: your_dict.draw;
            timings.PLAYER_Y = -1;
            timings.BOT_Y = -1;
            clearInterval(battle);
            setTimeout(
                () => {
                    play_background();
                    create_unvinnete(()=>{
                        mouse.x = -1;
                        mouse.y = -1;
                        mouse.hovered = -1;
                        game = {game:false, menu: true, item: -1, bot_item: -1};
                        particles = [];
                        i = false;
                        create_vinnete(
                            ()=>{
                                game.game = true;
                            }
                        )
                    })
                }, 3000
            )
        }
    }, 20);
}

function play(){
    Rock.src = s_rock.normal;
    Scissors.src = s_scissors.normal;
    Paper.src = s_paper.normal;
    if (timings.PLAYER_Y!=-1&timings.BOT_Y!=-1){
        c.drawImage(game.item==0?Rock:game.item==1?Scissors:game.item==2?Paper:-1, timings.PLAYER_X, timings.PLAYER_Y, image_size, image_size);
        c.drawImage(game.bot_item==0?Rock:game.bot_item==1?Scissors:game.bot_item==2?Paper:-1, timings.BOT_X, timings.BOT_Y, image_size, image_size);
        c.fillStyle = "rgb(255, 255, 255)";
        c.textAlign = "center";
        c.font = `bold ${Math.max(canvas.width, canvas.height)/50}px courier new`;
        c.fillText(your_dict.you, canvas.width/3, canvas.height/2-image_size);
        c.closePath();
        c.fillStyle = "rgb(255, 255, 255)";
        c.textAlign = "center";
        c.font = `bold ${Math.max(canvas.width, canvas.height)/50}px courier new`;
        c.fillText(your_dict.bot, canvas.width/4+canvas.width/2, canvas.height/2-image_size);
        c.closePath();
    }else{
        particles.forEach(element => {
            element.draw();
        });
        c.fillStyle = "rgb(255, 255, 255)";
        c.textAlign = "center";
        c.font = `bold ${Math.max(canvas.width, canvas.height)/25}px courier new`;
        c.fillText(game.win, canvas.width/2, canvas.height/2);
        c.closePath();
        if (game.win == your_dict.win){
            c.drawImage(Corona, canvas.width/2-image_size/2, canvas.height/2-image_size*1.5, image_size, image_size);
        }
    }
}

function clear(color){
    c.beginPath();
    c.fillStyle = color? color: "rgb(184, 72, 228)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.closePath();
}
clear();

function drawFrame(){
    c.beginPath();
    c.fillStyle = "rgba(129, 51, 160, 0.2)";
    c.lineTo(0, 0);
    c.lineTo(0, canvas.height);
    c.lineTo(canvas.width/10, canvas.height);
    c.fill();
    c.closePath();
}

function drawMenu(){
    c.drawImage(Rock, canvas.width/2-image_size/2-image_size, canvas.height/2-image_size/2, image_size, image_size);
    c.drawImage(Scissors, canvas.width/2-image_size/2, canvas.height/2-image_size/2, image_size, image_size);
    c.drawImage(Paper, canvas.width/2-image_size/2+image_size, canvas.height/2-image_size/2, image_size, image_size);
    c.drawImage(AndroidDownload, 5, 5, image_size*6, image_size);
    c.beginPath();
    c.fillStyle = "rgb(255, 255, 255)";
    c.textAlign = "center";
    c.font = `bold ${Math.max(canvas.width, canvas.height)/50}px courier new`;
    c.fillText(your_dict.choose, canvas.width/2, canvas.height/2-image_size);
    c.closePath();
    canvas.style.cursor = "auto";
    if (game.game){
        if (mouse.x >= canvas.width/2-image_size/2-image_size & mouse.x <= canvas.width/2-image_size/2-image_size+image_size &
            mouse.y >= canvas.height/2-image_size/2 & mouse.y <= canvas.height/2-image_size/2 + image_size){
            Rock.src = s_rock.hover
            canvas.style.cursor = "pointer";
            if (mouse.hovered != 0){
                mouse.hovered = 0;
                button_hovered.play();
            }
        }else{
            Rock.src = s_rock.normal;
            mouse.hovered = mouse.hovered == 0? -1: mouse.hovered;
        }
        if (mouse.x >= canvas.width/2-image_size/2 & mouse.x <= canvas.width/2-image_size/2+image_size &
            mouse.y >= canvas.height/2-image_size/2 & mouse.y <= canvas.height/2-image_size/2 + image_size){
            Scissors.src = s_scissors.hover
            canvas.style.cursor = "pointer";
            if (mouse.hovered != 1){
                mouse.hovered = 1;
                button_hovered.play();
            }
        }else{
            Scissors.src = s_scissors.normal;
            mouse.hovered = mouse.hovered == 1? -1: mouse.hovered;
        }
        if (mouse.x >= canvas.width/2-image_size/2+image_size & mouse.x <= canvas.width/2-image_size/2+image_size+image_size &
            mouse.y >= canvas.height/2-image_size/2 & mouse.y <= canvas.height/2-image_size/2 + image_size){
            Paper.src = s_paper.hover
            canvas.style.cursor = "pointer";
            if (mouse.hovered != 2){
                mouse.hovered = 2;
                button_hovered.play();
            }
        }else{
            Paper.src = s_paper.normal;
            mouse.hovered = mouse.hovered == 2? -1: mouse.hovered;
        }
        if (mouse.x >= 5 & mouse.x <= 5 + image_size*6 &
            mouse.y >= 5 & mouse.y <= 5 + image_size){
            canvas.style.cursor = "pointer";
            if (mouse.hovered != 3){
                mouse.hovered = 3;
                button_hovered.play();
            }
        }else{
            mouse.hovered = mouse.hovered == 3? -1: mouse.hovered;
        }
    }
}

function play_background(){
    try{
        background.play();
    }catch{
        console.error("Play background sound error");
    }
}
function stop_background(){
    try{
        background.pause()
    }catch{
        console.error("Stop background sound error");
    }
}
function play_start(){
    try{
        battle_start.play();
    }catch{
        console.error("Play start sound error");
    }
}
function stop_start(){
    try{
        battle_start.pause()
    }catch{
        console.error("Stop start sound error");
    }
}

function updater(){
    clear(`rgb(${bg_r}, ${bg_g}, ${bg_b})`);
    //work start;

    drawFrame();
    if (game.menu){
        drawMenu();
    } else {
        play();
    }

    //work end;
    clear(`rgb(0, 0, 0, ${1-bg_a})`);
    requestAnimationFrame(updater);
}
updater()
setTimeout(create_vinnete, 300, ()=>{
    game.game=true;
    play_background();
});