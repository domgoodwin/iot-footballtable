
(function gameScopeWrapper($) {
    function createUser(data) {
        jQuery.ajax({
            type: 'POST',
            url: 'https://ewvxfhniaa.execute-api.eu-west-2.amazonaws.com/dev/user',
            async: false,
            contentType: "application/json",  // this is the content type sent from client to server
            cache: false,
            data:JSON.stringify(data),
            timeout: 5000,
            success: function (rData) {
                console.log("hello");
                window.location.replace("game_info.html?game=" + data.game)
                alert("success");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                   alert('error ' + textStatus + " " + errorThrown);
            }
        });
    }

    function completeRequest(result) {
        var unicorn;
        var pronoun;
        console.log('Response received from API: ', result);
        // result has response message
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#registrationBtn').click(handleRegister);

        //displayUpdate('Failure');

    });


    function handleRegister(event) {
        var email = $('#email').val();
        var name = $('#name').val();
        var twitter = $('#twitter').val();
        var player = $('#player').val();
        var gameId = $('#game-id').val();
        data = {
                email: email,
                name: name,
                twitter: twitter,
                game: gameId,
                player: player
        },
        console.log(data)
        createUser(data);
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
