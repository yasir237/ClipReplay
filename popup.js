document.addEventListener('DOMContentLoaded', () => {
  // Yerel hafızadan verileri getir
  const isLooping = localStorage.getItem('isLooping') === 'true';
  const startTime = localStorage.getItem('startTime');
  const endTime = localStorage.getItem('endTime');
  
  // Arayüzü duruma göre güncelle
  if (isLooping) {
    document.getElementById('stopButton').classList.remove('hidden');
    document.getElementById('loopForm').classList.add('hidden');
    document.getElementById('statusText').innerHTML = `<span class="time-info">${startTime} - ${endTime}</span> arasında döngü çalışıyor`;
  } else {
    document.getElementById('stopButton').classList.add('hidden');
    document.getElementById('loopForm').classList.remove('hidden');
  }
});

// Form gönderildiğinde
document.getElementById('loopForm').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const startInput = document.getElementById('start').value;
  const endInput = document.getElementById('end').value;

  const startSeconds = timeToSeconds(startInput);
  const endSeconds = timeToSeconds(endInput);

  // Videoyu döngüye al
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: loopVideo,
        args: [startSeconds, endSeconds],
      });
    }
  });

  // Durumu yerel hafızaya kaydet
  localStorage.setItem('isLooping', 'true');
  localStorage.setItem('startTime', startInput);
  localStorage.setItem('endTime', endInput);

  // Arayüzü güncelle
  document.getElementById('statusText').innerHTML = `<span class="time-info">${startInput} - ${endInput}</span> arasında döngü çalışıyor`;
  document.getElementById('stopButton').classList.remove('hidden');
  document.getElementById('loopForm').classList.add('hidden');
});

// Durdur butonuna tıklandığında
document.getElementById('stopButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: stopLoop,
      });
      
    }
  });

  // Yerel hafızadaki verileri temizle
  localStorage.removeItem('isLooping');
  localStorage.removeItem('startTime');
  localStorage.removeItem('endTime');

  // Arayüzü güncelle
  document.getElementById('statusText').textContent = "Döngü durduruldu";
  document.getElementById('stopButton').classList.add('hidden');
  document.getElementById('loopForm').classList.remove('hidden');
});

// Video döngüsü işlevi
function loopVideo(start, end) {
  const video = document.querySelector('video');
  if (video) {
    video.currentTime = start;

    // Eğer önceden dinleyici varsa kaldır
    if (video._loopHandler) {
      video.removeEventListener('timeupdate', video._loopHandler);
    }

    // Yeni kontrol fonksiyonu oluştur
    const checkTime = () => {
      if (video.currentTime >= end) {
        video.currentTime = start;
      }
    };

    // Dinleyiciyi ekle ve referansı sakla
    video.addEventListener('timeupdate', checkTime);
    video._loopHandler = checkTime;
  } else {
    alert("Bu sayfada video bulunamadı!");
  }
}

// Döngüyü durdurma işlevi
function stopLoop() {
  const video = document.querySelector('video');
  if (video && video._loopHandler) {
    video.removeEventListener('timeupdate', video._loopHandler);
    delete video._loopHandler;
  }
}


// Dakika:saniye formatını saniyeye çevirme
function timeToSeconds(time) {
  const parts = time.split(':');
  const minutes = parseInt(parts[0]) || 0;
  const seconds = parseInt(parts[1]) || 0;
  return (minutes * 60) + seconds;
}
