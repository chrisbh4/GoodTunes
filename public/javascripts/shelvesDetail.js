
window.addEventListener("DOMContentLoaded", (event) => {
    const createShelfForm = document.querySelector('.createShelfForm')
    const createShelfLabel = document.querySelector('.shelfNameLabel')
    const createShelfInput = document.querySelector('.shelfNameInput')
    const createShelfButton = document.querySelector('.shelfNameButton')

    createShelfForm.addEventListener('submit', (event) => {
        event.preventDefault()
        async function addShelf() {
            try {
                const shelvesList = document.querySelector('.shelvesList')
                const shelfName = createShelfInput.value
                const userId = event.target.id
                console.log(userId)
                let res = await fetch(`/shelves/users/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: shelfName, userId })
                })
                let json = await res.json()
                console.log(json.shelves)
                const aTag = document.createElement('a')
                aTag.innerHTML = json.shelves[json.shelves.length - 1].name
                aTag.setAttribute('href', `/shelves/${json.shelves[json.shelves.length - 1].id}`)
                const li = document.createElement('li')
                // li.innerHTML = aTag
                li.appendChild(aTag)
                shelvesList.appendChild(li)
            } catch (err) {
                console.log(err)
            }
        }
        addShelf()
    })






})
