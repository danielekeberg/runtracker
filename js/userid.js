const uid = localStorage.getItem('userid');

document.getElementById('username').textContent = uid;

if(!uid) {
    const d = document.createElement('div');
    d.className = 'overlay';
    d.innerHTML = 
    `
    <div class="addRun">
        <h3 style="text-align: center;">You need a username to continue!</h3>
        <div class="userid-forms">
            <input type="text" placeholder="Username" id="uidInput">
            <button id="continueN">Continue</button>
        </div>
    </div>
    `;

    setTimeout(() => {
        document.getElementById('uidInput').addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                localStorage.setItem('userid', document.getElementById('uidInput').value);
                window.location.reload();
            }
        })
    });
    setTimeout(() => {
        document.getElementById('continueN').addEventListener('click', (e) => {
            localStorage.setItem('userid', document.getElementById('uidInput').value);
            window.location.reload();
        })
    });

    document.body.appendChild(d);
}