/** 地図 */
var __map = null;

// 沖縄 
// 北海道　

function loadMap() {

    // マップの作成
    __map = new ol.Map({
        target: 'map',
        // ここでスケールラインを設定
        controls: ol.control.defaults({
            attributionOptions: {
                collapsible: false
            }
        }).extend([
            new ol.control.ScaleLine()
        ]),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([139.745433, 35.658581]),
            zoom: 15
        })
    });
}

function move(name) {
    switch (name) {
        case "Hokkaido":
            __map.getView().setCenter(new ol.proj.fromLonLat([141.6135636, 42.8156016]));
            break;
        case "Okinawa":
            __map.getView().setCenter(new ol.proj.fromLonLat([127.6443535, 26.2064033]));
            break;
    }
}
