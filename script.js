document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const player = document.querySelector('.player');
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const volumeUpButton = document.getElementById('volume-up');
    const volumeDownButton = document.getElementById('volume-down');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalDurationDisplay = document.getElementById('total-duration');
    const albumArtImage = document.getElementById('album-art-image');
    const songNameDisplay = document.getElementById('song-name');
    const artistNameDisplay = document.getElementById('artist-name');

    const songs = [
        { src: 'songs/song1.mp3', name: 'Seedevi', artist: 'Piyath Rajapakshe', albumArt: 'images/album1.png' },
        { src: 'songs/song2.mp3', name: 'Ran Muduwaka', artist: 'Supun Perera', albumArt: 'images/album2.png' },
        { src: 'songs/song3.mp3', name: 'Neth Manema', artist: 'Dilu Beats', albumArt: 'images/album3.png' }
    ];
    let currentSongIndex = 0;

    function loadSong(index) {
        const song = songs[index];
        audio.src = song.src;
        albumArtImage.src = song.albumArt;
        songNameDisplay.textContent = song.name;
        artistNameDisplay.textContent = song.artist;
        audio.load();
    }

    function playSong() {
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
    }

    function pauseSong() {
        audio.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    }

    function updateProgressBar() {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }

    function setProgressBar() {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }

    function updateTotalDuration() {
        totalDurationDisplay.textContent = formatTime(audio.duration);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function volumeUp() {
        audio.volume = Math.min(audio.volume + 0.1, 1);
    }

    function volumeDown() {
        audio.volume = Math.max(audio.volume - 0.1, 0);
    }

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        player.style.display = 'block';
        loadSong(currentSongIndex);
    }, 1000);

    playButton.addEventListener('click', playSong);
    pauseButton.addEventListener('click', pauseSong);
    nextButton.addEventListener('click', nextSong);
    prevButton.addEventListener('click', prevSong);
    volumeUpButton.addEventListener('click', volumeUp);
    volumeDownButton.addEventListener('click', volumeDown);
    progressBar.addEventListener('input', setProgressBar);
    audio.addEventListener('timeupdate', updateProgressBar);
    audio.addEventListener('loadedmetadata', updateTotalDuration);
});
