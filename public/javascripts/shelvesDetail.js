
window.addEventListener("DOMContentLoaded", (event) => {
    const createShelfForm = document.querySelector('.createShelfForm')
    const createShelfLabel = document.querySelector('.shelfNameLabel')
    const createShelfInput = document.querySelector('.shelfNameInput')
    const createShelfButton = document.querySelector('.shelfNameButton')
    const deleteShelfButtons = document.querySelectorAll('.deleteShelfButton')

    createShelfForm.addEventListener('submit', (event) => {
        event.preventDefault()
        async function addShelf() {
            try {
                const shelvesList = document.querySelector('.shelvesList')
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
                const div = document.createElement('div')
                div.setAttribute('class', `shelf-${json.shelves[json.shelves.length - 1].id}`)
                const aTag = document.createElement('a')
                aTag.innerHTML = json.shelves[json.shelves.length - 1].name
                aTag.setAttribute('href', `/shelves/${json.shelves[json.shelves.length - 1].id}`)
                const li = document.createElement('li')
                li.appendChild(aTag)
                const button = document.createElement('button')
                button.innerHTML = 'Delete'
                button.setAttribute('class', 'deleteShelfButton')
                button.setAttribute('id', `${json.shelves[json.shelves.length - 1].id}`)
                div.appendChild(li)
                div.appendChild(button)
                shelvesList.appendChild(div)
            } catch (err) {
                console.log(err)
            }
        }
        addShelf()
        createShelfInput.value = ''
    })


    deleteShelfButtons.forEach(button => {
        console.log(button)
        button.addEventListener('click', (event) => {
            const shelfId = event.target.id

            async function deleteShelf() {
                let res = await fetch(`/shelves/${shelfId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let json = await res.json()
                const div = document.querySelector(`.shelf-${shelfId}`)
                div.remove()
            }
            deleteShelf()
        })
    })




})
