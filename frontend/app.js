


const forms = document.getElementsByClassName('forms')[0]
const selected = document.getElementsByClassName('selected')[0]
const length_label = document.getElementById("length-label")
const weight_label = document.getElementById("weight-label")
const temp_label = document.getElementById("temp-label")

console.log(length_label, weight_label, temp_label )

weight_label.addEventListener("click", function (event) {
    event.preventDefault()

    // switch 'selected' to weight form
    if (length_label.classList.contains("selected")){
        length_label.classList.remove("selected")
    }

    if(temp_label.classList.contains("selected")) {
        temp_label.classList.remove("selected")
    }

    weight_label.classList.add("selected")

    // console.log(forms.children)

    // remove the current elements 
    while (forms.children.length != 0){
        forms.children[0].remove()
    }

    // form
    const form = generate_form("weight")
    
    forms.appendChild(form)


})

length_label.addEventListener("click", function (event) {
    event.preventDefault()
    if (weight_label.classList.contains("selected")){
        weight_label.classList.remove("selected")
    }
    
    if(temp_label.classList.contains("selected")) {
        temp_label.classList.remove("selected")
    }
    length_label.classList.add("selected")
    console.log("length")

    while (forms.children.length != 0){
        forms.children[0].remove()
    }

    const form = generate_form("length")
    forms.appendChild(form)
})



temp_label.addEventListener("click", function (event) {
    event.preventDefault()
    if (length_label.classList.contains("selected")){
        length_label.classList.remove("selected")
    }
    
    if (weight_label.classList.contains("selected")){
        weight_label.classList.remove("selected")
    }

    temp_label.classList.add("selected")
    console.log("temp")

    while (forms.children.length != 0){
        forms.children[0].remove()
    }

    const form = generate_form("temp")
    forms.appendChild(form)

})

/*
type : type of form : length, weight, temp 

*/

const generate_form = (type) => {
    let form = document.createElement("form")
    let id = type + "-form"
    form.setAttribute("id", id)

    if ( type === "length"){
        //label
        let label_node = generate_node("label",[{"for":"length"}],"Enter the length to convert")
        form.appendChild(label_node)

        //input bar
        let input_node = generate_node("input",[{"type":"number"},{"id":"length"},{"name":"length"}])
        form.appendChild(input_node)

        // line break
        const line_break = document.createElement("br")
        form.appendChild(line_break)

         // label 2
        let label_node1 = generate_node("label",[{"for":"from"}],"<br><br>Unit to Convert <strong>from</strong>")
        form.appendChild(label_node1)

        // select node 
        let select_node = generate_node("select",[{"name":"from"},{"id":"from"}])
        // option node 
        let option1 = generate_node("option",[{"value":"millimeter"}],"millimeter")
        let option2 = generate_node("option",[{"value":"centimeter"}],"centimeter")
        let option3 = generate_node("option",[{"value":"meter"}],"meter")
        let option4 = generate_node("option",[{"value":"kilometer"}],"kilometer")
        let option5 = generate_node("option",[{"value":"inch"}],"inch")
        let option6 = generate_node("option",[{"value":"foot"}],"foot")
        let option7 = generate_node("option",[{"value":"yard"}],"yard")
        let option8 = generate_node("option",[{"value":"mile"}], "mile")

        select_node.appendChild(option1)
        select_node.appendChild(option2)
        select_node.appendChild(option3)
        select_node.appendChild(option4)
        select_node.appendChild(option5)
        select_node.appendChild(option6)
        select_node.appendChild(option7)
        select_node.appendChild(option8)
        form.appendChild(select_node)


        //label 3
        let label_node2 = generate_node("label",[{"for":"from"}],"<br><br>Unit to Convert <strong>to</strong>")
        form.appendChild(label_node2)

        // select node 
        let select_node2 = generate_node("select",[{"name":"to"},{"id":"to"}])
        
        // options
        let option9 = generate_node("option",[{"value":"millimeter"}],"millimeter")
        let option10 = generate_node("option",[{"value":"centimeter"}],"centimeter")
        let option11 = generate_node("option",[{"value":"meter"}],"meter")
        let option12 = generate_node("option",[{"value":"kilometer"}],"kilometer")
        let option13 = generate_node("option",[{"value":"inch"}],"inch")
        let option14 = generate_node("option",[{"value":"foot"}],"foot")
        let option15 = generate_node("option",[{"value":"yard"}],"yard")
        let option16 = generate_node("option",[{"value":"mile"}], "mile")

        select_node2.appendChild(option9)
        select_node2.appendChild(option10)
        select_node2.appendChild(option11)
        select_node2.appendChild(option12)
        select_node2.appendChild(option13)
        select_node2.appendChild(option14)
        select_node2.appendChild(option15)
        select_node2.appendChild(option16)
        form.appendChild(select_node2)

        // line break
        form.appendChild(line_break)

        // convert button 
        let convert_btn = generate_node("input",[{"type":"submit"},{"value":"Convert"}])
    
        convert_btn.addEventListener("click", function (event) {
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
            .then(response=>response.json())
            .then(data=>{
                const length_result = document.createElement("p")
                length_result.setAttribute("id","result")
                length_result.innerHTML=`the result of your calculation <br> 
                ${length} ${from_unit} = ${data.result} ${to_unit}`
                forms.replaceChild(length_result, form)
                console.log("data from backend", data)
                // create a button
                const btn = generate_node("button",[{"id":"reset"}],"Reset")
                
                btn.addEventListener("click", function (event) {
                    event.preventDefault()
                    forms.removeChild(btn)
                    forms.replaceChild(form,length_result)
                })
                forms.appendChild(btn)


            })
            .catch(error => {
                const error_obj = document.createElement("p")
                error_obj.innerHTML = error
                forms.appendChild(error_obj)
            })

        })

        form.appendChild(convert_btn)

    }

    if ( type === "weight") {
        
        // label 
        let label_node = generate_node("label",[{"for":"weight"}],"Enter the weight to convert")
        form.appendChild(label_node)

        // input bar
        let input_node = generate_node("input",[{"type":"number"},{"id":"weight"},{"name":"weight"}])
        form.appendChild(input_node)

         // line break
         const line_break = document.createElement("br")
         form.appendChild(line_break)

        // label 2
        let label_node1 = generate_node("label",[{"for":"from"}],"<br><br>Unit to Convert <strong>from</strong>")
        form.appendChild(label_node1)

        // select node 
        let select_node = generate_node("select",[{"name":"from"},{"id":"from"}])
        // option node 
        let option1 = generate_node("option",[{"value":"milligram"}],"milligram")
        let option2 = generate_node("option",[{"value":"gram"}],"gram")
        let option3 = generate_node("option",[{"value":"kilogram"}],"kilogram")
        let option4 = generate_node("option",[{"value":"ounce"}],"ounce")
        let option5 = generate_node("option",[{"value":"pound"}],"pound")

        select_node.appendChild(option1)
        select_node.appendChild(option2)
        select_node.appendChild(option3)
        select_node.appendChild(option4)
        select_node.appendChild(option5)
    
        form.appendChild(select_node)

        //label 3
        let label_node2 = generate_node("label",[{"for":"from"}],"<br><br>Unit to Convert <strong>to</strong>")
        form.appendChild(label_node2)

        // select node 
        let select_node2 = generate_node("select",[{"name":"to"},{"id":"to"}])
        
        // options
        let option9 = generate_node("option",[{"value":"milligram"}],"milligram")
        let option10 = generate_node("option",[{"value":"gram"}],"gram")
        let option11 = generate_node("option",[{"value":"kilogram"}],"kilogram")
        let option12 = generate_node("option",[{"value":"ounce"}],"ounce")
        let option13 = generate_node("option",[{"value":"pound"}],"pound")


        select_node2.appendChild(option9)
        select_node2.appendChild(option10)
        select_node2.appendChild(option11)
        select_node2.appendChild(option12)
        select_node2.appendChild(option13)
  
        form.appendChild(select_node2)

        // line break
        form.appendChild(line_break)


        // convert button 
        let convert_btn = generate_node("input",[{"type":"submit"},{"value":"Convert"}])

        convert_btn.addEventListener("click", function(event){
            event.preventDefault()
            const weight = document.getElementById("weight").value
            const from = document.getElementById("from").value
            const to = document.getElementById("to").value
            
            fetch("/weight", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    weight:weight,
                    from : from,
                    to: to
                })
            })
            .then(response => response.json())
            .then(data => {
                const weight_result = generate_node("p",[{"id":"result"}],`the result of your calculation <br> ${weight} ${from} = ${data.result} ${to}`)
                forms.replaceChild(weight_result, form)

                //create a reset button
                const btn = generate_node("button",[{"id":"reset"}],"Reset")

                btn.addEventListener("click", function(event){
                    event.preventDefault()
                    forms.removeChild(btn)
                    forms.replaceChild(form, weight_result)
                })

                forms.appendChild(btn)
            })
            .catch(error => {
                const error_obj = document.createElement("p")
                error_obj.innerHTML = error
                forms.appendChild(error_obj)
            })

        })

            form.appendChild(convert_btn)
    }

    if (type === "temp") {
        // label 
        let label_node = generate_node("label",[{"for":"temp"}],"Enter the temprature to convert")
        form.appendChild(label_node)

        // input bar
        let input_node = generate_node("input",[{"type":"number"},{"id":"temp"},{"name":"temp"}])
        form.appendChild(input_node)

         // line break
         const line_break = document.createElement("br")
         form.appendChild(line_break)

        // label 2
        let label_node1 = generate_node("label",[{"for":"from"}],"<br><br>Unit to Convert <strong>from</strong>")
        form.appendChild(label_node1)

        // select node 
        let select_node = generate_node("select",[{"name":"from"},{"id":"from"}])

        // option node 
        let option1 = generate_node("option",[{"value":"celsius"}],"celsius")
        let option2 = generate_node("option",[{"value":"fahrenheit"}],"fahrenheit")
        let option3 = generate_node("option",[{"value":"kelvin"}],"kelvin")
 
        select_node.appendChild(option1)
        select_node.appendChild(option2)
        select_node.appendChild(option3)

        form.appendChild(select_node)

        //label 3
        let label_node2 = generate_node("label",[{"for":"to"}],"<br><br>Unit to Convert <strong>to</strong>")
        form.appendChild(label_node2)

        // select node 
        let select_node2 = generate_node("select",[{"name":"to"},{"id":"to"}])

        // option node 
        let option4 = generate_node("option",[{"value":"celsius"}],"celsius")
        let option5 = generate_node("option",[{"value":"fahrenheit"}],"fahrenheit")
        let option6 = generate_node("option",[{"value":"kelvin"}],"kelvin")
 
        select_node2.appendChild(option4)
        select_node2.appendChild(option5)
        select_node2.appendChild(option6)

        form.appendChild(select_node2)

        // line break
        form.appendChild(line_break)

        // convert button 
        let convert_btn = generate_node("input",[{"type":"submit"},{"value":"Convert"}])

        convert_btn.addEventListener("click", function(event) {
            event.preventDefault()
            const temp = document.getElementById("temp").value
            const from = document.getElementById("from").value
            const to = document.getElementById("to").value

            console.log("clieant", temp, from, to)

            fetch("/temperature",{
               method: "POST",
               headers: {
                'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                temp:temp,
                from:from,
                to:to
               })
                
            })
            .then(response => response.json())
            .then(data => {
                const temp_result = generate_node("p", [{"id":"result"}], `the result of your calculation <br> ${temp} ${from} : ${data.result}${to}`)
                forms.replaceChild(temp_result, form)

                // create a reset button 
                const btn = generate_node("button",[{"id":"reset"}], "Reset")

                btn.addEventListener("click", function(event){
                    event.preventDefault()
                    forms.removeChild(btn)
                    forms.replaceChild(form, temp_result)
                })

                forms.appendChild(btn)
                
            })
            .catch(error => {
                const error_obj = document.createElement("p")
                error_obj.innerHTML = error
                forms.appendChild(error_obj)
            })

        })
            form.appendChild(convert_btn)


    }

    return form;
}


/* 
type: the name of the node , str
attributes: [{key, value}] -> a list of dictionaries 
content : string
*/

const generate_node = (type, attributes, content) => {
    let node = document.createElement(type)
    
    for (let i = 0; i < attributes.length; i++){
        const key = Object.keys(attributes[i])[0]
        const value = attributes[i][key]
        node.setAttribute(key,value)
    }
    node.innerHTML = content
    return node
}


if(length_label.classList.contains("selected")){
    //generate_form("length")
    console.log("length is selected")
    const length_form = generate_form("length")
    forms.appendChild(length_form)
} 

