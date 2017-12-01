function loadTemplate(url, callback) {
    $j.get(url, function(data) {
        var parsed = $j.parseHTML(data);
        $j.each(parsed, function(index, ele) {
            if(ele.nodeName === 'DIV')
            {
                var element = $j(ele);
                callback(element);
            }
        });
    });

}