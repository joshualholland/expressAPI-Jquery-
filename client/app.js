
const displayChirps = (data) => {
    let chirpArray = Object.keys(data).map((key) => {
        return {
            id: key,
            user: data[key].user,
            chirp: data[key].chirp
        }
    })

    chirpArray.pop();
    chirpArray.reverse();
    chirpArray.forEach(chirp => {
        let card = [
            `<div class="card">
                <div class="card-body">
                    <h5 class="card-title" id="chirpUser">${chirp.user}</h5>
                    <p class="card-text">${chirp.chirp}</p>
                    <h6 class="card-subtitle mb-2 text-muted editChirp" id="${chirp.id}">${chirp.id}</h6>
                    <button type="button" class="btn btn-danger btn-sm" id="delete-chirp" onclick="deleteChirp(${chirp.id})">X</button>
                    <button type="button" class="btn btn-secondary btn-sm" id="edit-chirp" data-toggle="modal" data-target="#chirpModal" onclick="editChirp(${chirp.id})">Edit</button>
                </div>
            </div>`
        ]
        $('.chirps').append(card)
    })
}

$(document).ready(() => {
    $.ajax({
        type: 'GET',
        url: '/api/chirps',
        dataType: 'html'
    }).then(res => JSON.parse(res))
        .then(data => displayChirps(data))
});

$('#newChirp').click(() => {
    let user = $('#user').val();
    let chirp = $('#chirp').val();
    let chirpObject = {
        user,
        chirp
    }
    $.ajax({
        type: 'POST',
        url: '/api/chirps',
        data: chirpObject,
        dataType: 'html'
    }).then(res => JSON.parse(res))
        .then(data => displayChirps(data))
    location.reload();
})

const deleteChirp = (id) => {
    $.ajax({
        type: 'DELETE',
        url: `/api/chirps/${id}`
    })
        .then(res => JSON.parse(res))
        .then(data => displayChirps(data))
    location.reload();
};

const editChirp = (id) => {
    $('#exampleModalLabel').text(`Edit Chirp: ${id}`);
    $.get(`/api/chirps/${id}`)
        .then(data => {
            $('#editText').val(data.chirp);
            $('#confirm-edit').click(() => {
                let chirpObject = {
                    id: id,
                    user: data.user,
                    chirp: $('#editText').val()
                }
                $.ajax({
                    type: 'PUT',
                    url: `/api/chirps/${id}`,
                    data: chirpObject,
                })
                    .then(location.reload())
            });
        })
}



