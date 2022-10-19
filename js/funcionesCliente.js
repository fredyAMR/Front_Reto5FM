// GET, POST, PUT Y DELETE

function getCliente() {
    $.ajax({
        url: "http://129.146.169.251:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarCliente(respuesta);
        }
    });
}

function postCliente() {
    if ($("#idClient").val().length == 0 ||
        $("#email").val().length == 0 ||
        $("#password").val().length == 0 ||
        $("#name").val().length == 0 ||
        $("#age").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {
        let cajas = {

            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: $("#age").val()
        };

        $.ajax({
            url: "http://129.146.169.251:8080/api/Client/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("Se creo correctamente el cliente");
                window.location.reload();
            }

        });

    }
}
function putCliente(idBotonActualizar) {

    if ($("#email").val().length == 0 ||
        $("#password").val().length == 0 ||
        $("#name").val().length == 0 ||
        $("#age").val().length == 0) {

        alert("Todos los campos son obligatorios");
    } else {

        let cajas = {
            idClient: idBotonActualizar,
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: $("#age").val()
        };

        $.ajax({
            url: "http://129.146.169.251:8080/api/Client/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {

                alert("Se han actualizado los datos del cliente");
                window.location.reload();
            }

        });
    }
}

function deleteCliente(idClient) {
    Swal.fire({
        title: '¿Esta seguro de borrar el Cliente?',
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
                idClient: idClient
            };
            $.ajax({
                url: "http://129.146.169.251:8080/api/Client/" + idClient,
                type: "DELETE",
                datatype: "JSON",
                data: JSON.stringify(myData),
                contentType: "application/json",
                success: function (respuesta) {

                    window.location.reload();
                }
            });
            Swal.fire(

                'El Cliente ha sido eliminado',

            )
        }
    })
}

/////////////////////////////////////////////////////
function pintarCliente(respuesta) {
    let myTable = "<Table BORDER=1";
    myTable += "<tr>";
    myTable += "<th>Id</th>";
    myTable += "<th>Email </th>";
    myTable += "<th>Password </th>";
    myTable += "<th>Nombre </th>";
    myTable += "<th>Edad </th>";
    myTable += "<th>Actualizar </th>";
    myTable += "<th>Borrar </th>";

    myTable += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].idClient + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].email + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].password + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].name + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].age + "</td>";
        myTable += "<td> <button onclick='putCliente(" + respuesta[i].idClient + ")' class='flex mx-auto text-white bg-sky-800 border-0 py-2 px-8 focus:outline-none hover:bg-sky-600 rounded text-lg'>Actualizar</button> "
        myTable += "<td> <button onclick='deleteCliente(" + respuesta[i].idClient + ")' class='flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'>Borrar</button> "
        myTable += "</tr>";



    }
    myTable += "</table>";
    $("#resultado2").html(myTable);
}
