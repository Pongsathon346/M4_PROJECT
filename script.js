
document.getElementById('searchButton').addEventListener('click',function(){
    let name = document.getElementById('inputSearch').value
    console.log(name)
    hideAll()
    SResults.style.display='flex'
    Stitle.style.display='block'
    querySearch(name)
})

function querySearch(name){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${name}`) 
    .then((response) =>{
        return response.json()
    }).then( data => {
        searchList(data.results)
    })
}

function searchList(data){
    const search = document.getElementById('search-results')
    search.innerHTML = ''
    for(searchdata of data){
        showSearch(searchdata)
    }
}

function showSearch(data){ 
    const searchResults = document.getElementById('search-results');
    let box = document.createElement('div')
        box.classList.add('card','col-sm-3','mx-3','my-2')
        box.style.width="18rem"
        box.style.backgroundColor="#141414"
        box.style.color="white"
    let card = document.createElement('div')
        let image = document.createElement('img')
        image.classList.add('card-img-top')
        image.style.textAlign="center"
        image.style.width="100%"
        image.src = data.image_url
        card.appendChild(image)
        let cardTitle = document.createElement('div')
        cardTitle.classList.add('card-body')
        let title = document.createElement('h5')
        title.innerHTML = data.title
        let detail = document.createElement('p')
        detail.innerHTML = data.synopsis
        cardTitle.appendChild(title)
        cardTitle.appendChild(detail)
        let button = document.createElement('button')
        button.classList.add("btn","btn-danger")
        button.innerHTML = "Add Favorite"
        button.addEventListener('dblclick', function(){
            let confirmadd = confirm(`คุณอยากเพิ่ม ${data.title}  เข้าไปใน Favorite หรือไม่`)
            if(confirmadd){
                addfavDB(data)
            }
        })
        card.appendChild(cardTitle)
        box.appendChild(card)
        box.appendChild(button)
        searchResults.appendChild(box)
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
        let box = document.createElement('div')
        box.classList.add('card','col-sm-3','mx-3','my-2')
        box.style.width="18rem"
        box.style.backgroundColor="#141414"
        box.style.color="white"
        let card = document.createElement('div')
        let image = document.createElement('img')
        image.style.textAlign="center"
        image.style.width="100%"
        image.src = data.image_url
        card.appendChild(image)
        let cardTitle = document.createElement('div')
        let title = document.createElement('h1')
        title.innerHTML = data.title
        cardTitle.appendChild(title)
        let syno = document.createElement('p')
        syno.innerHTML = data.synopsis
        cardTitle.appendChild(syno)
        let button = document.createElement('button')
        button.classList.add("btn","btn-primary")
        button.innerHTML = "Detail"
        button.addEventListener('click', function(){
            queryDetail(data.id)
        })
        let button2 = document.createElement('button2')
        button2.classList.add("btn","btn-danger")
        button2.style.margin="10px";
        button2.innerHTML = "Delete"
        button2.addEventListener('click',function(){
            let confirmd = confirm(`Are you sure  to delete ${data.title}?`)
            if(confirmd){
                deleteFav(data.id)
            } 
        })
        card.appendChild(cardTitle)
        card.appendChild(button)
        card.appendChild(button2)
        box.appendChild(card)
        searchResults.appendChild(box)
        
    }
        
    
    function deleteFav (id) { 
        fetch( `https://se104-project-backend.du.r.appspot.com/movie?id=632110346&&movieId=${id}`,{
            method: 'DELETE' 
        }).then(response => { 
            if (response.status === 200)
            { 
                return response.json() 
            }else{
                throw Error(response.statusText) }
            }).then(data =>
                { alert(`Deleted successfully`) 
                
            }).catch( error => 
                { alert(`${data.name} is not in the List`) 
            })
            hideAll()
            FResults.style.display='flex','justify-content-start'
        }
        
        function queryDetail(id){
            fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110346/${id}`)
            .then((response) => {
                return response.json()
            }).then(data => {
                const detail = document.getElementById('detail-results')
                showDetail(data)
            })
        }
        
        function showDetail(data){
            const detail = document.getElementById('detail-results')
            detail.innerHTML = ''
            let box = document.createElement('div')
            box.style.border="2px solid black"
            box.style.borderRadius="10px"
            box.style.margin="10px"
            box.style.backgroundColor="#141414"
            box.style.color="white"
            let card = document.createElement('div')
            let image = document.createElement('img')
            image.src = data.image_url
            image.style.margin="20px"
            image.style.height="400px"
            image.classList.add('img-thumbnail')
            let describe = document.createElement('div')
            describe.style.margin="20px"
            let title = document.createElement('p')
            title.innerHTML =`Title : ${data.title}`
            let syno = document.createElement('p')
            syno.innerHTML =`Synopsis : ${data.synopsis}`
            let type = document.createElement('p')
            type.innerHTML = `Type : ${data.type}`
            let epi = document.createElement('p')
            epi.innerHTML = `Episodes : ${data.episodes}`
            let score = document.createElement('p')
            score.innerHTML =`Score : ${data.score}`
            let rated = document.createElement('p')
            rated.innerHTML =`rated : ${data.rated}`
            let button = document.createElement('button')
            button.classList.add("btn","btn-danger")
            button.innerHTML = "Back"
            button.style.margin="20px"
            button.addEventListener('click', function(){
                hideAll()
                FResults.style.display='flex','justify-content-start'
            })
            describe.appendChild(title)
            describe.appendChild(syno)
            describe.appendChild(type)
            describe.appendChild(epi)
            describe.appendChild(score)
            describe.appendChild(rated)
            card.appendChild(image)
            card.appendChild(describe)
            card.appendChild(button)
            box.appendChild(card)
            detail.appendChild(box)
            hideAll()
            DResults.style.display='flex','justify-content-start'
        }
        
        document.getElementById('homeMenu').addEventListener('click', (event) => {
            hideAll()
            SResults.style.display='flex','justify-content-start'
            Htitle.style.display='block'
            querySearch()
        })
        
        document.getElementById('favMenu').addEventListener('click', (event) => {
            hideAll()
            FResults.style.display='flex','justify-content-start'
            Ftitle.style.display='block'
            ListQuery()
        })
        var Htitle = document.getElementById('search-result')
        var Stitle = document.getElementById('search-resul')
        var Ftitle = document.getElementById('fav-result')
        
        
        var DResults = document.getElementById('detail-results')
        var SResults = document.getElementById('search-results')
        var FResults = document.getElementById('fav-results')
        
        function hideAll(){
            SResults.style.display='none'
            FResults.style.display='none'
            DResults.style.display='none'
            Ftitle.style.display='none'
            Stitle.style.display='none'
            Htitle.style.display='none'
            
        }
        
        function onLoad(){
            querySearch()
            Ftitle.style.display='none'
            Stitle.style.display='none'
            
        }
        
        
        
        
        