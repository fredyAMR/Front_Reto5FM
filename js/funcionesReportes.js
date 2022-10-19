function getStatus(){
    $.ajax({
        url:"http://129.146.169.251:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
            console.log(respuesta);
        }
    });
}
function pintarStatus(respuesta){
    let myTable="<table>";
        myTable+="<tr>";
        myTable+="<th>completadas</th>";
        myTable+="<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta.completed + "</td>";
        myTable+="<th>canceladas</th>";
        myTable+= "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta.cancelled + "</td>";
        myTable+="</tr>";   
 
    myTable+="</table>";
    $("#resultado6").html(myTable);
}

function getFechas(){
    let dato1= $("#startDate1").val();
    let dato2= $("#startDate2").val();
    
    $.ajax({
        url:"http://129.146.169.251:8080/api/Reservation/report-dates/"+dato1+"/"+dato2,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarFechas(respuesta);
            console.log(respuesta);
        }
    });

}

function pintarFechas(respuesta){
    let myTable = "<Table BORDER=2";
    myTable += "<tr>";
    myTable += "<th>Fecha Inicial</th>";
    myTable += "<th>Fecha Final</th>";
    myTable += "<th>Status </th>";
    myTable += "<th>Cliente </th>";

    myTable += "</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado7").html(myTable);
}

function getReporteCliente() {
    $.ajax({
        url: "http://129.146.169.251:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            mostrarClientes(respuesta);
        }
    });
}


function mostrarClientes(respuesta) {
    let myTable = "<Table BORDER=2";
    myTable += "<tr>";
    myTable += "<th>Id</th>";
    myTable += "<th>Nombre </th>";
    myTable += "<th>Email </th>";
    myTable += "<th>Edad </th>";

    myTable += "</tr>";
    $("#respuesta8").html(myTable);

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].idClient + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].name + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].email + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].age + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado8").append(myTable);
}