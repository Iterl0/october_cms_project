/*
 * Application
 */

$(document).ready(function () {

    $('#section_4_tab_button_1').click(function () {
        $('.tab_button').removeClass('active_tab');
        $('.tab_content').removeClass('active_tab_content');
        $(this).addClass('active_tab');
        $('#section_4_tab_1').addClass('active_tab_content');
    });
    $('#section_4_tab_button_2').click(function () {
        $('.tab_button').removeClass('active_tab');
        $('.tab_content').removeClass('active_tab_content');
        $(this).addClass('active_tab');
        $('#section_4_tab_2').addClass('active_tab_content');
    });
    $('#section_4_tab_button_3').click(function () {
        $('.tab_button').removeClass('active_tab');
        $('.tab_content').removeClass('active_tab_content');
        $(this).addClass('active_tab');
        $('#section_4_tab_3').addClass('active_tab_content');
    });



    $('.section_5_sider').slick({
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 300,
        fade: true,
        prevArrow: '.section_5_slider_prevArrow',
        nextArrow: '.section_5_slider_nextArrow',
        cssEase: 'linear'
    });

    $('.section_5_sider').on('afterChange', function (event, slick, direction) {

        var currentSlide = $('.section_5_sider').slick('slickCurrentSlide');
        $('.section_5_sider_curent_slide').text(currentSlide + 1);
    });

    $('.section_1_top_left_slider_container').on('afterChange', function (event, slick, direction) {

        var currentSlide2 = $('.section_1_top_left_slider_container').slick('slickCurrentSlide');
        $('.section_1_sider_curent_slide').text(currentSlide2 + 1);
    });



    $('.section_1_bottom_left_bottom_slider_container').slick({
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 300,
        fade: true,
        prevArrow: '.section_1_bottom_left_bottom_slider_prevArrow',
        nextArrow: '.section_1_bottom_left_bottom_slider_nextArrow',
        cssEase: 'linear'
    });

    $('.section_1_bottom_right_slider_container').slick({
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 300,
        fade: true,
        prevArrow: '.section_1_bottom_right_slider_prevArrow',
        nextArrow: '.section_1_bottom_right_slider_nextArrow',
        cssEase: 'linear'
    });

    $('#signUpForm input:checkbox:not(:checked)').click(function () {
        $(this).attr('checked', 'checked');
    });

    $('#signUpForm input:checkbox:checked').click(function () {
        $(this).prop('checked', false);
    })

});
