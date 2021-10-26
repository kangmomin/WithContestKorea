const detailSearch = document.getElementById('detailSearch') 

let isSearchShow = false
let isDetailSearch = false
 
document.getElementById('detailSearch').addEventListener('click', hiddenDetailSearch, false)
document.getElementById('searchBtn').addEventListener('click', searchBtnController, false)


function searchBtnController() {
    if (!isSearchShow) {
        showSearch()
        return isSearchShow = true
    }
    return showDetailSearch() 
}

function showSearch() {
    return $("#searchArea").animate({width:'toggle'}, 400)
}

function showDetailSearch() {
    detailSearch.style.display = 'block'
}

function hiddenDetailSearch() {
    detailSearch.style.display = 'none'
}