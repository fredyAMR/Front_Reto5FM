////////////////GET,POST,PUT Y DELETE

function getTool() {
    $.ajax({
        url: "http://129.146.169.251:8080/api/Tool/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarTool(respuesta);
        }
    });

}

function postTool() {
    if ($("#brand").val().length == 0 ||
        $("#year").val().length == 0 ||
        $("#name").val().length == 0 ||
        $("#description").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {

        let cajas = {
            brand: $("#brand").val(),
            year: $("#year").val(),
            name: $("#name").val(),
            description: $("#description").val(),
            category: { id: +$("#select-category").val() }
        };
        console.log(cajas);

        $.ajax({
            url: "http://129.146.169.251:8080/api/Tool/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("Se creo correctamente la herramienta");
                window.location.reload();
            }
        });
    }
}

function putTool(idBotonActualizar) {
    if ($("#brand").val().length == 0 ||
        $("#year").val().length == 0 ||
        $("#name").val().length == 0 ||
        $("#description").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {

        let cajas = {
            id: idBotonActualizar,
            brand: $("#brand").val(),
            year: $("#year").val(),
            name: $("#name").val(),
            description: $("#description").val(),
            category: { id: +$("#select-category").val() }
        };

        $.ajax({
            url: "http://129.146.169.251:8080/api/Tool/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("Se actualizo correctamente la herramienta");
                window.location.reload();
            }

        });
    }

}

function deleteTool(id) {
    Swal.fire({
        title: '¿Esta seguro de borrar la herramienta?',
        icon: 'warning',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        denyButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {

            let myData = {
                id: id
            };
            $.ajax({
                url: "http://129.146.169.251:8080/api/Tool/" + id,
                type: "DELETE",
                datatype: "JSON",
                data: JSON.stringify(myData),
                contentType: "application/json",
                success: function (respuesta) {
                    window.location.reload();
                }
            });


            Swal.fire(

                'La herramienta ha sido eliminada',

            )
        }
    })
}

/////////////////
function getTool_Category() {
    //console.log("hola desde tool")
    $.ajax({
        url: "http://129.146.169.251:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
            })
        }
    });

}

/////////////////////////////////////////////////////
function pintarTool(respuesta) {
    let myTable = "<Table BORDER=1";
    myTable += "<tr>";
    myTable += "<th>Marca </th>";
    myTable += "<th>Año</th>";
    myTable += "<th>Nombre </th>";
    myTable += "<th>Descripcion </th>";
    myTable += "<th>Actualizar </th>";
    myTable += "<th>Borrar </th>";

    myTable += "</tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].brand + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].year + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].name + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].description + "</td>";
        myTable += "<td> <button onclick='putTool(" + respuesta[i].id + ")' class='flex mx-auto text-white bg-sky-800 border-0 py-2 px-8 focus:outline-none hover:bg-sky-600 rounded text-lg'>Actualizar</button> "
        myTable += "<td> <button onclick='deleteTool(" + respuesta[i].id + ")' class='flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'>Borrar</button> "
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultado3").html(myTable);
}