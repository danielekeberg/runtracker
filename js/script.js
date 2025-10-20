const url = 'https://api.sheetbest.com/sheets/6ba08a51-0dc0-47b3-b46c-76c9c65fe949';
const plan_url = 'https://api.sheetbest.com/sheets/b99fdba9-74fb-4cdc-a9b0-4a04bfc98c08';
const uid = localStorage.getItem('userid');

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

const t = new Date();
const m = t.getMonth();

async function totalDistance() {
    try {
        const res = await fetch(url);
        const results = await res.json();
        const runs = results.filter(run => run.difficulty !== 'walk');
        const dataRuns = runs.filter(run => run.uid === uid );
        const data = results.filter(run => run.uid === uid);
        const totalDistanceMeters = data.reduce((sum, run) => {
            return sum + parseInt(run.distance);
        }, 0);

        const totalDistanceKm = (totalDistanceMeters / 1000).toFixed(2);
        const totalRuns = data.length;

        let totalTime = 0;
        let totalDistance = 0;
    
        dataRuns.forEach(run => {
            totalTime += parseFloat(run.time);
            totalDistance += parseFloat(run.distance);
        });

        const avgPace = (totalTime / totalDistance) * 1000 / 60;
        let min = Math.floor(avgPace);
        let sec = Math.round((avgPace - min) * 60);

        if(sec === 60) {
            min += 1;
            sec = 0;
        }

        sec = String(sec).padStart(2, '0');

        document.getElementById('total').textContent = totalDistanceKm;
        document.getElementById('totalRuns').textContent = totalRuns;
        document.getElementById('recentLogged').textContent = totalRuns;
        document.getElementById('avgPace').textContent = `${min}:${sec}`;
        
    } catch(err) {
        console.error(err);
    }
}

async function fetchWeekStats() {
    try {
        const res = await fetch(url);
        const results = await res.json();
        const data = results.filter(run => run.uid === uid);
        const currentWeek = data.filter(week => week.week === `${weekRn}`)

        const totalDistanceMeters = currentWeek.reduce((sum, run) => {
            return sum + parseInt(run.distance);
        }, 0);

        const totalDistanceKm = (totalDistanceMeters / 1000).toFixed(2);
        const totalRuns = currentWeek.length;

        let totalTime = 0;
        let totalDistance = 0;
    
        currentWeek.forEach(run => {
            totalTime += parseFloat(run.time) || 0;
            totalDistance += parseFloat(run.distance) || 0;
        });

        let min = 0;
        let sec = '00';

        if(totalDistance > 0 && totalTime > 0) {
            const avgPace = (totalTime / totalDistance) * 1000 / 60;
            min = Math.floor(avgPace);
            sec = Math.round((avgPace - min) * 60);

            if(sec === 60) {
                min += 1;
                sec = 0;
            }

            sec = String(sec).padStart(2, '0');
        }


        const weekGoal = await getWeeklyGoal();
        const percentage = ((totalDistanceMeters / weekGoal) * 100).toFixed(2);

        document.getElementById('goal-percent').textContent = Number(percentage).toFixed(0);
        document.getElementById('bar').style.width = percentage + '%';
        document.getElementById('week-current').textContent = totalDistanceKm;
        document.getElementById('weeklyRuns').textContent = totalRuns;
        document.getElementById('weeklyAvg').textContent = `${min ? min : '0'}:${sec}/km`;
    } catch(err) {
        console.error(err);
    }
}

async function getWeeklyGoal() {
    try {
        const res = await fetch(plan_url);
        const data = await res.json();
        const asdasd = data.filter(test => test.actualWeek === String(weekRn));

        let weekDistance = 0;

        asdasd.forEach(runs => {
            weekDistance += parseFloat(runs.distance);
        })

        return weekDistance ? weekDistance : 10000;
    } catch(err) {
        console.error(err);
    }
}

async function weeklyProgress() {
    try {
        const res = await fetch(url);
        const results = await res.json();
        const data = results.filter(run => run.uid === uid);

        const current = data.filter(week => week.week === `${weekRn}`);
        const last = data.filter(week => week.week === `${weekRn - 1}`);

        let currentDistance = 0;
        let currentRuns = current.length;
        let currentTime = 0;

        let lastDistance = 0;
        let lastRuns = last.length;
        let lastTime = 0;

        current.forEach(run => {
            currentDistance += parseFloat(run.distance);
            currentTime += parseFloat(run.time);
        })

        last.forEach(run => {
            lastDistance += parseFloat(run.distance);
            lastTime += parseFloat(run.time);
        })

        const distancePercent = lastDistance === 0
        ? (currentDistance === 0 ? '0' : '100')
        : (((currentDistance - lastDistance) / lastDistance) * 100).toFixed(0);

        const runsPercent = lastRuns === 0
        ? (currentRuns === 0 ? '0' : '100')
        : (((currentRuns - lastRuns) / lastRuns) * 100).toFixed(0);

        if(currentDistance >= lastDistance) {
            document.getElementById('distanceProgress').innerHTML = 
            `
            <p>&#x25B2; ${distancePercent}% from last week</p>
            `;
        } else if (currentDistance < lastDistance) {
            document.getElementById('distanceProgress').innerHTML = 
            `
            <p class="down">&#x25BC; ${distancePercent}% from last week</p>
            `;
        }

        if(currentRuns >= lastRuns) {
            document.getElementById('runsProgress').innerHTML = 
            `
            <p>&#x25B2; ${runsPercent}% from last week</p>
            `;
        } else if (currentRuns < lastRuns) {
            document.getElementById('runsProgress').innerHTML = 
            `
            <p class="down">&#x25BC; ${runsPercent}% from last week</p>
            `;
        }
    } catch(err) {
        console.error(err);
    }
}

async function getRuns() {
    try {
        const res = await fetch(url);
        const results = await res.json();
        const data = results.filter(run => run.uid === uid);
        data.sort((a, b) => b.date - a.date);
        data.forEach(run => {
            const d = document.createElement('div');
            const avgPace = (run.time / run.distance) * 1000 / 60;
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

            let walked = false;

            if(run.difficulty === 'walk') {
                walked = true;
            }

            const min = Math.floor(avgPace);
            const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');
            d.className = 'card';
            d.innerHTML = 
            `
            <div class="card-header">
                <h4>${(run.distance / 1000).toFixed(2)} km ${walked ? 'walk' : 'run'}</h4>
                <img onclick="deleteRun(${run.id})" class="delete" src="./assets/delete.svg">
            </div>
            <div class="time">
                <div class="date">
                    <img src="./assets/cal-70.svg">
                    <p>${formatted}</p>
                </div>
                <p class="difficulty ${run.difficulty}">${run.difficulty}</p>
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
                    <p>${run.location}</p>
                </div>
            </div>
            <div class="desc">
                <p>${run.desc}</p>
            </div>
            `;

            document.getElementById('runs').appendChild(d);
        })
    } catch(err) {
        console.error(err);
    }
}

async function lastMonth() {
    try {
        const res = await fetch(url);
        const results = await res.json();
        const data = results.filter(run => run.uid === uid);
        const lastM = data.filter(month => month.month === `${m}`)
        const thisM = data.filter(month => month.month === `${m + 1}`)
        
        let totalDistance = 0;
        let totalDistanceThis = 0;

        lastM.forEach(run => {
            totalDistance += parseFloat(run.distance);
        })

        thisM.forEach(run => {
            totalDistanceThis += parseFloat(run.distance);
        })

        const thisMonthDistance = (totalDistanceThis / 1000).toFixed(2);
        const lastMonthDistance = (totalDistance / 1000).toFixed(2);
        document.getElementById('lastMonth').textContent = lastMonthDistance;
        document.getElementById('thisMonth').textContent = thisMonthDistance;
    } catch(err) {
        console.error(err);
    }
}

async function bestRuns() {
    try {
        const res = await fetch(url);
        const results = await res.json();
        const runsResults = results.filter(run => run.difficulty !== 'walk');
        const data = runsResults.filter(run => run.uid === uid);

        const longestRun = data.sort((a, b) => b.distance - a.distance)[0];
        const longestDistance = Number((longestRun.distance / 1000))
        
        const timestamp = Number(longestRun.date);
        const date = new Date(timestamp);

        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const weekday = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const formatted = `${weekday}, ${month} ${day}`;

        const avgPace = (longestRun.time / longestRun.distance) * 1000 / 60;
        const totalTime = (longestRun.time / 60);
        const runMin = Math.floor(totalTime);
        const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

        const min = Math.floor(avgPace);
        const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

        document.getElementById('longestRunDistance').textContent = `${(longestDistance).toFixed(2)} km run`;
        document.getElementById('longestRunDate').textContent = formatted;
        document.getElementById('longestRunTime').textContent = `${runMin}:${runSec}`;
        document.getElementById('longestRunAvg').textContent = `${min}:${sec}/km`;
        document.getElementById('longestLocation').textContent = `${longestRun.location}`;
        document.getElementById('longestDesc').textContent = `${longestRun.desc}`;

        const sortedPace = data.slice().sort((a, b) => {
            const paceA = (a.time / 60) / a.distance;
            const paceB = (b.time / 60) / b.distance;
            return paceA - paceB;
        });

        const fastestRun = sortedPace[0];
        const fastestDistance = Number((fastestRun.distance / 1000))

        const timestampFast = Number(fastestRun.date);
        const dateFast = new Date(timestampFast);

        const weekdayFast = weekdays[dateFast.getDay()];
        const monthFast = months[dateFast.getMonth()];
        const dayFast = dateFast.getDate();
        const formattedFast = `${weekdayFast}, ${monthFast} ${dayFast}`;

        const avgPaceFast = (fastestRun.time / fastestRun.distance) * 1000 / 60;
        const totalTimeFast = (fastestRun.time / 60);
        const runMinFast = Math.floor(totalTimeFast);
        const runSecFast = String(Math.round((totalTimeFast - runMinFast) * 60)).padStart(2, '0');

        const minFast = Math.floor(avgPaceFast);
        const secFast = String(Math.round((avgPaceFast - minFast) * 60)).padStart(2, '0');

        document.getElementById('fastestRunDistance').textContent = `${(fastestDistance).toFixed(2)} km run`;
        document.getElementById('fastestRunDate').textContent = formattedFast;
        document.getElementById('fastestRunTime').textContent = `${runMinFast}:${runSecFast}`;
        document.getElementById('fastestRunAvg').textContent = `${minFast}:${secFast}/km`;
        document.getElementById('fastestLocation').textContent = `${fastestRun.location}`;
        document.getElementById('fastestDesc').textContent = `${fastestRun.desc}`;
    } catch(err) {
        console.error(err);
    }
}

async function weeklyGoal() {
    try {
        const res = await fetch(plan_url);
        const data = await res.json();
        const weekly = data.filter(week => week.actualWeek === String(weekRn));
        let weeklyGoal = 0;

        weekly.forEach(run => {
            weeklyGoal += parseFloat(run.distance);
        })

        const finalGoal = (weeklyGoal / 1000);

        document.getElementById('goal').textContent = finalGoal ? finalGoal : 10;
    } catch(err) {
        console.error(err);
    }
}

async function best3k() {
    try {
        const res = await fetch(url);
        const results = await res.json();
        const runsResults = results.filter(run => run.difficulty !== 'walk');
        const data = runsResults.filter(run => run.uid === uid);
        const test = data.filter(run => run.distance >= 3000 && run.distance < 3990);

        if(test.length >= 1) {
            document.querySelector('.threeK').style.display = 'block';
        }

        const sortedPace = test.slice().sort((a, b) => {
            const paceA = (a.time / 60) / a.distance;
            const paceB = (b.time / 60) / b.distance;
            return paceA - paceB;
        });

        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const fastestRun = sortedPace[0];
        const fastestDistance = Number((fastestRun.distance / 1000))

        const timestampFast = Number(fastestRun.date);
        const dateFast = new Date(timestampFast);

        const weekdayFast = weekdays[dateFast.getDay()];
        const monthFast = months[dateFast.getMonth()];
        const dayFast = dateFast.getDate();
        const formattedFast = `${weekdayFast}, ${monthFast} ${dayFast}`;

        const avgPaceFast = (fastestRun.time / fastestRun.distance) * 1000 / 60;
        const totalTimeFast = (fastestRun.time / 60);
        const runMinFast = Math.floor(totalTimeFast);
        const runSecFast = String(Math.round((totalTimeFast - runMinFast) * 60)).padStart(2, '0');

        const minFast = Math.floor(avgPaceFast);
        const secFast = String(Math.round((avgPaceFast - minFast) * 60)).padStart(2, '0');

        document.getElementById('fast3kDistance').textContent = `${(fastestDistance).toFixed(2)} km run`;
        document.getElementById('fast3kDate').textContent = formattedFast;
        document.getElementById('fast3k').textContent = `${runMinFast}:${runSecFast}`;
        document.getElementById('fast3kAvg').textContent = `${minFast}:${secFast}/km`;
        document.getElementById('fast3kLocation').textContent = `${fastestRun.location}`;
        document.getElementById('fast3kDesc').textContent = `${fastestRun.desc}`;
    } catch(err) {
        console.error(err);
    }
}

async function best5k() {
    try {
        const res = await fetch(url);
        const results = await res.json();
        const runsResults = results.filter(run => run.difficulty !== 'walk');
        const data = runsResults.filter(run => run.uid === uid);
        const test = data.filter(run => run.distance >= 5000 && run.distance < 5990);

        if(test.length >= 1) {
            document.querySelector('.fiveK').style.display = 'block';
        }

        const sortedPace = test.slice().sort((a, b) => {
            const paceA = (a.time / 60) / a.distance;
            const paceB = (b.time / 60) / b.distance;
            return paceA - paceB;
        });

        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const fastestRun = sortedPace[0];
        const fastestDistance = Number((fastestRun.distance / 1000))

        const timestampFast = Number(fastestRun.date);
        const dateFast = new Date(timestampFast);

        const weekdayFast = weekdays[dateFast.getDay()];
        const monthFast = months[dateFast.getMonth()];
        const dayFast = dateFast.getDate();
        const formattedFast = `${weekdayFast}, ${monthFast} ${dayFast}`;

        const avgPaceFast = (fastestRun.time / fastestRun.distance) * 1000 / 60;
        const totalTimeFast = (fastestRun.time / 60);
        const runMinFast = Math.floor(totalTimeFast);
        const runSecFast = String(Math.round((totalTimeFast - runMinFast) * 60)).padStart(2, '0');

        const minFast = Math.floor(avgPaceFast);
        const secFast = String(Math.round((avgPaceFast - minFast) * 60)).padStart(2, '0');

        document.getElementById('fast5kDistance').textContent = `${(fastestDistance).toFixed(2)} km run`;
        document.getElementById('fast5kDate').textContent = formattedFast;
        document.getElementById('fast5k').textContent = `${runMinFast}:${runSecFast}`;
        document.getElementById('fast5kAvg').textContent = `${minFast}:${secFast}/km`;
        document.getElementById('fast5kLocation').textContent = `${fastestRun.location}`;
        document.getElementById('fast5kDesc').textContent = `${fastestRun.desc}`;
    } catch(err) {
        console.error(err);
    }
}

function setLocal() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `${day}${month}${year}`;
}

async function reminder() {
    const dateNow = setLocal();
    const checkLocal = localStorage.getItem('as9d7yma90sd76mq287d6ma897d6h896798a6sdj98a67asd');
    if(checkLocal === dateNow) {
        return;
    }
    try {
        const res = await fetch(plan_url);
        const data = await res.json();

        const today = new Date();
        const todayY = today.getFullYear();
        const todayM = today.getMonth();
        const todayD = today.getDate();

        const todayRuns = data.filter(run => {
            const runDate = new Date(Number(run.date));
            return (
                runDate.getFullYear() === todayY &&
                runDate.getMonth() === todayM &&
                runDate.getDate() === todayD
            )
        });

        const runs = todayRuns[0];

        const avgPace = (runs.time / runs.distance) * 1000 / 60;
        const totalTime = (runs.time / 60);
        const runMin = Math.floor(totalTime);
        const runSec = String(Math.round((totalTime - runMin) * 60)).padStart(2, '0');

        const min = Math.floor(avgPace);
        const sec = String(Math.round((avgPace - min) * 60)).padStart(2, '0');

        if(todayRuns.length > 0) {
            const d = document.createElement('div');
            d.className = 'reminder';
            d.innerHTML = 
            `
            <div class="reminder-header">
                <div class="reminder-header-text">
                    <h3>Today's Run Reminder</h3>
                    <p class="${runs.session}">${runs.session}</p>
                </div>
                <div class="cancel">
                    <p id="remove-reminder">X</p>
                </div>
            </div>
            <div class="reminder-stats">
                <div class="reminder-stat">
                    <img style="transform: scaleX(-1)" src="./assets/path-81.svg">
                    <p>${runs.distance / 1000} km</p>
                </div>
                <div class="reminder-stat">
                    <img src="./assets/clock-81.svg">
                    <p>${runMin}:${runSec}</p>
                </div>
                <div class="reminder-stat">
                    <img src="./assets/growth-81.svg">
                    <p>${min}:${sec}/km</p>
                </div>
            </div>
            <div class="reminder-loc">
                <div class="reminder-stat">
                    <img src="./assets/location-81.svg">
                    <p style="font-weight: 400;">${runs.location}</p>
                </div>
                <p>${runs.notes}</p>
            </div>
            `;
            document.querySelector('.home').prepend(d);
            document.getElementById('remove-reminder').addEventListener('click', () => {
                localStorage.setItem('as9d7yma90sd76mq287d6ma897d6h896798a6sdj98a67asd', dateNow);
                document.querySelector('.reminder').style.opacity = 0;
                setTimeout(() => {
                    document.querySelector('.reminder').remove();
                }, 300)
            });
        }

        
    } catch(err) {
        console.error(err);
    }
}

// document.body.addEventListener('keydown', (e) => {
//     if(e.key === 'Enter') {
//         bestRuns();
//         best3k();
//         best5k();
//     }
// })

bestRuns();
lastMonth();
fetchWeekStats();
totalDistance();
getRuns();
weeklyProgress();
weeklyGoal();
best3k();
best5k();

reminder();
