let startTime, updatedTime, difference, tInterval;
    let running = false;

    const timeDisplay = document.getElementById('time');
    const lapsContainer = document.getElementById('laps');

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            tInterval = setInterval(updateTime, 100);
            running = true;
        }
    }

    function updateTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        timeDisplay.innerHTML = (hours < 10 ? "0" : "") + hours + ":" +
                                (minutes < 10 ? "0" : "") + minutes + ":" +
                                (seconds < 10 ? "0" : "") + seconds;
    }

    function pauseTimer() {
        clearInterval(tInterval);
        running = false;
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        difference = 0;
        timeDisplay.innerHTML = "00:00:00";
        lapsContainer.innerHTML = "";
    }

    function addLap() {
        if (running) {
            const lapTime = timeDisplay.innerHTML;
            const lapElement = document.createElement('div');
            lapElement.classList.add('lap');
            lapElement.innerText = `Lap: ${lapTime}`;
            lapsContainer.appendChild(lapElement);
        }
    }

    document.getElementById('start').onclick = startTimer;
    document.getElementById('pause').onclick = pauseTimer;
    document.getElementById('reset').onclick = resetTimer;
    document.getElementById('lap').onclick = addLap;
