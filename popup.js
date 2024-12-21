document.addEventListener('DOMContentLoaded', () => {

  // burada yerel hafızadan getirdim, eğer tıklanmışsa stop butonu gözükecek
  const isLooping = localStorage.getItem('isLooping') === 'true';
  const startTime = localStorage.getItem('startTime');
  const endTime = localStorage.getItem('endTime');
  
  // burada hangi itemler gözükecek karar veriyor
  if (isLooping) {
    document.getElementById('stopButton').style.display = "inline-block";
    document.getElementById('loopForm').style.display = "none";
    document.getElementById('statusText').textContent = `Loop ayarlandı: ${startTime} - ${endTime}`;
  } else {
    document.getElementById('stopButton').style.display = "none";
    document.getElementById('loopForm').style.display = "block";
  }
});

// tıklandığında başlayacak
document.getElementById('loopForm').addEventListener('submit', (event) => {

  event.preventDefault(); // bu sayfa yüklemesin diye yazdım
  
  // hepsini const olarak tanımladım, temiz bir js kodu yazmak için
  const startInput = document.getElementById('start').value;
  const endInput = document.getElementById('end').value;

  const startSeconds = timeToSeconds(startInput);
  const endSeconds = timeToSeconds(endInput);


  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: loopVideo,
        args: [startSeconds, endSeconds],
      });
    }
  });

  // burada yerele kaydediyorum
  localStorage.setItem('isLooping', 'true');
  localStorage.setItem('startTime', startInput);
  localStorage.setItem('endTime', endInput);

  // bilgileri kullanıcıya yazdırıyorum
  document.getElementById('statusText').textContent = `Loop ayarlandı: ${startInput} - ${endInput}`;
  document.getElementById('stopButton').style.display = "inline-block";
  document.getElementById('loopForm').style.display = "none";
});

// durdur tıklandığında
document.getElementById('stopButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: stopLoop,
      });
    }
  });

  localStorage.removeItem('isLooping');
  localStorage.removeItem('startTime');
  localStorage.removeItem('endTime');

  document.getElementById('statusText').textContent = "Loop durduruldu!";
  document.getElementById('stopButton').style.display = "none";
  document.getElementById('loopForm').style.display = "block";
});

// her seferinde tekrar çalışacak
function loopVideo(start, end) {
  const video = document.querySelector('video');
  if (video) {
    video.currentTime = start;

    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= end) {
        video.currentTime = start;
      }
    });
  } else {
    alert("Bu sayfada video yok.");
  }
}

// durdur değinde sayfa geri yüklensin, böylece tüm işlemler sıfırlanır
function stopLoop() {
  const video = document.querySelector('video');
  if (video) {
    window.location.reload();
  }
}

// zamanı hesaplamak için ayrı bir fonkisyon yazdım
function timeToSeconds(time) {
  const parts = time.split(':');
  const minutes = parseInt(parts[0]);
  const seconds = parseInt(parts[1]);
  return (minutes * 60) + seconds;
}
