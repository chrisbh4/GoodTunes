window.addEventListener('DOMContentLoaded', (event)=>{

const updateForm = document.querySelector('.updateForm');
const updateInput = document.querySelector('.updateInput');
const updateButton = document.querySelector('.updateButton');
updateForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const id = event.target.id;
    const newName = updateInput.value;
    async function update(){
        const res = await fetch(`/shelves/update/${id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: newName })
        })
       // const json = await res.json()
        const shelfName = document.querySelector(".shelfName")
        shelfName.innerHTML = `${newName}`
        updateInput.value="";

    }

    update()
})



})
