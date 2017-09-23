$(document).ready(function () {

    $('#generate').click(function () {
        $('#exports').slideDown();
        new Clipboard('#copy');

        $.ajax({
            type: 'GET',
            url: '/generate?quantity=' + $("#quantity").val(),
            contentType: 'application/json',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var container = $("#randomWords");
                container.text('');
                var randomWords = res.randomWords;
                var wordsTable = '<table style="border-collapse: separate; border-spacing: 40px 4px;"><thead></thead><tbody>';
                wordsTable += "<tr>";
                for (var i = 0; i < randomWords.length; i++) {
                    if (i % 5 !== 0 || i === 0) {
                        wordsTable += "<td>" + randomWords[i] + "</td>";
                    }
                    else {
                        wordsTable += "</tr><tr><td>" + randomWords[i] + "</td>";
                    }

                    if (i === randomWords.length - 1) {
                        wordsTable += "</tr>";
                    }
                }
                wordsTable += "</tbody></table>";
                container.html(wordsTable);
                $('#words').removeAttr('hidden');
            },
            error: function (res) {
                console.log('error');
                console.log(res);
                $("#randomWords").text('');
            }
        });
    });

});