// 1. Saat Güncelleme
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. Müzik Çalar Sistemi (Yeni Playlist)
const songs = [
    { title: "Zamansızdık", artist: "Manifest", url: "https://dl.dropboxusercontent.com/scl/fi/f0c3f0c3f0c3f0c3f0c3f/manifest-zamansizdik.mp3?rlkey=xyz" }, // Placeholder URL
    { title: "Paradise", artist: "Sade", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }, 
    { title: "Kiss Of Life", artist: "Sade", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Impacto", artist: "Enjambre", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "The Message", artist: "Still Corners", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
];

let currentSongIndex = 0;
const audio = new Audio();
const trackNameDisplay = document.getElementById('track-name');
const playPauseBtn = document.getElementById('play-pause');
const playlistUI = document.getElementById('playlist');
const volumeControl = document.getElementById('volume');

// Çalma Listesini Oluştur
function loadPlaylist() {
    playlistUI.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${song.artist} - ${song.title}`;
        li.style.cursor = "pointer";
        li.style.padding = "2px 5px";
        li.onclick = () => playSong(index);
        
        if (index === currentSongIndex) {
            li.style.background = "#0a246a";
            li.style.color = "white";
            li.style.fontWeight = "bold";
        }
        playlistUI.appendChild(li);
    });
}

function playSong(index) {
    currentSongIndex = index;
    audio.src = songs[currentSongIndex].url;
    trackNameDisplay.textContent = `${songs[currentSongIndex].artist} - ${songs[currentSongIndex].title}`;
    audio.play();
    playPauseBtn.textContent = "Pause";
    loadPlaylist();
}

playPauseBtn.onclick = () => {
    if (audio.paused) {
        if (!audio.src) playSong(0);
        else audio.play();
        playPauseBtn.textContent = "Pause";
    } else {
        audio.pause();
        playPauseBtn.textContent = "Play";
    }
};

document.getElementById('next').onclick = () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
};

document.getElementById('prev').onclick = () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
};

volumeControl.oninput = (e) => {
    audio.volume = e.target.value / 100;
};

// Başlangıçta listeyi yükle
loadPlaylist();
trackNameDisplay.textContent = songs[0].title;

// 3. Mesaj Gönderme (Formspree Entegrasyonu)
const contactForm = document.getElementById('contact-form');
contactForm.onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const submitBtn = contactForm.querySelector('button');
    
    submitBtn.textContent = "Gönderiliyor...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://formspree.io/f/mnjbyozb", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, message: message })
        });

        if (response.ok) {
            alert(`Teşekkürler ${name}! Mesajın başarıyla mailime gönderildi.`);
            contactForm.reset();
        } else {
            alert("Bir hata oluştu, lütfen tekrar deneyin.");
        }
    } catch (error) {
        alert("Bağlantı hatası!");
    } finally {
        submitBtn.textContent = "Gönder";
        submitBtn.disabled = false;
    }
};

// 4. Admin Paneli Girişi
function openAdmin() {
    const password = prompt("Yönetici şifresini giriniz:");
    if (password === "Mehmet33421.") { 
        alert("Hoşgeldiniz Mehmet! \n\nMesajları Formspree panelinden (https://formspree.io) takip edebilirsiniz.");
    } else {
        alert("Hatalı şifre!");
    }
}
