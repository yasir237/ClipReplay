# ClipReplay - YouTube Video Bölümlerini Döngüye Alma Uzantısı

**ClipReplay**, YouTube videolarındaki belirli bölümleri sürekli olarak izlemek isteyen kullanıcılar için geliştirilmiş bir Chrome uzantısıdır. Bu uzantı, kullanıcıların video içerikleri üzerinde daha fazla kontrol sahibi olmasını sağlar. Özellikle eğitim amaçlı videolar veya müzik pratikleri gibi durumlar için son derece faydalıdır. Bu uzantı sayesinde, videoların yalnızca belirli bir kısmını seçip döngüye alarak, sürekli tekrar izleme işlemini zahmetsizce yapabilirsiniz.


<div align=center >
   <img src="https://github.com/user-attachments/assets/d74a2b02-cb32-4ce8-81d2-8bb6495ed252" alt="Logo" width=50%>
</div>

## Özellikler
- **Video Döngüsü:** YouTube videolarında belirlediğiniz zaman aralığını döngüye alır, kesintisiz bir izleme deneyimi sunar.
- **Zaman Aralığı Seçimi:** Başlangıç ve bitiş zamanlarını kolayca belirleyerek sadece istediğiniz kısmı izleyebilirsiniz.
- **Kolay Kullanım:** Basit ve anlaşılır kullanıcı arayüzü ile video bölümleri arasındaki geçişleri hızlıca ayarlayabilirsiniz.
- **Farklı Kullanım Senaryoları:** Eğitim videoları, müzik pratiği, belirli bir içeriğin tekrar tekrar izlenmesi gibi bir çok farklı amaçla kullanılabilir.

## Kurulum
1. **Chrome Uzantısını Yükleyin:**
   - Bu uzantıyı `Code` buttunundan ve `Download ZIP` buttonuna tıklayarak indirin.
   - Bu uzantıyı Chrome tarayıcısına yüklemek için, `manifest.json` dosyasının bulunduğu klasöre gidin.
   - Chrome'da `chrome://extensions/` sayfasına gidin.
   - Sağ üst köşedeki **Geliştirici modu**nu etkinleştirin.
   - **Paketlenmemiş uzantıyı yükle** butonuna tıklayın ve indirdiğiniz klasörü seçin.

3. **Uzantıyı Aktif Hale Getirin:**
   - Uzantı, simgesine tıkladığınızda aktif olur ve YouTube videolarında çalışmaya başlar.

## Kullanım
Uzantıyı yükledikten sonra, aşağıdaki adımları takip ederek bir video aralığını döngüye alabilirsiniz:

1. YouTube üzerinde bir video açın.
2. Uzantının simgesine tıklayın.
3. Başlangıç ve bitiş zamanlarını (dakika:saniye) girin.
4. **Döngüyü Başlat** butonuna tıklayın.
5. Video, belirlediğiniz zaman aralığında kesintisiz bir şekilde döngüye girecektir.

## Ana Sayfa
<div align=center >
   <img src="https://github.com/user-attachments/assets/a8d88cf2-4742-4eed-82ef-25bf8292c28b" alt="Ana Sayfa" width=50%>
</div>
Uzantı, kullanıcıların video döngüsü ayarlarını yapabilmesi için basit ve kullanıcı dostu bir popup arayüzüne sahiptir. Başlangıç ve bitiş zamanlarını girip, video döngüsünü başlatmak için aşağıdaki ekran görüntüsünü kullanabilirsiniz:
Bu arayüz, kullanıcıların videolarını döngüye almak için gerekli başlangıç ve bitiş zamanlarını kolayca girmelerini sağlar.

## Döngü Başlatıldığında
<div align=center >
   <img src="https://github.com/user-attachments/assets/4d2b90bf-c60a-4f42-9a8f-dbfd5da4cddf" alt="Loop Başlatıldığında" width=50%>
</div>
Döngü başlatıldığında, popup penceresinde ayarlanan zaman dilimiyle birlikte "döngü çalışıyor" mesajı gösterilir ve döngü işlemi başlar.


## Döngüyü Durdurmak
Video döngüsünü durdurmak için, popup penceresinde yer alan "Döngüyü Durdur" butonuna tıklayarak işlemi sonlandırabilirsiniz. Bu işlem, video zamanlayıcısını sıfırlayacak ve döngüyü durduracaktır. Aşağıda durdurma ekranının görselini görebilirsiniz:

## Kod Yapısı

### `background.js`

Bu dosya, uzantının video oynatma ve durdurma fonksiyonlarını içerir. Ayrıca, uzantının simgesine tıklandığında videoyu oynatıp duraklatmak için kullanılan işlevi barındırır.

```javascript
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: togglePlayPause
  });
});

function togglePlayPause() {
  const video = document.querySelector('video');
  if (video) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  } else {
    alert("Bu sayfada video yok.");
  }
}
```

### `manifest.json`

Bu dosya, uzantının temel yapılandırmasını ve gerekli izinleri içerir. YouTube'a özgü host izinleri ve uzantının ikonu gibi bilgiler burada tanımlanır.

```json
{
  "manifest_version": 3,
  "name": "ClipReplay",
  "version": "1.0",
  "description": "YouTube videolarının belirli bölümlerini kesip tekrar izleyebilmeniz için kolay bir araç.",
  "permissions": [
    "scripting",
    "activeTab"
  ],
  "host_permissions": [
    "https://www.youtube.com/*"
  ],
  "icons": {
    "16": "icons/ClipReplayLogo.png",
    "48": "icons/ClipReplayLogo.png",
    "128": "icons/ClipReplayLogo.png"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/ClipReplayLogo.png",
      "48": "icons/ClipReplayLogo.png",
      "128": "icons/ClipReplayLogo.png"
    }
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

### `popup.css`

Uzantının popup penceresinin stilini tanımlar. Video döngüsü ayarlama arayüzü bu stil dosyasına dayanır.

```css
:root {
  --primary-color: #e74c3c;
  --primary-hover: #c0392b;
  --bg-color: #1a1a1a;
  --card-bg: #252525;
  --text-color: #f5f5f5;
  --input-bg: #333333;
  --border-radius: 8px;
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  width: 320px;
  min-height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.container {
  width: 100%;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--box-shadow);
}

.header {
  text-align: center;
  margin-bottom: 15px;
  position: relative;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 5px;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.img {
  width: 50px;
}

.logo span {
  color: var(--primary-color);
}

.subtitle {
  font-size: 12px;
  color: #aaa;
  margin-bottom: 15px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 13px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

label svg {
  margin-right: 5px;
}

input {
  background-color: var(--input-bg);
  border: 1px solid #444;
  color: #fff;
  padding: 10px 12px;
  border-radius: var(--border-radius);
  font-size: 14px;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

input::placeholder {
  color: #777;
}

.btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 15px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  margin-top: 5px;
  width: 100%;
}

.btn svg {
  margin-right: 6px;
}

.btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.stop-btn {
  background-color: #444;
  margin-top: 15px;
}

.stop-btn:hover {
  background-color: #555;
}

.status {
  text-align: center;
  font-size: 13px;
  color: #bbb;
  margin-top: 15px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius);
}

.time-info {
  color: var(--primary-color);
  font-weight: 600;
}

.hidden {
  display: none;
}
```

### `popup.html`

Popup arayüzünün HTML yapısını içerir. Kullanıcılar, video döngüsünü burada ayarlayabilirler.

```html
<!DOCTYPE html>
<html lang="tr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ClipReplay</title>
  <link rel="stylesheet" href="popup.css">
</head>

<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">Clip<span>Replay</span></h1>
      <p class="subtitle">Video bölümlerini kolayca döngüye alın</p>
    </div>

    <form id="loopForm">
      <div class="input-group">
        <label for="start">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Başlangıç Zamanı
        </label>
        <input type="text" id="start" placeholder="1:25 formatında girin" required>
      </div>

      <div class="input-group">
        <label for="end">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Bitiş Zamanı
        </label>
        <input type="text" id="end" placeholder="2:45 formatında girin" required>
      </div>

      <button type="submit" class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        Döngüyü Başlat
      </button>
    </form>

    <p id="statusText" class="status">Videonuz için döngü ayarını yapın</p>
    <div class="icon-wrapper">
      <img class="img" src="icons/whiteLogo.png" alt="Loading...">
    </div>


    <button id="stopButton" class="btn stop-btn hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect>
      </svg>
      Döngüyü Durdur
    </button>
  </div>

  <script src="popup.js"></script>
</body>

</html>
```

### `popup.js`

Bu dosya, popup arayüzünde kullanıcının girdiği veriyi işleyip döngüye alma işlemini başlatan JavaScript kodlarını içerir. Ayrıca, kullanıcı döngüyü durdurduğunda yerel depolama verilerini temizler.

```javascript
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

```



