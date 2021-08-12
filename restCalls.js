const form = document.getElementById("iptForm");

function start()
{
	 const url = 'http://localhost:8080/engine-rest/process-definition/key/iptForecast/start';
	 const user = {
                "variables": {
                "firstName" : {"value": fname.value, "type": "String"},
                "birthYear": {"value":birthYear.value,"type":"String"},
                "incomeYear": {"value":yearIncome.value,"type":"String"},
                "insuranceTime": {"value":insuranceTime.value,"type":"String"},
                "withdrawalShare": {"value": withdrawalShare.value,"type":"String"}
                }
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(url, options)
            .then(res => res.json())
            .then(res => fetchData(res.id));
}


function fetchData(id) {
    console.log("START");
   
    
    fetch('http://localhost:8080/engine-rest/process-instance/' + id + '/variables').then(response => {
        if(!response.ok){
            throw Error("ERROR");
        }
        return response.json();
    }).then(data => {
        console.log(data); 
        console.log(data.result.value)


        document
        .querySelector('#display')
        .insertAdjacentHTML('afterbegin', 'Result: ' + data.result.value + ' SEK per year' + ' or ' + data.result.value/12 + ' SEK per month' + ' Maximal Insurance Time ' + data.maxInsuranceTime.value);
    


    }).catch(error => {
        console.log(error);
    });
}

 form.addEventListener("submit", function(e){
    e.preventDefault();
    start();

 });