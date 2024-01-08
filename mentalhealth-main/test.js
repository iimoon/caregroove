//for deleting item
const deleteFunction = (id) =>{
    axios.delete('sourcelinl.com/api_endpoint/'+id)
    .then ((response)=>{
        alert("Item deleted")
    })
    .catch((error)=>{
        console.log("Error:",error)
    })
}
//For updating existing item item
const updateFunction =(id,updatedValue)=>{
    axios.put('sourcelink.com/api_endpoing/'+id,updatedValue)
    .then((response)=>{
        alert("Item updated")
    })
    .catch((error)=>{
        console.log("Error:",error)
    })
}