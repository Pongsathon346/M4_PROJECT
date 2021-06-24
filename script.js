
document.getElementById('searchButton').addEventListener('click',function(){
    let name = document.getElementById('inputSearch').value
    console.log(name)
    hideAll()
    SResults.style.display='block'
    querySearch(name)
})

// document.getElementById('searchButton').addEventListener('click', (event) =>{
//     let name = document.getElementById('inputSearch').value
//     if(name != null){
//     console.log(name)
//     fetch(`https://api.jikan.moe/v3/search/anime?q=${name}`)
//     .then(response => {
//         return response.json()
//     }).then(searchdata => {
//         searchList(searchdata)
//     })
//     }
//     else{
//         alert('Please input name')
//     }
// })


function querySearch(name){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${name}`) 
    .then((response) =>{
        return response.json()
    }).then( data => {
        searchList(data.results)
    })
}

function searchList(data){
    const searchTable = document.getElementById('search-results')
    searchTable.innerHTML = ''
    for(searchdata of data){
        showSearch(searchdata)
    }
}

function showSearch(data){ 
    const searchResults = document.getElementById('search-results');
    let card = document.createElement('div')
        let image = document.createElement('img')
        image.src = data.image_url
        card.appendChild(image)
        let title = document.createElement('h1')
        title.innerHTML = data.title
        card.appendChild(title)
        let detail = document.createElement('p')
        detail.innerHTML = data.synopsis
        card.appendChild(detail)
        let button = document.createElement('button')
        button.innerHTML = "add List"
        button.addEventListener('dblclick', function(){
            let confirmadd = confirm(`คุณอยากเพิ่ม ${data.title}  เข้าไปใน Favorite หรือไม่`)
            if(confirmadd){
                addfavDB(data)
            }
        })
        card.appendChild(button)
        searchResults.appendChild(card)
        console.log(data.mal_id)
    }

function onLoad(){
      querySearch()
}

function ListQuery(){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110346`).then((response)=>{
        return response.json()
    }).then( data=>{
        myList(data)
    })
}

function myList(list){
    const myListTable = document.getElementById('fav-results')
    myListTable.innerHTML = ''
    for(mylist of list){
        showFav(mylist)
    }
}

function showFav(data){ 
    const searchResults = document.getElementById('fav-results');
    let card = document.createElement('div')
        let image = document.createElement('img')
        image.src = data.image_url
        card.appendChild(image)
        let title = document.createElement('h1')
        title.innerHTML = data.title
        card.appendChild(title)
        let detail = document.createElement('p')
        detail.innerHTML = data.synopsis
        card.appendChild(detail)
        let button = document.createElement('button')
        button.innerHTML = "add List"
        button.addEventListener('dblclick', function(){
            let confirmadd = confirm(`คุณอยากเพิ่ม ${data.title}  เข้าไปใน Favorite หรือไม่`)
            if(confirmadd){
                addfavDB(data)
            }
        })
        card.appendChild(button)
        searchResults.appendChild(card)
        
    }

function addSearchToDB(movie){
    var id=1
    let body=`{"url":"${movie.url}","image_url":"${movie.image_url}","title":"${movie.title}","synopsis":"${movie.synopsis}","type":"${movie.type}","episodes":"${movie.episodes}","score":"${movie.score}","rated":"${movie.rated}","id":"${id}"}`
    fetch(`https://se104-project-backend.du.r.appspot.com/movies `,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"id":"632110342","movie":${body}}`
        }).then(response=>{
            if(response.status == 200){
                return response.json()
            }else{
                throw Error(response.statusText)
            }
        }).then(data=>{
            alert('Success')
            id++
        }).catch(error=>{
            alert('Error')
        })
}



function addfavDB(anime){
    var id=1
    let body=`{"url":"${anime.url}","image_url":"${anime.image_url}","title":"${anime.title}","synopsis":"${anime.synopsis}","type":"${anime.type}","episodes":"${anime.episodes}","score":"${anime.score}","rated":"${anime.rated}","id":"${id}"}`
    fetch(`https://se104-project-backend.du.r.appspot.com/movies `,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"id":"632110346","movie":${body}}`
        }).then(response=>{
            if(response.status == 200){
                return response.json()
            }else{
                throw Error(response.statusText)
            }
        }).then(data=>{
            alert('Success')
            id++
        }).catch(error=>{
            alert('Error')
        })
}




document.getElementById('homeMenu').addEventListener('click', (event) => {
    hideAll()
    SResults.style.display='block'
    querySearch()
})

document.getElementById('favMenu').addEventListener('click', (event) => {
    hideAll()
    FResults.style.display='block'
    ListQuery()
})

var SResults = document.getElementById('search-results')
var FResults = document.getElementById('fav-results')

function hideAll(){
    SResults.style.display='none'
    FResults.style.display='none'
}





