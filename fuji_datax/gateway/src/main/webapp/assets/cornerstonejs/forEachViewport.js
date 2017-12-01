function forEachViewport(callback) {
    var elements = $j('.viewport');
    $j.each(elements, function(index, value) {
        var element = value;
        try {
            callback(element);
        }
        catch(e) {

        }
    });
}