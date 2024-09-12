

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
        length_result_ele.setAttribute("id","result")
        length_result_ele.innerHTML = `The result of your calculation <br>
         ${length} ${from_unit} = ${data.result} ${to_unit} `
        forms.replaceChild(length_result_ele, length_form)
        // create a button
        const btn = document.createElement("BUTTON")
        btn.setAttribute("id","reset")
        btn.innerHTML = "Reset"
        btn.addEventListener("click", function (event) {
            event.preventDefault()
            forms.removeChild(btn)
            forms.replaceChild(length_form,length_result_ele)
        })
        forms.appendChild(btn)
    } )
    .catch(error => {
        const error_obj = document.createElement("p")
        error_obj.innerHTML = error
        forms.appendChild(error_obj)
    })
})




  

