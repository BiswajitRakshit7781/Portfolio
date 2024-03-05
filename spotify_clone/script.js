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

async function main() {
    let songs = await getsongs()
    console.log(songs)
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML + `<li> ${song.replaceAll("_"," ")} </li>`;
    }
    var audio = new Audio(songs[0]);
    // audio.play();
}

main()