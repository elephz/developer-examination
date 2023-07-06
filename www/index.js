const endpoint = "http://127.0.0.1:3000/api/";

$(document).ready(function () {
  $("#myTable").DataTable({
    ajax: endpoint + "get_item",
    cache: true,
    columns: [
      { data: "name" },
      { data: "price" },
      { data: "quantity" },
      { data: "description" },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="viewFunction('${data._id}')">View</button>
            <button type="button" class="btn btn-outline-primary" onclick="editFunction('${data._id}')">Edit</button>
            `;
        },
      },
    ],
  });
});

function viewFunction(id) {
  $.ajax({
    url: endpoint + "get_item_by_id/" + id,
    method: "GET",
    dataType: "json",
    success: function (response) {
      const { description, name, price, quantity } = response.data;

      const priceBaht = Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(price);

      $("#exampleModal .card-title").text(name);
      $("#exampleModal .card-text").text(description);
      $("#exampleModal .price").text(priceBaht);
      $("#exampleModal .quantity").text(`x${quantity}`);

      $("#exampleModal").modal("show");
    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
}

function resetForm(){
    $(`input[name='name']`).removeClass('is-invalid')
    $(`input[name='price']`).removeClass('is-invalid')
    $(`input[name='quantity']`).removeClass('is-invalid')
    $(`input[name='_id']`).removeClass('is-invalid')
    $(`textarea[name='description']`).removeClass('is-invalid')
}

function editFunction(id) {
  $.ajax({
    url: endpoint + "get_item_by_id/" + id,
    method: "GET",
    dataType: "json",
    success: function (response) {
      const { description, name, price, quantity,_id } = response.data;
      resetForm()
      $(`input[name='name']`).val(name)
      $(`input[name='price']`).val(price)
      $(`input[name='quantity']`).val(quantity)
      $(`input[name='_id']`).val(_id)
      $(`textarea[name='description']`).val(description)

      $("#exampleModalLabel").text("Edit")
      $("button[type='submit']").text("Update")
      $("#exampleModalEdit").modal("show");
    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
}

$('#myForm').submit(function(e) {
    e.preventDefault();

    var values = {};
    let valid = true;
    $.each($('#myForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
        if(field.name != "_id" && (field.value == "" || field.value == 0)) {
            if(field.name == "description") {
                $(`textarea[name='${field.name}']`).addClass("is-invalid")
            } else {
                $(`input[name='${field.name}']`).addClass("is-invalid")
            }

            valid = false 
        }
    });

    if(!valid) {
        return;
    }

    let url = "";

    if(values._id) {
        url = "update_item"
    } else {
        url = "insert_item"
        delete values["_id"]; 
    }

    $.ajax({
        url: endpoint + url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(values),
        success: function(response) {
            $("#exampleModalEdit").modal("hide");

            $('#myTable').DataTable().ajax.reload( null, false )

            $(`input[name='name']`).val("")
            $(`input[name='price']`).val(0)
            $(`input[name='quantity']`).val(0)
            $(`input[name='_id']`).val("")
            $(`textarea[name='description']`).val("")

        },
        error: function(xhr, status, error) {
           console.log({error})
        }
    });
});

$("button#create_new_one").click(function(){
    resetForm()
    $(`input[name='name']`).val("")
    $(`input[name='price']`).val(0)
    $(`input[name='quantity']`).val(0)
    $(`input[name='_id']`).val("")
    $(`textarea[name='description']`).val("")

    $("#exampleModalLabel").text("Create new")
    $("button[type='submit']").text("Create new")
    $("#exampleModalEdit").modal("show");
})

function formChange(attr){
    $(`[name='${attr}']`).removeClass('is-invalid');
}

$("#myForm input").on('input', function() {
    formChange($(this).attr('name'))
});

$("#myForm textarea").on('input', function() {
    formChange($(this).attr('name'))
});

const renderTable = () => {};
