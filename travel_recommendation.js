function clickSubmit(){

    console.log("submit");
}
let travelData=[];
function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('./travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        data.countries.map(item=>{
            travelData = travelData.concat(item.cities);
        });
        travelData=[...travelData, ...data.beaches,...data.temples];
       const condition = travelData.filter(item => item.description.toLowerCase().includes(input));

        if (condition.length > 0) {
            condition.map(res => {
                const name = res.name;
                const description = res.description;
      
                resultDiv.innerHTML += `<h2>${name}</h2>`;
                resultDiv.innerHTML += `<img src="${res.imageUrl}" alt="hjh">`;
      
                resultDiv.innerHTML += `<p>${description}</p>`;
               

            })
          
        } else {
          resultDiv.innerHTML = 'Search result not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

  function clearResult() {
    const resultDiv = document.getElementById('result');
    document.getElementById('conditionInput').value="";

    resultDiv.innerHTML ="";
}

