const uid = localStorage.getItem('userid');

function error() {
    const d = document.createElement('div');
    d.className = 'error';
    d.innerHTML = 
    `
    <p><strong>UID</strong>: ${uid ? uid : 'Refresh the page'}</p>
    `;
    document.getElementById('nav').appendChild(d);
}

document.getElementById('error').addEventListener('mouseover', error);
document.getElementById('error').addEventListener('mouseleave', () => {
    document.querySelector('.error').remove();
});

