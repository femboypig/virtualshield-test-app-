const { ipcRenderer } = require('electron');
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function() {
        const welcomeText = document.querySelector('.welcome-text');
        const welcomeDesc = document.querySelector('.welcome-desc');
        const leftPanel = document.querySelector('.left-panel');
        const rightPanel = document.querySelector('.right-panel');

        // Устанавливаем таймер, чтобы текст исчез через 2 секунды
        setTimeout(() => {
            welcomeText.classList.add('fade-out');
            welcomeDesc.classList.add('fade-out');
        }, 2000);

        // После того как текст исчезнет, показываем остальную страницу
        setTimeout(() => {
            leftPanel.classList.remove('hidden');
            rightPanel.classList.remove('hidden');
        }, 4000); // Ждем 4 секунды, чтобы весь процесс завершился
    });  
  function generateRandomIP() {
      return `Зашифрованный IP: ${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  }
  function openFile() {
    // Вызываем функцию из главного процесса с помощью IPC
    ipcRenderer.invoke('open-file');
}
  const scanButton = document.getElementById('scan-button');
  const progressBar = document.getElementById('progress-bar');
  const scanLog = document.getElementById('scan-log');
  const progressContainer = document.querySelector('.progress-container');

  const messages = [
      "Инициализация системы...",
      "Проверка файловой системы...",
      "Анализ уязвимостей...",
      "Сканирование реестра...",
      "Поиск вредоносных программ...",
      "Завершение сканирования"
  ];

  scanButton.addEventListener('click', function () {
    if(antivirusToggle.checked) {
      scanButton.disabled = true;
      progressContainer.style.display = 'block';
      scanLog.style.display = 'block';
      progressBar.style.width = '0';
      scanLog.innerHTML = ""; // Очистка логов
      let progress = 0;
      let messageIndex = 0;


      // Функция для имитации обновления прогресса
      const scanInterval = setInterval(function () {
          progress += 20; // Увеличиваем прогресс на 20%
          progressBar.style.width = `${progress}%`;
          scanButton.textContent = `${progress}%`;

          // Добавляем сообщения в лог
          if (messageIndex < messages.length) {
              const logMessage = document.createElement('p');
              logMessage.textContent = messages[messageIndex];
              scanLog.appendChild(logMessage);
              messageIndex++;
          }

          if (progress >= 100) {
              clearInterval(scanInterval);
              scanButton.disabled = false;
              scanButton.textContent = "Сканирование завершено";

              // Ждем 1 секунду (1000 миллисекунд)
              setTimeout(() => {
                  scanButton.textContent = "Запустить сканирование";
                  progressBar.style.display = "none";
                  progressContainer.style.display = "none";
                  scanLog.innerHTML = ""; // Очистка логов
                  openFile();
              }, 3000);
          }
      }, 1000);
} else {
    alert("Антивирус отключён, сканирование невозможно")
}
});

  function generateRandomData() {
      return `${Math.floor(Math.random() * 10 * 1024)} MB`;
  }

  const regionSelect = document.getElementById('region-select');
  const vpnToggle = document.getElementById('vpn-panel').querySelector('.switch input');
  const antivirusToggle = document.getElementById('antivirus-toggle');
  const idMonitoringToggle = document.getElementById('id-monitoring-panel').querySelector('.switch input');
  const personalInfoToggle = document.getElementById('personal-info-toggle');
  const darkWebToggle = document.getElementById('dark-web-toggle');
  const dataUsageText = document.querySelector('.data-usage .usage-main');
  const encryptedIPText = document.getElementById('encrypted-ip');
  const antivirusStatus = document.getElementById('antivirus-status');
  const protectionStatus = document.getElementById('protection-status');
  const protectionMessage = document.getElementById('protection-message');

  function loadSettings() {
      antivirusToggle.checked = localStorage.getItem('antivirusEnabled') === 'true';
      vpnToggle.checked = localStorage.getItem('vpnEnabled') === 'true';
      idMonitoringToggle.checked = localStorage.getItem('idMonitoringEnabled') === 'true';
      personalInfoToggle.checked = localStorage.getItem('personalInfoEnabled') === 'true';
      darkWebToggle.checked = localStorage.getItem('darkWebEnabled') === 'true';
      regionSelect.value = localStorage.getItem('selectedRegion') || 'United States';
      dataUsageText.textContent = localStorage.getItem('dataUsage') || '248 MB';
      encryptedIPText.textContent = localStorage.getItem('encryptedIP') || generateRandomIP();

      updateProtectionStatus();
      updateVPNStatus();
      updateIDMonitoringStatus();
  }

  function saveSettings() {
      localStorage.setItem('antivirusEnabled', antivirusToggle.checked);
      localStorage.setItem('vpnEnabled', vpnToggle.checked);
      localStorage.setItem('idMonitoringEnabled', idMonitoringToggle.checked);
      localStorage.setItem('personalInfoEnabled', personalInfoToggle.checked);
      localStorage.setItem('darkWebEnabled', darkWebToggle.checked);
      localStorage.setItem('selectedRegion', regionSelect.value);
      localStorage.setItem('dataUsage', dataUsageText.textContent);
      localStorage.setItem('encryptedIP', encryptedIPText.textContent);
  }

  function updateProtectionStatus() {
    const circleElement = document.querySelector('.status .circle');
    
    if (antivirusToggle.checked) {
        antivirusStatus.textContent = "Нет необходимости в действиях";
        protectionStatus.textContent = "Full protection";
        protectionMessage.textContent = "Ваше устройство полностью защищено";
        protectionStatus.classList.remove('disabled');
        protectionMessage.classList.remove('disabled');
        
        circleElement.classList.remove('red'); // Убираем красный цвет

        document.getElementById('vpn-panel').classList.remove('disabled');
        document.getElementById('id-monitoring-panel').classList.remove('disabled');
        vpnToggle.disabled = false;
        idMonitoringToggle.disabled = false;
    } else {
        antivirusStatus.textContent = "Антивирус выключен";
        protectionStatus.textContent = "Protection disabled";
        protectionMessage.textContent = "Включите антивирус для полной защиты";
        protectionStatus.classList.add('disabled');
        protectionMessage.classList.add('disabled');
        
        circleElement.classList.add('red'); // Добавляем красный цвет

        vpnToggle.checked = false;
        idMonitoringToggle.checked = false;
        document.getElementById('vpn-panel').classList.add('disabled');
        document.getElementById('id-monitoring-panel').classList.add('disabled');
        vpnToggle.disabled = true;
        idMonitoringToggle.disabled = true;

        dataUsageText.textContent = "Secure VPN is disabled.";
        document.getElementById('id-monitoring-panel').querySelector('p').textContent = "ID Monitoring is disabled.";
    }
    saveSettings();
}


  function updateVPNStatus() {
      if (vpnToggle.checked) {
          dataUsageText.textContent = generateRandomData();
          encryptedIPText.textContent = generateRandomIP();
          regionSelect.disabled = false;
      } else {
          dataUsageText.textContent = "Secure VPN is disabled.";
          encryptedIPText.textContent = "";
          regionSelect.disabled = true;
      }
      saveSettings();
  }

  function updateIDMonitoringStatus() {
      const idMonitoringText = document.getElementById('id-monitoring-panel').querySelector('p');
      if (idMonitoringToggle.checked) {
          idMonitoringText.textContent = "Настройка для активации";
          personalInfoToggle.disabled = false;
          darkWebToggle.disabled = false;
      } else {
          idMonitoringText.textContent = "ID Monitoring is disabled.";
          personalInfoToggle.disabled = true;
          darkWebToggle.disabled = true;
      }
      saveSettings();
  }

  regionSelect.addEventListener('change', function () {
      if (vpnToggle.checked) {
          document.getElementById('selected-region').textContent = regionSelect.value;
          document.getElementById('region-name').textContent = regionSelect.value;
          dataUsageText.textContent = generateRandomData();
          encryptedIPText.textContent = generateRandomIP();
          saveSettings();
      }
  });

  antivirusToggle.addEventListener('change', updateProtectionStatus);

  vpnToggle.addEventListener('change', updateVPNStatus);

  idMonitoringToggle.addEventListener('change', updateIDMonitoringStatus);

  personalInfoToggle.addEventListener('change', saveSettings);
  darkWebToggle.addEventListener('change', saveSettings);

  loadSettings();
});