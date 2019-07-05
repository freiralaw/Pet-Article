$(document).ready(function() {
    $('#add_form').submit(function() {
        event.preventDefault();
    })
    performGetRequest1();
})

function performGetRequest1(){
    var resultElement = document.getElementById('tableResult1');
    resultElement.innerHTML = "";

    axios.get('https://cors-anywhere.herokuapp.com/http://34.67.230.57/petarticle')
     .then(function(response){
         console.log("sukses dapat data")
         response.data.forEach(studylist => {
            resultElement.innerHTML += generateSuccessTableOutput(studylist);
         })
         
     })
     .catch(function(error){
         resultElement.innerHTML = generateErrorHTMLOutput(error);
     })
}

function generateSuccessHTMLOutput(response){
    return '<h4>Result: </h4>' +
            '<h5>Data: </h5>' +
            '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
}

function generateSuccessTableOutput(response){
    return '<tr> <td>' + response.name + '</td>'+
                '<td>' + response.description + '</td>'+
                '<td> <a href="' + response.link + '" target="_blank"> Click Here </a></td>'+
                '<td> ' + response.date.substring(0,10) + '</td>' +
            '</tr>'

}

function createNewArticleList () {
    let inputPetName = $('#inputPetName').val();
    let inputLink = $('#inputLink').val();
    let inputDesc = $('#inputDesc').val();
    // console.log('add new', inputPetName, inputLink, inputDesc)

    axios.post('https://cors-anywhere.herokuapp.com/http://34.67.230.57/petarticle', {name: inputPetName, link: inputLink, description: inputDesc})
        .then(function(response){
            // console.log("sukses add data")
            performGetRequest1();
            $('#inputPetName').val('');
            $('#inputLink').val('');
            $('#inputDesc').val('');
        })
        .catch(function(error){
            // console.log("error add data")
            resultElement.innerHTML = generateErrorHTMLOutput(error);
        })
}