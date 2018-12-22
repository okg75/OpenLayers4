/** 地図 */
var __map = null;

function loadMap() {

    // KMLを表示するレイヤーを作成
    var t = Date.now();
    var kmlVector = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'http://192.168.11.5/olsample/sample8_2_1.kml?t=' + t,
            format: new ol.format.KML()
        })
    });

    // マップの作成
    __map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            kmlVector
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([139.87080738157306, 35.707456905345865]),
            zoom: 17
        })
    });
}
