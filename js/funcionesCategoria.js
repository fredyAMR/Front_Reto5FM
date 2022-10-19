// GET, POST, PUT Y DELETE

function getCategoria() {
    $.ajax({
        url: "http://129.146.169.251:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarCategoria(respuesta);
        }
    });
}

function postCategoria() {
    if ($("#name").val().length == 0 || $("#description").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {

        let cajas = {
            name: $("#name").val(),
            description: $("#description").val()
        };

        $.ajax({
            url: "http://129.146.169.251:8080/api/Category/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("Se creo correctamente la categoria");
                window.location.reload();
            }

        });

    }

}

function putCategoria(idBotonActualizar) {
    if ($("#name").val().length == 0 || $("#description").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {

        let cajas = {
            id: idBotonActualizar,
            name: $("#name").val(),
            description: $("#description").val()
        };

        $.ajax({
            url: "http://129.146.169.251:8080/api/Category/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("Se actualizo correctamente la categoria");
                window.location.reload();
            }

        });
    }
}

function deleteCategoria(id) {
    Swal.fire({
        title: '¿Esta seguro de borrar la categoria?',
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
                url: "http://129.146.169.251:8080/api/Category/" + id,
                type: "DELETE",
                datatype: "JSON",
                data: JSON.stringify(myData),
                contentType: "application/json",
                success: function (respuesta) {

                    window.location.reload();
                }
            });


            Swal.fire(

                'La Categoria ha sido Eliminada',

            )
        }
    })

}

/////////////////////////////////////////////////////
function pintarCategoria(respuesta) {
    let myTable = "<Table BORDER=1";
    myTable += "<tr>";
    myTable += "<th>Id </th>";
    myTable += "<th>Nombre </th>";
    myTable += "<th>Description </th>";
    myTable += "<th>Actualizar </th>";
    myTable += "<th>Borrar </th>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].id + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].name + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].description + "</td>";
        myTable += "<td> <button onclick='putCategoria(" + respuesta[i].id + ")' class='flex mx-auto text-white bg-sky-800 border-0 py-2 px-8 focus:outline-none hover:bg-sky-600 rounded text-lg'>Actualizar</button> "
        myTable += "<td> <button onclick='deleteCategoria(" + respuesta[i].id + ")' class='flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'>Borrar</button> "
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultado1").html(myTable);
}
