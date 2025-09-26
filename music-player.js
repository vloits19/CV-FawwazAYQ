// Music Player functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shufflePlaylistBtn = document.getElementById('shufflePlaylistBtn');
    const loopBtn = document.getElementById('loopBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const currentSongTitle = document.getElementById('currentSongTitle');
    const currentSongArtist = document.getElementById('currentSongArtist');
    const playlistEl = document.getElementById('playlist');
    const searchInput = document.getElementById('searchInput');
    const showAllBtn = document.getElementById('showAllBtn');
    const showingCount = document.getElementById('showingCount');
    const toggleIcon = document.getElementById('toggleIcon');
    const playlistContent = document.getElementById('playlistContent');
    const playerLogo = document.getElementById('playerLogo');

    // Music files list (from the Music folder)
    const musicFiles = [
        {title: "ALiCE&u", artist: "Unknown Artist", filename: "ALiCE&u.mp3"},
        {title: "Animal Crossing - New Horizons Lofi", artist: "Lofi Version", filename: "animal crossing  new horizons lofi.mp3"},
        {title: "December", artist: "Unknown Artist", filename: "December.mp3"},
        {title: "Fond Memories", artist: "Unknown Artist", filename: "Fond Memories.mp3"},
        {title: "Hopes And Dreams", artist: "Unknown Artist", filename: "Hopes And Dreams.mp3"},
        {title: "I'd like to watch you sleeping", artist: "Unknown Artist", filename: "I'd like to watch you sleeping.mp3"},
        {title: "Lil Uzi", artist: "Unknown Artist", filename: "Lil Uzi.mp3"},
        {title: "MENTE MÁ", artist: "Unknown Artist", filename: "MENTE MÁ.mp3"},
        {title: "MONTAGEM RUGADA", artist: "Unknown Artist", filename: "MONTAGEM RUGADA.mp3"},
        {title: "NO ERA AMOR (Super Slowed)", artist: "Unknown Artist", filename: "NO ERA AMOR (Super Slowed).mp3"},
        {title: "o,Tuan", artist: "Unknown Artist", filename: "o,Tuan.mp3"},
        {title: "Sanctuary", artist: "Unknown Artist", filename: "Sanctuary.mp3"},
        {title: "semua lagu cinta terdengar sama", artist: "Unknown Artist", filename: "semua lagu cinta terdengar sama.mp3"},
        {title: "Shop", artist: "Unknown Artist", filename: "Shop.mp3"}
    ];

    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShufflePlaylist = false; // For playlist shuffle
    let isLoop = false; // For loop functionality
    let originalMusicFiles = [...musicFiles]; // Store original order
    let filteredSongs = [...musicFiles]; // Store filtered songs
    let displayedSongs = []; // Store currently displayed songs
    const songsPerPage = 5; // Number of songs to show per page
    let currentPage = 1;
    let isPlaylistCollapsed = false;

    // Initialize playlist
    function initPlaylist() {
        renderPlaylist();
        updatePlaylistHighlight();
        updateShowingCount();
    }

    // Render playlist based on current filter and pagination
    function renderPlaylist() {
        playlistEl.innerHTML = '';
        
        // Calculate start and end indices for current page
        const startIndex = (currentPage - 1) * songsPerPage;
        const endIndex = startIndex + songsPerPage;
        displayedSongs = filteredSongs.slice(startIndex, endIndex);
        
        displayedSongs.forEach((song, index) => {
            const actualIndex = filteredSongs.indexOf(song);
            const item = document.createElement('div');
            item.className = 'list-group-item';
            item.textContent = `${song.title} - ${song.artist}`;
            item.dataset.index = actualIndex;
            
            item.addEventListener('click', () => {
                // Find the corresponding index in the original musicFiles array
                const originalIndex = musicFiles.findIndex(s => s.filename === song.filename);
                playSong(originalIndex);
            });
            
            playlistEl.appendChild(item);
        });
        
        updatePlaylistHighlight();
    }

    // Update playlist highlight
    function updatePlaylistHighlight() {
        const items = playlistEl.querySelectorAll('.list-group-item');
        items.forEach(item => {
            const index = parseInt(item.dataset.index);
            if (index === currentSongIndex) {
                item.classList.add('active-song');
            } else {
                item.classList.remove('active-song');
            }
        });
    }

    // Play a song
    function playSong(index) {
        if (index < 0 || index >= musicFiles.length) return;
        
        currentSongIndex = index;
        const song = musicFiles[currentSongIndex];
        
        // Update audio source
        audioPlayer.src = `Music/${encodeURIComponent(song.filename)}`;
        
        // Update song info
        currentSongTitle.textContent = song.title;
        currentSongArtist.textContent = song.artist;
        
        // Update playlist highlight
        updatePlaylistHighlight();
        
        // Play the song
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
                updatePlayButton();
                // Add rotating class to logo when playing
                playerLogo.classList.add('logo-rotating');
            })
            .catch(error => {
                console.error('Error playing song:', error);
            });
    }

    // Play next song
    function nextSong() {
        if (isLoop) {
            // If looping, play the same song again
            playSong(currentSongIndex);
        } else if (isShufflePlaylist) {
            // Choose next song based on current playlist order
            currentSongIndex = (currentSongIndex + 1) % musicFiles.length;
            playSong(currentSongIndex);
        } else {
            currentSongIndex = (currentSongIndex + 1) % musicFiles.length;
            playSong(currentSongIndex);
        }
    }

    // Play previous song
    function prevSong() {
        if (isShufflePlaylist) {
            // Choose previous song based on current playlist order
            currentSongIndex = (currentSongIndex - 1 + musicFiles.length) % musicFiles.length;
            playSong(currentSongIndex);
        } else {
            currentSongIndex = (currentSongIndex - 1 + musicFiles.length) % musicFiles.length;
            playSong(currentSongIndex);
        }
    }

    // Update play/pause button
    function updatePlayButton() {
        if (isPlaying) {
            playIcon.classList.add('d-none');
            pauseIcon.classList.remove('d-none');
        } else {
            playIcon.classList.remove('d-none');
            pauseIcon.classList.add('d-none');
        }
    }

    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Update showing count
    function updateShowingCount() {
        if (filteredSongs.length <= songsPerPage) {
            showingCount.textContent = `Menampilkan ${filteredSongs.length} dari ${musicFiles.length} lagu`;
        } else {
            const startIndex = (currentPage - 1) * songsPerPage + 1;
            const endIndex = Math.min(currentPage * songsPerPage, filteredSongs.length);
            showingCount.textContent = `Menampilkan ${startIndex}-${endIndex} dari ${filteredSongs.length} lagu`;
        }
    }

    // Filter songs based on search input
    function filterSongs(searchTerm) {
        if (!searchTerm) {
            filteredSongs = [...musicFiles];
        } else {
            filteredSongs = musicFiles.filter(song => 
                song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                song.artist.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Reset to first page when filtering
        currentPage = 1;
        renderPlaylist();
        updateShowingCount();
    }

    // Shuffle playlist
    function shufflePlaylist() {
        // Create a copy of the original music files and shuffle
        const shuffled = [...originalMusicFiles].sort(() => Math.random() - 0.5);
        
        // Update musicFiles array with shuffled order
        musicFiles.splice(0, musicFiles.length, ...shuffled);
        
        // Update filtered songs to match the shuffled order
        filteredSongs = [...musicFiles];
        
        // Reset pagination and re-render
        currentPage = 1;
        renderPlaylist();
        updateShowingCount();
        
        // Update the current song index based on the new order
        if(currentSongIndex < musicFiles.length) {
            const currentSong = originalMusicFiles[currentSongIndex];
            currentSongIndex = musicFiles.findIndex(s => s.filename === currentSong.filename);
        }
    }

    // Restore original playlist order
    function restorePlaylistOrder() {
        // Reset musicFiles to original order
        musicFiles.splice(0, musicFiles.length, ...originalMusicFiles);
        filteredSongs = [...musicFiles];
        currentPage = 1;
        renderPlaylist();
        updateShowingCount();
        
        // Update the current song index based on the original order
        if(currentSongIndex < musicFiles.length) {
            const currentSong = musicFiles[currentSongIndex];
            currentSongIndex = originalMusicFiles.findIndex(s => s.filename === currentSong.filename);
        }
    }

    // Event listeners
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            // Remove rotating class from logo when paused
            playerLogo.classList.remove('logo-rotating');
        } else {
            audioPlayer.play()
                .then(() => {
                    isPlaying = true;
                    // Add rotating class to logo when playing
                    playerLogo.classList.add('logo-rotating');
                })
                .catch(error => {
                    console.error('Error playing:', error);
                });
        }
        updatePlayButton();
    });

    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);

    // Shuffle playlist button - shuffles the entire playlist
    shufflePlaylistBtn.addEventListener('click', () => {
        isShufflePlaylist = !isShufflePlaylist;
        shufflePlaylistBtn.classList.toggle('active', isShufflePlaylist);
        
        // If shuffle is now active, shuffle the playlist
        if (isShufflePlaylist) {
            shufflePlaylist();
        } else {
            // Restore original order
            restorePlaylistOrder();
        }
    });

    // Loop button
    loopBtn.addEventListener('click', () => {
        isLoop = !isLoop;
        loopBtn.classList.toggle('active', isLoop);
    });

    // Progress bar update
    audioPlayer.addEventListener('timeupdate', () => {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    });

    // Update duration when metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });

    // When song ends, play next
    audioPlayer.addEventListener('ended', () => {
        if (isLoop) {
            // If loop is enabled, play the same song again
            playSong(currentSongIndex);
        } else {
            nextSong();
        }
    });

    // Volume control
    volumeSlider.addEventListener('input', () => {
        audioPlayer.volume = volumeSlider.value;
    });

    // Progress bar click to seek functionality
    progressBar.parentElement.addEventListener('click', (e) => {
        const progressBarContainer = progressBar.parentElement;
        const rect = progressBarContainer.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const progressBarWidth = rect.width;
        const clickPercent = clickPosition / progressBarWidth;
        
        // Set the new time based on click position
        audioPlayer.currentTime = audioPlayer.duration * clickPercent;
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        filterSongs(e.target.value);
        // Reset the show all button to initial state
        if (showAllBtn.classList.contains('active')) {
            showAllBtn.textContent = "Tampilkan Semua Lagu";
            showAllBtn.classList.remove('active');
        }
        currentPage = 1;
    });

    // Show all button - show all filtered songs (not just the first 5)
    showAllBtn.addEventListener('click', () => {
        // Check if all songs are currently displayed
        const isDisplayingAll = filteredSongs.length === displayedSongs.length;
        
        if (!isDisplayingAll) {
            // Show all songs without pagination
            showAllBtn.textContent = "Sembunyikan";
            showAllBtn.classList.add('active');
            
            // Render all filtered songs
            playlistEl.innerHTML = '';
            
            filteredSongs.forEach((song, index) => {
                const originalIndex = musicFiles.findIndex(s => s.filename === song.filename);
                const item = document.createElement('div');
                item.className = 'list-group-item';
                item.textContent = `${song.title} - ${song.artist}`;
                item.dataset.index = originalIndex;
                
                item.addEventListener('click', () => {
                    playSong(originalIndex);
                });
                
                playlistEl.appendChild(item);
            });
            
            updatePlaylistHighlight();
            showingCount.textContent = `Menampilkan semua ${filteredSongs.length} lagu`;
        } else {
            // Revert to paginated view
            showAllBtn.textContent = "Tampilkan Semua Lagu";
            showAllBtn.classList.remove('active');
            currentPage = 1;
            renderPlaylist();
            updateShowingCount();
        }
    });

    // Toggle playlist collapse/expand
    playlistContent.addEventListener('hide.bs.collapse', () => {
        toggleIcon.className = 'fas fa-chevron-down';
        isPlaylistCollapsed = true;
    });

    playlistContent.addEventListener('show.bs.collapse', () => {
        toggleIcon.className = 'fas fa-chevron-up';
        isPlaylistCollapsed = false;
    });

    // Initialize the player
    initPlaylist();
    
    // Play the first song by default
    if (musicFiles.length > 0) {
        playSong(0);
    }
});