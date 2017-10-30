// Tab Switching
$(".tabs a").click(function(){
    var $p = $(this).parent();
    $p.find('a').removeClass('active');
    $p.find('code').hide();
    $p.find('code.tab-' + $(this).text().toLowerCase()).css('display', 'block');
    $(this).addClass('active');
});