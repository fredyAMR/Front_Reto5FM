///////////////////GET, POST, PUT Y DELETE

function getReservaciones() {
    $.ajax({
        url: "http://129.146.169.251:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarReservation(respuesta);
        }
    });

}
function pintarReservation(respuesta) {
    let myTable = "<Table BORDER=1";
    myTable += "<tr>";
    myTable += "<th> Fecha de inicio de la reserva </th>";
    myTable += "<th> Fecha de devolucion de la reserva  </th>";
    myTable += "<th>Status </th>";
    myTable += "<th>Cliente </th>";
    myTable += "<th>Herramienta </th>";
    myTable += "<th>Actualizar </th>";
    myTable += "<th>Borrar </th>";

    myTable += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].startDate + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].status + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].client.name + "</td>";
        myTable += "<td class='text-sm font-medium text-black px-6 py-4 hover:bg-gray-100'>" + respuesta[i].tool.name + "</td>";
        myTable += "<td> <button onclick='putReservaciones(" + respuesta[i].idReservation + ")' class='flex mx-auto text-white bg-sky-800 border-0 py-2 px-8 focus:outline-none hover:bg-sky-600 rounded text-lg'>Actualizar</button> "
        myTable += "<td> <button onclick='deleteReservaciones(" + respuesta[i].idReservation + ")' class='flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'>Borrar</button> "

        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultado4").html(myTable);
}
function postReservaciones() {

    if ($("#startDate").val().length == 0 ||
        $("#devolutionDate").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {

        let cajas = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            client: { idClient: +$("#select-client").val() },
            tool: { id: +$("#select-tool").val() },
        };
        console.log(cajas);

        $.ajax({
            url: "http://129.146.169.251:8080/api/Reservation/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("Se creo correctamente la reservacion");
                window.location.reload();
            }
        });
    }

}
function putReservaciones(idBotonActualizar) {
    if ($("#startDate").val().length == 0 ||
        $("#devolutionDate").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {

        let cajas = {
            idReservation: idBotonActualizar,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            client: { idClient: +$("#select-client").val() },
            tool: { id: +$("#select-tool").val() }
        };


        $.ajax({
            url: "http://129.146.169.251:8080/api/Reservation/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {

                alert("Se han actualizado los datos de la reservacion");
                window.location.reload();
            }

        });
    }

}
function deleteReservaciones() {
    Swal.fire({
        title: '¿Esta seguro de borrar la reservacion?',
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
                idReservation: idReservation
            };
            $.ajax({
                url: "http://129.146.169.251:8080/api/Reservation/" + idReservation,
                type: "DELETE",
                datatype: "JSON",
                data: JSON.stringify(myData),
                contentType: "application/json",
                success: function (respuesta) {

                    window.location.reload();
                }
            });
            Swal.fire(

                'La reservacion ha sido eliminada',

            )
        }
    })



}
function getTool_Reservaciones() {
    $.ajax({
        url: "http://129.146.169.251:8080/api/Tool/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            let $select = $("#select-tool");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
            })
        }
    });

}
function getClient_Reservaciones() {
    $.ajax({
        url: "http://129.146.169.251:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
            })
        }
    });
}
