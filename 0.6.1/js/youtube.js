// Load Videos in the Docs
// $(document).ready(function() {
//     $('img[alt="YOUTUBE"]').each(function() {
//         var id = $(this).attr('src').split('/')[$(this).attr('src').split('/').length - 1];
//         var video = '<iframe style="width:;height: 450px;" src="https://www.youtube.com/embed/' + id + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
//         $(this).replaceWith(video);
//     });
// });

// Load Videos in the Docs
$(document).ready(function() {
    $('img[alt="YOUTUBE"]').each(function() {
        var id = $(this).attr('src').split('/')[$(this).attr('src').split('/').length - 1];
        var video = '<iframe title="YouTube video player" width="560" height="320" src="https://www.youtube.com/embed/' + id + '?controls=1" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        $(this).replaceWith(video);
    });
});

// Open external links in new window
$(document.links).filter(function() {
    return this.hostname != window.location.hostname;
}).attr('target', '_blank');