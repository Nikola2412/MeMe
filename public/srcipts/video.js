let currentVolume = parseFloat(localStorage.getItem("videoVolume")) || 1; // Default to 100%

const videoElement = document.getElementById("current");

videoElement.addEventListener('volumechange',(element)=>{
    updateVolume(videoElement.volume)
})

function updateVolume(newVolume) {
  videoElement.volume = newVolume;
  localStorage.setItem("videoVolume", newVolume);
}
updateVolume(currentVolume);
