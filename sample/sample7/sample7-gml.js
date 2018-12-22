var __map = null;

function loadMap() {

    // 国土数値情報を表示するためのレイヤーの作成
    var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'http://192.168.3.10/gmlsample.xml',
            format: new ol.format.GML()
        })
    });

    // マップの作成
    __map = new ol.Map({
        target: 'map',
        layers: [
            vector,
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
