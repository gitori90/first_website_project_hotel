mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

$(function () {
    var now = new Date(),
        week = [now, new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6, 23, 59)];

    $('#demo').mobiscroll().range({
        startInput: '#start',
        endInput: '#end'
    });

    $('#date').mobiscroll().range({
        startInput: '#startDate',
        endInput: '#endDate',
        controls: ['date']
    });

    $('#demo-non-form').mobiscroll().range({
        showSelector: false
    });

    $('#demo-external').mobiscroll().range({
        showOnTap: false,
        showOnFocus: false,
        showSelector: false,
        onInit: function (event, inst) {
            inst.setVal(week, true);
        }
    });

    $('#show').click(function () {
        $('#demo-external').mobiscroll('show');
        return false;
    });

});
