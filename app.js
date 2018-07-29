// add functionality to the form submitt


const onSubmit = document.getElementById('form');

onSubmit.addEventListener('submit', onSubmitForm);


function onSubmitForm(e) {
    e.preventDefault();

    // read the values from all the input fields

    const country = document.getElementById('selectOption').value;
    const gender = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    const number = document.getElementById('names-to-generate').value;

    let url = "http://uinames.com/api/?";


    if (country != '') {
        url += `region=${country}&`;
    }
    if (gender != '') {
        url += `gender=${gender}&`;

    }
    if (number != '') {

        url += `amount=${number}&`;
    }
  if(number<='0'){
    const message = document.createElement('h5');
    message.classList ="alert alert-danger";
    message.textContent= 'The number should be positive integer';
    document.getElementById('error').appendChild(message);
    setTimeout(function (){
        document.getElementById('error').appendChild(message).remove();
    },3000);


  }
  

    // creating AJAX call

    const xhr = new XMLHttpRequest();

    // opening the connection


    xhr.open('GET', url, true);

    // executing the function 

    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            const result = JSON.parse(this.responseText);
            console.log(result);
            let html = '<h3>generated Names:</h3> ';
            html += '<ul>'
            if(number==='1'){
                html = `<h4>Generated Name:</h4><li>  ${result.name} ${result.surname}</li>`;
            } else if(number==='-1'){
                console.log('he');
            }
            
            else {
                result.forEach(name => {

                    html += `
                    <div class="display"><li class="list">${name.name} ${name.surname}</li></div>
                            
                            `;
    
                });
            }
           
            html += '</ul>';



            document.getElementById('ul').innerHTML = html;


        }
    }
    //  sending the request to the server
    xhr.send();
}

// creating class