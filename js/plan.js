const url = 'https://api.sheetbest.com/sheets/b99fdba9-74fb-4cdc-a9b0-4a04bfc98c08';

async function getStats() {
    try {
        const res = await fetch(url);
        const data = await res.json();

        let totalTime = 0;
        let totalDistance = 0;
    
        data.forEach(run => {
            totalTime += parseFloat(run.time);
            totalDistance += parseFloat(run.distance);
        });

        document.getElementById('totalDistance').textContent = `${totalDistance / 1000} km`;
        document.getElementById('totalDist').textContent = `${totalDistance / 1000} km total`;
        document.getElementById('avgWeeklyDistance').textContent = `${((totalDistance / 1000) / 8).toFixed(2)} km`;
    } catch(err) {
        console.error(err);
    }
}

async function getWeeks() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const weekOne = data.filter(run => run.week === "1")
        const weekTwo = data.filter(run => run.week === "2")
        const weekThree = data.filter(run => run.week === "3")
        const weekFour = data.filter(run => run.week === "4")
        const weekFive = data.filter(run => run.week === "5")
        const weekSix = data.filter(run => run.week === "6")
        const weekSeven = data.filter(run => run.week === "7")
        const weekEight = data.filter(run => run.week === "8")
        weekOne.forEach(run => {
            const d = document.createElement('div');

            const avgPace = ((run.time / run.distance) * 1000 / 60).toFixed(2);
            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

            const totalTime = (run.time / 60);
            const runMin = Math.floor(totalTime);
            const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

            const timestamp = Number(run.date);
            const date = new Date(timestamp);

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const formatted = `${weekday}, ${month} ${day}`;

            d.className = 'card';
            d.innerHTML = 
            `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="../assets/pulse-blue.svg">
                <h4>${run.distance / 1000} km run</h4>
            </div>
            <div class="time">
                <div class="date">
                    <img src="../assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.session}">${run.session}</p>
            </div>
            <div class="run-stats">
                <div class="run-time">
                    <img src="../assets/clock-70.svg">
                    <div>
                        <span>${runMin}:${runSec}</span>
                        <p>Duration</p>
                    </div>
                </div>
                <div class="run-time">
                    <div class="">
                        <span>${min}:${sec}/km</span>
                        <p>Target Pace</p>
                    </div>
                </div>
            </div>
            <div class="run-stats location">
                <div class="run-time">
                    <img src="../assets/location-70.svg">
                    <p>${run.location}</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.notes ? run.notes : 'No desc...'}</p>
            </div>
            `;
            document.getElementById('week1').appendChild(d);
        })
        weekTwo.forEach(run => {
            const d = document.createElement('div');

            const avgPace = ((run.time / run.distance) * 1000 / 60).toFixed(2);
            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

            const totalTime = (run.time / 60);
            const runMin = Math.floor(totalTime);
            const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

            const timestamp = Number(run.date);
            const date = new Date(timestamp);

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const formatted = `${weekday}, ${month} ${day}`;

            d.className = 'card';
            d.innerHTML = 
            `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="../assets/pulse-blue.svg">
                <h4>${run.distance / 1000} km run</h4>
            </div>
            <div class="time">
                <div class="date">
                    <img src="../assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.session}">${run.session}</p>
            </div>
            <div class="run-stats">
                <div class="run-time">
                    <img src="../assets/clock-70.svg">
                    <div>
                        <span>${runMin}:${runSec}</span>
                        <p>Duration</p>
                    </div>
                </div>
                <div class="run-time">
                    <div class="">
                        <span>${min}:${sec}/km</span>
                        <p>Target Pace</p>
                    </div>
                </div>
            </div>
            <div class="run-stats location">
                <div class="run-time">
                    <img src="../assets/location-70.svg">
                    <p>Sognsvann</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.notes ? run.notes : 'No desc...'}</p>
            </div>
            `;
            document.getElementById('week2').appendChild(d);
        })
        weekThree.forEach(run => {
            const d = document.createElement('div');

            const avgPace = ((run.time / run.distance) * 1000 / 60).toFixed(2);
            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

            const totalTime = (run.time / 60);
            const runMin = Math.floor(totalTime);
            const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

            const timestamp = Number(run.date);
            const date = new Date(timestamp);

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const formatted = `${weekday}, ${month} ${day}`;

            d.className = 'card';
            d.innerHTML = 
            `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="../assets/pulse-blue.svg">
                <h4>${run.distance / 1000} km run</h4>
            </div>
            <div class="time">
                <div class="date">
                    <img src="../assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.session}">${run.session}</p>
            </div>
            <div class="run-stats">
                <div class="run-time">
                    <img src="../assets/clock-70.svg">
                    <div>
                        <span>${runMin}:${runSec}</span>
                        <p>Duration</p>
                    </div>
                </div>
                <div class="run-time">
                    <div class="">
                        <span>${min}:${sec}/km</span>
                        <p>Target Pace</p>
                    </div>
                </div>
            </div>
            <div class="run-stats location">
                <div class="run-time">
                    <img src="../assets/location-70.svg">
                    <p>Sognsvann</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.notes ? run.notes : 'No desc...'}</p>
            </div>
            `;
            document.getElementById('week3').appendChild(d);
        })
        weekFour.forEach(run => {
            const d = document.createElement('div');

            const avgPace = ((run.time / run.distance) * 1000 / 60).toFixed(2);
            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

            const totalTime = (run.time / 60);
            const runMin = Math.floor(totalTime);
            const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

            const timestamp = Number(run.date);
            const date = new Date(timestamp);

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const formatted = `${weekday}, ${month} ${day}`;

            d.className = 'card';
            d.innerHTML = 
            `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="../assets/pulse-blue.svg">
                <h4>${run.distance / 1000} km run</h4>
            </div>
            <div class="time">
                <div class="date">
                    <img src="../assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.session}">${run.session}</p>
            </div>
            <div class="run-stats">
                <div class="run-time">
                    <img src="../assets/clock-70.svg">
                    <div>
                        <span>${runMin}:${runSec}</span>
                        <p>Duration</p>
                    </div>
                </div>
                <div class="run-time">
                    <div class="">
                        <span>${min}:${sec}/km</span>
                        <p>Target Pace</p>
                    </div>
                </div>
            </div>
            <div class="run-stats location">
                <div class="run-time">
                    <img src="../assets/location-70.svg">
                    <p>Sognsvann</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.notes ? run.notes : 'No desc...'}</p>
            </div>
            `;
            document.getElementById('week4').appendChild(d);
        })
        weekFive.forEach(run => {
            const d = document.createElement('div');

            const avgPace = ((run.time / run.distance) * 1000 / 60).toFixed(2);
            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

            const totalTime = (run.time / 60);
            const runMin = Math.floor(totalTime);
            const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

            const timestamp = Number(run.date);
            const date = new Date(timestamp);

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const formatted = `${weekday}, ${month} ${day}`;

            d.className = 'card';
            d.innerHTML = 
            `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="../assets/pulse-blue.svg">
                <h4>${run.distance / 1000} km run</h4>
            </div>
            <div class="time">
                <div class="date">
                    <img src="../assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.session}">${run.session}</p>
            </div>
            <div class="run-stats">
                <div class="run-time">
                    <img src="../assets/clock-70.svg">
                    <div>
                        <span>${runMin}:${runSec}</span>
                        <p>Duration</p>
                    </div>
                </div>
                <div class="run-time">
                    <div class="">
                        <span>${min}:${sec}/km</span>
                        <p>Target Pace</p>
                    </div>
                </div>
            </div>
            <div class="run-stats location">
                <div class="run-time">
                    <img src="../assets/location-70.svg">
                    <p>Sognsvann</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.notes ? run.notes : 'No desc...'}</p>
            </div>
            `;
            document.getElementById('week5').appendChild(d);
        })
        weekSix.forEach(run => {
            const d = document.createElement('div');

            const avgPace = ((run.time / run.distance) * 1000 / 60).toFixed(2);
            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

            const totalTime = (run.time / 60);
            const runMin = Math.floor(totalTime);
            const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

            const timestamp = Number(run.date);
            const date = new Date(timestamp);

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const formatted = `${weekday}, ${month} ${day}`;

            d.className = 'card';
            d.innerHTML = 
            `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="../assets/pulse-blue.svg">
                <h4>${run.distance / 1000} km run</h4>
            </div>
            <div class="time">
                <div class="date">
                    <img src="../assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.session}">${run.session}</p>
            </div>
            <div class="run-stats">
                <div class="run-time">
                    <img src="../assets/clock-70.svg">
                    <div>
                        <span>${runMin}:${runSec}</span>
                        <p>Duration</p>
                    </div>
                </div>
                <div class="run-time">
                    <div class="">
                        <span>${min}:${sec}/km</span>
                        <p>Target Pace</p>
                    </div>
                </div>
            </div>
            <div class="run-stats location">
                <div class="run-time">
                    <img src="../assets/location-70.svg">
                    <p>Sognsvann</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.notes ? run.notes : 'No desc...'}</p>
            </div>
            `;
            document.getElementById('week6').appendChild(d);
        })
        weekSeven.forEach(run => {
            const d = document.createElement('div');

            const avgPace = ((run.time / run.distance) * 1000 / 60).toFixed(2);
            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

            const totalTime = (run.time / 60);
            const runMin = Math.floor(totalTime);
            const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

            const timestamp = Number(run.date);
            const date = new Date(timestamp);

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const formatted = `${weekday}, ${month} ${day}`;

            d.className = 'card';
            d.innerHTML = 
            `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="../assets/pulse-blue.svg">
                <h4>${run.distance / 1000} km run</h4>
            </div>
            <div class="time">
                <div class="date">
                    <img src="../assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.session}">${run.session}</p>
            </div>
            <div class="run-stats">
                <div class="run-time">
                    <img src="../assets/clock-70.svg">
                    <div>
                        <span>${runMin}:${runSec}</span>
                        <p>Duration</p>
                    </div>
                </div>
                <div class="run-time">
                    <div class="">
                        <span>${min}:${sec}/km</span>
                        <p>Target Pace</p>
                    </div>
                </div>
            </div>
            <div class="run-stats location">
                <div class="run-time">
                    <img src="../assets/location-70.svg">
                    <p>Sognsvann</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.notes ? run.notes : 'No desc...'}</p>
            </div>
            `;
            document.getElementById('week7').appendChild(d);
        })
        weekEight.forEach(run => {
            const d = document.createElement('div');

            const avgPace = ((run.time / run.distance) * 1000 / 60).toFixed(2);
            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

            const totalTime = (run.time / 60);
            const runMin = Math.floor(totalTime);
            const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

            const timestamp = Number(run.date);
            const date = new Date(timestamp);

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const formatted = `${weekday}, ${month} ${day}`;

            d.className = 'card';
            d.innerHTML = 
            `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="../assets/pulse-blue.svg">
                <h4>${run.distance / 1000} km run</h4>
            </div>
            <div class="time">
                <div class="date">
                    <img src="../assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.session}">${run.session}</p>
            </div>
            <div class="run-stats">
                <div class="run-time">
                    <img src="../assets/clock-70.svg">
                    <div>
                        <span>${runMin}:${runSec}</span>
                        <p>Duration</p>
                    </div>
                </div>
                <div class="run-time">
                    <div class="">
                        <span>${min}:${sec}/km</span>
                        <p>Target Pace</p>
                    </div>
                </div>
            </div>
            <div class="run-stats location">
                <div class="run-time">
                    <img src="../assets/location-70.svg">
                    <p>Sognsvann</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.notes ? run.notes : 'No desc...'}</p>
            </div>
            `;
            document.getElementById('week8').appendChild(d);
        })
    }catch(err) {
        console.error(err);
    }
}

getWeeks();

getStats();
