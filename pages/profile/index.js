/* Desenvolva sua lógica aqui...*/



function getDataLocalStorage(){
    return JSON.parse(localStorage.getItem("@gitsearch:user")) || []
}

function getUser(){

    let array = getDataLocalStorage()

    let index = array.length - 1
   
    let user = array[index]
    console.log(user)
    renderPage(user)

}
getUser()

function exitPage() {
  const btn = document.querySelector('.btn-change')

  btn.addEventListener('click', ()=>{
      window.location.href = '../home/index.html'
      body.innerHtml = ''
  })
}
exitPage()




async function renderPage(objeto){
    let {login,avatar_url,bio,name,repos_url} = objeto

    let img = document.querySelector('.user-img')
    img.src = avatar_url

    let p1 = document.querySelector('.user-name')
    p1.innerText = name

    let p2 = document.querySelector('.user-bio')
    p2.innerText = bio

    

    const repos = await fetch(`${repos_url}`)
    const reposJson = await repos.json()


    let reposArray = []
    reposJson.forEach(element => {

        let {name,html_url,description} = element

        let newElement = {
            'name': name,
            'html': html_url,
            'description': description,
        }

    
        reposArray.push(newElement)
    });



   renderRepos(reposArray)

   
}


function renderRepos(array) {
    const ul = document.querySelector('.repos-list')


    array.forEach((element)=>{
        
        let templateRepo = createRepo(element)

        ul.appendChild(templateRepo)
    })
}





function createRepo(elemento) {
    let {name,html,description} = elemento

    let li = document.createElement("li")
    li.classList.add('repo')

    let container = document.createElement('div')
    container.classList.add('repo-div')

    let h2 = document.createElement('h2')
    h2.classList.add('repo-title')
    h2.innerText = name

    let p = document.createElement('p')
    p.classList.add('repo-text')
    p.innerText = description

    let divBtn = document.createElement('div')
    divBtn.classList.add('btn-div')

    let repoBtn = document.createElement('button')
    repoBtn.classList.add('repo-btn')
    repoBtn.innerText = 'Repositório'

    repoBtn.addEventListener('click', ()=>{
        window.location.href = html
    })

    let demoBtn = document.createElement('button')
    demoBtn.classList.add('demo-btn')
    demoBtn.innerText = 'Demo'


    divBtn.append(repoBtn,demoBtn)
    container.append(h2,p,divBtn)
    li.appendChild(container)

    return li
}