
(function gameScopeWrapper($) {
    function createGame(data) {
        jQuery.ajax({
            type: 'POST',
            url: 'https://ewvxfhniaa.execute-api.eu-west-2.amazonaws.com/dev/game',
            async: false,
            contentType: "application/json",  // this is the content type sent from client to server
            cache: false,
            data:data,
            timeout: 5000,
            success: function (data) {
                alert("success");
                console.log(data);
                $('#gameStart').attr('action', "players_signup.html?game=" + data.replace("game:", ""))
            },
            error: function (jqXHR, textStatus, errorThrown) {
                   alert('error ' + textStatus + " " + errorThrown);
            }
        });
    }

    function loadGameInfo() {
        var gameId = "1521561896964";
        jQuery.ajax({
            type: 'GET',
            url: 'https://ewvxfhniaa.execute-api.eu-west-2.amazonaws.com/dev/game/' + gameId ,
            async: false,
            cache: false,
            timeout: 5000,
            dataType: "jsonp",
            success: function (data) {
                alert("success");
                console.log(data);
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
        $('#gameStart').submit(handleCreate);
    });
    $(document).ready(function() {
        loadGameInfo();
    });



    function handleCreate(event) {
        var gameName = $('#name').val();
        data = JSON.stringify({
                name: name
        }),
        console.log(data)
        createGame(data);
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
