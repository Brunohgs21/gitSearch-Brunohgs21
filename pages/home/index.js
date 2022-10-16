/* Desenvolva sua lógica aqui...*/




function formUser() {
    const btn = document.querySelector('#user-button')

    btn.addEventListener('click', (event) => {
        event.preventDefault()
        console.log(event.target)

        let p = event.target.previousElementSibling
        console.log(p)
        let user = p.previousElementSibling.value
        console.log(user)
        searching(user)


    })


}
formUser()


async function searching(usuario) {
    //console.log(usuario)

    const data = await fetch(`https://api.github.com/users/${usuario}`)
    const dataJson = await data.json()





    if (dataJson.message) {
        const result = document.querySelector('.result')
        result.classList = 'show-result'
        console.log(dataJson.message)
    } else {
        const btn = document.querySelector('#user-button')
        btn.classList.toggle('button-loading')
        searchUser(dataJson)

        setTimeout(() => {

            window.location.href = './pages/profile/index.html'
        }, 4000)
    }


    return dataJson



}


function getDataLocalStorage() {
    return JSON.parse(localStorage.getItem("@gitsearch:user")) || []
}





function searchUser(user) {
    console.log(user)



    let users = getDataLocalStorage()
    console.log(users)

    let { login, avatar_url, bio, name, repos_url, id } = user
    console.log(login)

    let newUser = {
        'login': login,
        'avatar_url': avatar_url,
        'bio': bio,
        'name': name,
        'repos_url': repos_url,
        'id': id,
    }

    console.log(newUser)

    let search = alreadySearched(newUser)
    console.log(search)
    if(search > -1){
        users.splice(search,1)
    }


    if (users.length < 3) {


        users = [...users, newUser]




    } else {
        users.splice(0, 1)

        users = [...users, newUser]


    }

    localStorage.setItem("@gitsearch:user", JSON.stringify(users))
    console.log(getDataLocalStorage())
}

{/* <li class="found-user">
                <img class='found-img'src="" alt="">
                <button class="found-btn">Acessar este perfil</button>
              </li> */}

function listRecents() {
    let recents = getDataLocalStorage()

    let ul = document.querySelector('.found-users')

    recents.forEach((user) => {
        let recentUser = createRecent(user)

        ul.appendChild(recentUser)
    })
}
listRecents()

function createRecent(element) {
    let { avatar_url, id } = element


    let li = document.createElement('li')
    li.classList.add('found-user')

    let img = document.createElement('img')
    img.classList.add('found-img')
    img.src = avatar_url



    let btn = document.createElement('button')
    btn.classList.add('found-btn')
    btn.innerText = 'Acessar este perfil'
    btn.id = id

    img.addEventListener('mouseover', () => {
        btn.classList = 'found-btn-2'
    })
    li.addEventListener('mouseleave', () => {
        btn.classList = 'found-btn'
    })

    btn.addEventListener('click', (event) => {
        let idUser = event.target.id
        console.log
        let data = getDataLocalStorage()
        let finder = data.find((element) => {
            return element.id == idUser
        })
        console.log(finder)
        let index = alreadySearched(finder)
        console.log(index)
        data.splice(index,1)

        data = [...data,finder]
        console.log(data)

        localStorage.setItem("@gitsearch:user", JSON.stringify(data))
        window.location.href = './pages/profile/index.html'
    })

    li.append(img, btn)

    return li

}

function alreadySearched(user){
    
    return getDataLocalStorage().findIndex(element => element.name === user.name)
}


function activeBtn() {
    const input = document.querySelector('.user-input')


    input.addEventListener('click', () => {
        const btn = document.querySelector('#user-button')
        btn.classList = 'btn-pointer'
    })
}
activeBtn()