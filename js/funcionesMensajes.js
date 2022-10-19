function getMensajes() {

    $.ajax({
        url: "http://129.146.169.251:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarMensaje(respuesta);
        }
    });
}

function pintarMensaje(respuesta) {
    let myTable = "<Table BORDER=1";
    myTable += "<tr>";
    myTable += "<th>Id</th>";
    myTable += "<th>Mensaje</th>";
    myTable += "<th>Actualizar </th>";
    myTable += "<th>Borrar </th>";

    myTable += "</tr>";
    for (i = 0; i < respuesta.length; i++) {

        myTable += "<tr>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].idMessage + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].messageText + "</td>";
        myTable += "<td> <button onclick='putMensaje(" + respuesta[i].idMessage + ")' class='flex mx-auto text-white bg-sky-800 border-0 py-2 px-8 focus:outline-none hover:bg-sky-600 rounded text-lg'>Actualizar</button> "
        myTable += "<td> <button onclick='deleteMensaje(" + respuesta[i].idMessage + ")' class='flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'>Borrar</button> "
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado9").html(myTable);
}


function postMensaje() {

    let cajas = {
        idMessage: $("#idMessage").val(),
        messageText: $("#messageText").val()
    };

    $.ajax({
        url: "http://129.146.169.251:8080/api/Message/save",
        type: "POST",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success: function (respuesta) {
            alert("Se ha guardado el mensaje");
            window.location.reload();
        }

    });

}

function putMensaje(idBotonActualizar) {
    let cajas = {
        idMessage: idBotonActualizar,
        messageText: $("#messageText").val()
    };

    $.ajax({
        url: "http://129.146.169.251:8080/api/Message/update",
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success: function (respuesta) {
            alert("Se ha actualizado el mensaje");
            window.location.reload();
        }

    });

}

function deleteMensaje(idMessage) {
    Swal.fire({
        title: '¿Esta seguro de borrar el Mensaje?',
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
                idMessage: idMessage
            };
            $.ajax({
                url: "http://129.146.169.251:8080/api/Message/" + idMessage,
                type: "DELETE",
                datatype: "JSON",
                data: JSON.stringify(myData),
                contentType: "application/json",
                success: function (respuesta) {

                    window.location.reload();
                }
            });
            Swal.fire(

                'El Mensaje ha sido eliminado',

            )
        }
    })

}

