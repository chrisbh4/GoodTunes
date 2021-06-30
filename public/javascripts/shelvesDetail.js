
window.addEventListener("DOMContentLoaded", (event) => {
    const createShelfForm = document.querySelector('.createShelfForm')
    const createShelfLabel = document.querySelector('.shelfNameLabel')
    const createShelfInput = document.querySelector('.shelfNameInput')
    const createShelfButton = document.querySelector('.shelfNameButton')
    const shelvesList = document.querySelector('.shelvesList')

    createShelfForm.addEventListener('submit', (event) => {
        event.preventDefault()
        async function addShelf() {
            try {
                const shelfName = createShelfInput.value
                const userId = event.target.id
                let res = await fetch(`/shelves/users/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: shelfName, userId })
                })
                let json = await res.json()
                console.log(json.shelves)
            } catch (err) {
                console.log(err)
            }
        }
        addShelf()
    })






})
