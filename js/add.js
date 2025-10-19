const url = 'https://api.sheetbest.com/sheets/7bd324c2-1206-479d-82e1-1253bf9f45c6';
const plan_url = 'https://api.sheetbest.com/sheets/e1865a4a-bc95-4df1-876a-388d6b535747';

const getuid = localStorage.getItem('userid');

async function getCurrentId() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const rowLength = data.length + 1;
        
        localStorage.setItem('u98yej876dj87sa6dj8asd6jasd8967', rowLength);
    } catch(err) {
        console.error(err);
    }
}

getCurrentId();

function getWeekNumber(date = new Date()) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

const week = getWeekNumber();
const weekRn = getWeekNumber();
const now = Date.now();

const lol = new Date();
const month = lol.getMonth();
const currentMonth = month + 1;

function addRun() {
    const d = document.createElement('div');
    d.className = 'overlay';
    d.innerHTML = 
    `
    <div class="addRun">
        <div class="add-header">
            <h2>Add New Run</h2>
            <p id="remove">x</p>
        </div>
        <div class="form">
            <div>
                <p>Date</p>
                <input type="datetime-local" id="myDatetime">
            </div>
            <div>
                <p>Type</p>
                <select id="runType" name="runType">
                    <option value="easy">Easy</option>
                    <option value="walk">Walk</option>
                    <option value="moderate">Moderate</option>
                    <option value="tempo">Tempo</option>
                    <option value="interval">Interval</option>
                    <option value="long">Long Run</option>
                    <option value="recovery">Recovery</option>
                </select>
            </div>
        </div>
        <div class="form">
            <div>
                <p>Distance (km)</p>
                <input type="number" id="distance" placeholder="5">
            </div>
            <div>
                <p>Duration (mm:ss)</p>
                <input type="text" id="duration" placeholder="25:30">
            </div>
        </div>
        <div class="form longer">
            <div>
                <p>Location</p>
                <input type="text" id="location" placeholder="Sognsvann">
            </div>
        </div>
        <div class="form longer">
            <div>
                <p>Notes</p>
                <textarea type="text" id="desc" placeholder="How did the run feel? Any observations..."></textarea>
            </div>
        </div>
        <div class="btns">
            <div id="submit">
                <img src="./assets/plus.svg">
                <p>Add Run</p>
            </div>
            <button id="cancel">Cancel</button>
        </div>
    </div>
    `;
    document.body.appendChild(d);
    const input = document.getElementById('myDatetime');
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
    input.value = formatted;

    document.getElementById('cancel').addEventListener('click', () => {
        document.querySelector('.overlay').remove();
    })
    document.getElementById('remove').addEventListener('click', () => {
        document.querySelector('.overlay').remove();
    })
    document.getElementById('submit').addEventListener('click', () => {
        const distance = document.getElementById('distance').value * 1000;
        const desc = document.getElementById('desc').value ? document.getElementById('desc').value : 'No description.';
        const location = document.getElementById('location').value ? document.getElementById('location').value : 'Not defined.';
        const time = document.getElementById('duration').value.trim();
        const [minutes, seconds] = time.split(':').map(Number);
        const select = document.getElementById('runType');
        const selectedValue = select.value;

        const date = document.getElementById('myDatetime').value.trim();
        const timestamp = new Date(date).getTime();

        if(!isNaN(minutes) && !isNaN(seconds)) {
            const totalSeconds = minutes * 60 + seconds;
            newRun(distance, totalSeconds, timestamp, selectedValue, desc, location);
        }
        document.querySelector('.overlay').remove();
    })
}


document.getElementById('add').addEventListener('click', addRun)
document.getElementById('add-mobile').addEventListener('click', addRun)

async function newRun(distance, time, date, diff, desc, location) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                distance: distance,
                time: time,
                date: date,
                week: week,
                desc: desc,
                difficulty: diff,
                location: location,
                month: currentMonth,
                uid: getuid
            })
        });

        if(!res.ok) {
            const d = document.createElement('div');
            d.className = 'error-msg';
            d.innerHTML = 
            `
            <p>Ops! Something went wrong! Please try again or contact me if it doesnt work!</p>
            `;
            document.body.appendChild(d);
            setTimeout(() => {
                document.querySelector('.error-msg').remove();
            }, 2000);
        }
        post(distance, time, date, diff, desc, location);
        update(distance, time, date, diff, desc, location);
    } catch(err) {
        console.error(err);
    } 
}

function post(distance, time, date, diff, desc, location) {
    const avgPace = (time / distance) * 1000 / 60;
    const totalTime = (time / 60);
    const runMin = Math.floor(totalTime);
    const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0')

    // const timestamp = Number(now);
    // const date = new Date(timestamp)
    // const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // const weekday = weekdays[date.getDay()];
    // const month = months[date.getMonth()];
    // const day = date.getDate();
    // const formatted = `${weekday}, ${month} ${day}`
    // console.log(formatted)
    const min = Math.floor(avgPace);
    const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

    const d = document.createElement('div');

    const getId = localStorage.getItem('u98yej876dj87sa6dj8asd6jasd8967')

    d.className = 'card enter';
    d.innerHTML = 
    `
    <div class="card-header">
        <h4>${distance / 1000} km run</h4>
        <img onclick="deleteRun(${getId})" class="delete" src="./assets/delete.svg">
    </div>
    <div class="time">
        <div class="date">
            <img src="./assets/cal-70.svg">
            <p>Just now</p>
        </div>
        <p class="difficulty ${diff}">${diff}</p>
    </div>
    <div class="run-stats">
        <div class="run-time">
            <img src="./assets/clock-70.svg">
            <div>
                <span>${runMin}:${runSec}</span>
                <p>Duration</p>
            </div>
        </div>
        <div class="run-time">
            <div>
                <span>${min}:${sec}/km</span>
                <p>Avg Pace</p>
            </div>
        </div>
    </div>
    <div class="run-stats location">
        <div class="run-time">
            <img src="./assets/location-70.svg">
            <p>${location}</p>
        </div>
    </div>
    <div class="desc">
        <p>${desc}</p>
    </div>
    `;
    document.getElementById('runs').prepend(d);
    setTimeout(() => {
        d.classList.remove('enter')
    }, 50);
}

async function getWeeklyGoalNumber() {
    try {
        const res = await fetch(plan_url);
        const data = await res.json();
        const plan = data.filter(week => week.actualWeek === `${weekRn}`);

        let distance = 0;

        plan.forEach(run => {
            distance += parseFloat(run.distance)
        })

        return distance;
    } catch(err) {
        console.error(err);
    }
}

async function update(distance) {
    try {
        const res = await fetch(url);
        const result = await res.json();
        const data = result.filter(run => run.uid === getuid)

        const weeklyGoal = await getWeeklyGoalNumber();

        console.log(weeklyGoal);

        const currentWeek = data.filter(week => week.week === `${weekRn}`)
        const totalDistanceMeters = currentWeek.reduce((sum, run) => {
            return sum + parseInt(run.distance);
        }, 0);

        const totalRuns = data.length;

        const newTotal = totalDistanceMeters + distance;
        const newTotalPercent = (newTotal / weeklyGoal) * 100;

        console.log(totalDistanceMeters);
        console.log(distance);

        document.getElementById('goal-percent').textContent = newTotalPercent.toFixed(0);
        document.getElementById('bar').style.width = newTotalPercent.toFixed(0) + '%';
        document.getElementById('week-current').textContent = ((totalDistanceMeters + distance) / 1000).toFixed(2);
        document.getElementById('total').textContent = ((totalDistanceMeters + distance) / 1000).toFixed(2);
        document.getElementById('thisMonth').textContent = ((totalDistanceMeters + distance) / 1000).toFixed(2);
        document.getElementById('totalRuns').textContent = totalRuns + 1;
        document.getElementById('recentLogged').textContent = totalRuns + 1;
        document.getElementById('weeklyRuns').textContent = totalRuns + 1;
    } catch(err) {
        console.error(err);
    }
}