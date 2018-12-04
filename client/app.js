

$(document).ready(() => {
    $.ajax({
        type: 'GET',
        url: '/api/chirps',
        dataType: 'html'
    }).then(res => JSON.parse(res))
        .then(data => {
            Object.keys(data).map((key) => {
                let chirpArray = (data[key])
                if(key === 'nextid') return;
                console.log(chirpArray)
                let card = [
                    `<div class="card">
                        <div class="card-body">
                            <button type="button" class="btn btn-danger">X</button>
                            <h5 class="card-title">${chirpArray.user}</h5>
                            <p class="card-text">${chirpArray.chirp}</p>
                            <footer class="blockquote-footer">${key}</footer>
                        </div>
                    </div>`
                ]
                $('.chirps').append(card)
            })
        })

});

$('button').click(() => {
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
    .then(data => {
        let card = [
            `<div class="card">
                <div class="card-body">
                    <h5 class="card-title">${data.chirpObject.user}</h5>
                    <p class="card-text">${data.chirpObject.chirp}</p>
                </div>
            </div>`
        ]
        $('.chirps').append(card)
    })
})

