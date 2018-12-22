/** 地図 */
var __map = null;
/** 吹き出しを表示するオーバーレイ */
var __overlay = null;

function loadMap() {

    // マップの作成
    __map = new ol.Map({
        target: 'map',
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

    // マーカーを載せるためのオーバーレイを作成する
    __overlay = new ol.Overlay({
        element: document.getElementById('popup'),
        positioning: 'bottom-center'
    });

    // Mapをクリックしたら緯度経度をポップアップで表示する
    __map.on('click', function (event) {
        var coord = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        var element = __overlay.getElement();
        element.innerHTML = '緯度：' + coord[1] + '\n\n経度：' + coord[0];
        __overlay.setPosition(event.coordinate);
        __map.addOverlay(__overlay);
    });
}