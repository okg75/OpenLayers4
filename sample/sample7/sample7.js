/** 地図 */
var __map = null;

function loadMap() {

    // 国土地理院標準マップ 表示レイヤーの作成
    var __stdLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'
        })
    });

    // マップの作成
    __map = new ol.Map({
        target: 'map',
        layers: [
            __stdLayer
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([139.745433, 35.658581]),
            zoom: 15
        })
    });
}
