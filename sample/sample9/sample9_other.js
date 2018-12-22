
function sample() {

    var feature = new ol.Feature({
        geometry: new ol.geom.Point([139.81415964241077, 35.696744768326155]),
        name: '錦糸町駅',
        // ・・・・
    });

    map.on('click', function (evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature) {
                return feature;
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            var element = __overlay.getElement();
            element.innerHTML = feature.get('name');
            __overlay.setPosition(event.coordinates);
            __map.addOverlay(__overlay);
        } else {
            __map.removeOverlay(__overlay);
        }
    });
}