const form = document.getElementById("iptForm");

/*
 * Sends a POST rest call to the Camunda engine to start a process with the variables from the form given by the user
 * Takes the response id (id of the process) and calls the fetchData function. 
*/
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

/*
 * Sends a GET rest call to the Camunda engine asking for the varibles from the process with the id taken as argument. 
 * Displays the result and insurance time in the div with id display 
*/
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
/*
 * Works like a main functions and starts the program
*/

 form.addEventListener("submit", function(e){
    e.preventDefault();
    start();

 });