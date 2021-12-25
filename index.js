function search(e) {
    e.preventDefault()
    let input = document.querySelector('#shorten')
   if (input.value === '') {
       input.classList.add('border-red-400', 'border-2')
       let alert = document.querySelector('.alert')
       alert.classList.remove('hidden')
   } else {
        input.classList.remove('border-red-400', 'border-2')
        let alert = document.querySelector('.alert')
        alert.classList.add('hidden')
        let result
        let url = `https://api.shrtco.de/v2/shorten?url=${input.value}`;
        let req = new XMLHttpRequest()
        try {
            req.open('GET', url, true)
            req.onload = () => {
                result = JSON.parse(req.responseText)
                showLinks(result.result)
                input.value = ''
            }
            req.send()
        } catch (error) {
            console.log(error)
        }
   }
}

function showLinks(response) {
    const parentDiv = document.querySelector('.responses')
    const temp = `
        <div class="bg-white items-center md:text-left text-center w-full rounded-lg my-4 flex md:flex-row flex-col justify-between p-4">
            <span class="w-full md:max-w-2/4 flex-1">${response.original_link}</span>
            <div class="flex md:block flex-col w-full">
                <span class="text-cyan-500 mr-4">${response.full_short_link}</span>
                <button onClick='copy(event)' class="bg-cyan-500 text-white md:w-max w-full px-6 py-2 rounded-lg">Copy</button>
            </div>
        </div>
    `
    parentDiv.innerHTML += temp
}

function  copy(e) {
    let span = e.target.previousElementSibling
    navigator.clipboard.writeText(span.innerText)
    e.target.innerText = "Copied!"
    e.target.classList.add('bg-violet-1000')
    setTimeout(() => {
        e.target.innerText = "Copy"
        e.target.classList.remove('bg-violet-1000') 
    }, 2000);
}

const form = document.querySelector('form')
form.addEventListener('submit', e => {
    search(e)
})