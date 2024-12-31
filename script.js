const ajout = document.getElementById('buttonAjout')
const buttonMode = document.querySelector('.cs span')
const Mode = document.querySelector('.claireSombre')
const modebutton = document.querySelector('.claireSombre span')
const lemenu = document.querySelector('.menu-burger')
const menuMasquer = document.querySelector('.a_masquer')
const conteneurBloc = document.querySelector('.contain-bloc')

ajout.addEventListener('click', activerAjout)
function activerAjout(){
    window.location.href = 'ajout_modif.html'
}

let tableau = JSON.parse(localStorage.getItem('lesblocs')) || []

creationBloc(tableau)

function creationBloc(e){
    e.forEach((el)=>{
        const div = document.createElement('div')
        div.classList.add('bloc', 'p-3', 'd-flex', 'justify-content-between', 'flex-column')
        div.innerHTML = `<div class="bloc-article">
                            <h5>${el.titre}</h5>
                            <p>${el.article}</p>
                        </div>
                        <div class="bande w-100 d-flex justify-content-between align-items-center">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <p class="m-0"></p>
                            <i class="fa-solid fa-trash"></i>
                        </div>`
        conteneurBloc.appendChild(div)
    
        modifSup(div)
        ladate(div)
    })
}

function modifSup(e){
    const mofifier = e.querySelector('.bande .fa-pen-to-square')
    mofifier.addEventListener('click', () => {
        let mytitre = e.querySelector('.bloc-article h5').textContent
        let myarticle = e.querySelector('.bloc-article p').textContent

        let amodifier = {
            titre: mytitre,
            article: myarticle 
        }

        localStorage.setItem('lemodife', JSON.stringify(amodifier))

        window.location.href = 'ajout_modif.html'
    })

const supprimer = e.querySelector('.bande .fa-trash')
    supprimer.addEventListener('click', () => {
        let letitre = e.querySelector('.bloc-article h5').textContent
        let larticle = e.querySelector('.bloc-article p').textContent
        let aSortir = tableau.findIndex((el) => el.titre === letitre && el.article === larticle)
        if(aSortir !== -1){
            tableau.splice(aSortir, 1)
        }

        e.remove()
        
        localStorage.setItem('lesblocs', JSON.stringify(tableau))
    })
}

Mode.addEventListener('click', clairSombre)

function clairSombre(){
    modebutton.classList.toggle('active')

    if(modebutton.classList.contains('active')){
        document.documentElement.style.setProperty('--lenoir', 'rgb(246, 246, 246)')
        document.documentElement.style.setProperty('--leblanc', 'rgb(27, 27, 27)')
        document.documentElement.style.setProperty('--levert', 'rgb(3, 133, 98)')

        localStorage.setItem('lemode', 'sombre')

    }else{
        document.documentElement.style.setProperty('--lenoir', 'rgb(27, 27, 27)')
        document.documentElement.style.setProperty('--leblanc', 'rgb(246, 246, 246)')
        document.documentElement.style.setProperty('--levert', 'rgb(69, 203, 167)')

        localStorage.setItem('lemode', 'clair')

    }
}

(function sombreClairSave(){
    const averif = localStorage.getItem('lemode')
    if(averif === 'sombre'){
        modebutton.classList.add('active')
        document.documentElement.style.setProperty('--lenoir', 'rgb(246, 246, 246)')
        document.documentElement.style.setProperty('--leblanc', 'rgb(27, 27, 27)')
        document.documentElement.style.setProperty('--levert', 'rgb(3, 133, 98)')
    }else{
        modebutton.classList.remove('active')
        document.documentElement.style.setProperty('--lenoir', 'rgb(27, 27, 27)')
        document.documentElement.style.setProperty('--leblanc', 'rgb(246, 246, 246)')
        document.documentElement.style.setProperty('--levert', 'rgb(69, 203, 167)')
    }
})()



lemenu.addEventListener('click', afficherMenu)

function afficherMenu(){
    lemenu.classList.toggle('active')

    if(lemenu.classList.contains('active')){
        lemenu.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        menuMasquer.classList.add('active')
    }else{
        lemenu.innerHTML = '<i class="fa-solid fa-bars"></i>'
        menuMasquer.classList.remove('active')
    }

}

function ladate(e){
    const today = e.querySelector('.bande p')
    let ladate = new Date
    let jour = ladate.getDay()
    let lesJours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
    let mois = ladate.getMonth()
    let lesmois = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre']
    today.innerText = `${lesJours[jour]} ${ladate.getDate()} ${lesmois[mois]} ${ladate.getFullYear()}`
}