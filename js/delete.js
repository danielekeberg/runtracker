const url = 'https://api.sheetbest.com/sheets/6ba08a51-0dc0-47b3-b46c-76c9c65fe949';

function deleteRun(id) {
    const getId = id - 1;
    const d = document.createElement('div');
    d.className = 'overlay';
    d.innerHTML = 
    `
    <div class="addRun">
        <p style="text-align: center; margin-bottom: 50px;">Are you sure you want to <strong>permanently delete</strong> this run?</p>
        <div class="btns">
            <button id="yes">Delete</button>
            <button id="dont">Cancel</button>
        </div>
    </div>
    `;
    document.body.appendChild(d);
    document.getElementById('dont').addEventListener('click', () => {
        document.querySelector('.overlay').remove();
    });
    document.getElementById('yes').addEventListener('click', () => {
        deleteConfirmed(getId);
        d.innerHTML = 
        `
        <div class="addRun addLoader">
            <h3 style="text-align: center;">Deleting</h3>
            <span class="loader"></span>
        </div>
        `;
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    })
};

async function deleteConfirmed(id) {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
        if(!res.ok) {
            console.error('ERROR DELETING')
        }

    } catch(err) {
        console.error(err);
    }

}
