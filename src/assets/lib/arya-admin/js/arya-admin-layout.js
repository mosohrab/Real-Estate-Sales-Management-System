
function showPage() {
    var page = location.hash;
    if (page) {
        page = page.replace('#', "");
        $.get(page, function (res) {
            $("#aa-main").html('').html(res);
        });
    }
}
$(function () {
    $('.aa-collapse').click(function (e) {
        e.preventDefault();
        $('.aa-collapse').parent().removeClass('active');
        var $li = $(this).parent();
        $li.addClass('aa-link-active');
        var $sing = $li.find(".aa-collapse-sign").find('em');
        if ($li.hasClass('aa-link-open')) {
            $li.removeClass('aa-link-open');
            $li.find('ul').hide();
            $sing.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        }
        else {
            $li.addClass('aa-link-open');
            $li.find('ul').show();
            $sing.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
        }
    });
    //
    window.onhashchange = showPage;
    //
    if (location.hash)
        showPage();
});
//# sourceMappingURL=arya-admin-layout.js.map