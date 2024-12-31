const titre = document.getElementById('titre')
const article = document.getElementById('article')
const buttonAjout = document.getElementById('sendArticle')
const retourListe = document.querySelector('.ajoutArticle .fa-circle-xmark')

retourListe.addEventListener('click', ()=>{
    window.location.href = 'index.html'
})

let tableau = JSON.parse(localStorage.getItem('lesblocs')) || []
let amodifier = JSON.parse(localStorage.getItem('lemodife')) || null

if(amodifier){
    titre.value = amodifier.titre
    article.value = amodifier.article
    buttonAjout.innerText = 'Modifier'
}

buttonAjout.addEventListener('click', ajoutBloc)

function ajoutBloc(){
    const saisiTitre = titre.value
    const saisiArticle = article.value

    if(saisiTitre === '' && saisiArticle === ''){
        return
    }

    let lesSaisis = {
        titre: saisiTitre,
        article: saisiArticle
    }

    if(amodifier){
        let verifier = tableau.findIndex((el)=> el.titre === amodifier.titre && el.article === amodifier.article)
        if(verifier !== -1){
            tableau[verifier] = lesSaisis
        }
        localStorage.removeItem('lemodife')
    }else{
        tableau.push(lesSaisis)
    }
    
    window.location.href = 'index.html'
    localStorage.setItem('lesblocs', JSON.stringify(tableau))

    titre.value = ''
    article.value = ''

}


