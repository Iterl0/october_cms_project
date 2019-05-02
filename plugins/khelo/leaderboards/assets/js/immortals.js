$(document).ready(function () {

    var immortalsArr = [objHadesLeaderboard, objAresLeaderboard, objApolloLeaderboard];

    immortalsArr.forEach(function (leaderboard, i) {
        var tab = (i === 0) ? '#section_4_tab_1' : i === 1 ? '#section_4_tab_2' : i === 2 ? '#section_4_tab_3' : null;

        if (tab === undefined || tab == null) return;

        leaderboard.forEach(function (el) {
            if (el.username === '-') return;
            $(tab).append(
                '<div class="section_4_table_row">\n' +
                '  <div class="section_4_table_column_1">'+ el.rank +'</div>\n' +
                '  <div class="section_4_table_column_2">'+ el.username +'</div>\n' +
                '  <div class="section_4_table_column_3">'+ el.points +'</div>\n' +
                '  <div class="section_4_table_column_4">'+ el.prize +'</div>\n' +
                '</div>')
        });
    })

});