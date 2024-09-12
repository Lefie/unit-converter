

const length_form = document.getElementById('length-form')
const forms = document.getElementsByClassName('forms')[0]

length_form.addEventListener('submit', function (event){

    event.preventDefault()

    const length  = document.getElementById("length").value
    const from_unit = document.getElementById("from").value
    const to_unit = document.getElementById("to").value

    fetch("/length", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            length: length,
            from: from_unit,
            to: to_unit
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(length,from_unit, to_unit)
        const length_result_ele = document.createElement("p")
        length_result_ele.innerHTML = `The result of your calculation <br>
         ${length} ${from_unit} = ${data.result} ${to_unit} `
        forms.replaceChild(length_result_ele, length_form)
    } )
    .catch(error => console.log(error))
    
})
  

