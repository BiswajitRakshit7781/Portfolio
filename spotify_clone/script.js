let currentsong = new Audio();

function secondsToMinutes(seconds) {

    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    var formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
    var formattedSeconds = (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

    return formattedMinutes + ':' + formattedSeconds;
}

async function getsongs() {
    let a = await fetch("songs/")
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs
}

const playmusic = (track,pause=false) => {
    currentsong.src = "songs/" + track
    if (!pause) {
        currentsong.play()
        play.src = "images/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = track.replaceAll("_"," ").replaceAll(".mp3", "")
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {

    let songs = await getsongs()
    playmusic(songs[0],true)

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li> 
                            <img src="images/music.svg" alt="" class="invert">
                            <div class="info">
                                <div>${song.replaceAll("_", " ")}</div>
                                <div>Song Artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img src="images/playsong.svg" alt="" class="invert">
                            </div></li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener('click', element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.replaceAll(" ", "_"));
        })
    })
    play.addEventListener('click', () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "images/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "images/playsong.svg"
        }
    })
    currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(currentsong.currentTime)}/${secondsToMinutes(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime/currentsong.duration)* 100 + "%";
    })
    document.querySelector(".seekbar").addEventListener("click", e=>{
        console.log(e.target,e.offsetX);
    })
}

main()