/** 地図 */
var __map = null;
/** マーカーをプロットするためのレイヤー */
var __markerLayer = null;
/** ポップアップを表示するためのレイヤー */
var __overlay = null;
/** 施設の位置情報 */
var facilities = [
    {
        name: '江戸川区役所',
        address: '東京都江戸川区中央1-4-1',
        coordinate: [139.868427, 35.706665],
        discription: "月〜金　8:30〜17:00"
    },
    {
        name: '江戸川保健所中央健康サポートセンター',
        address: '東京都江戸川区中央4-24−19',
        coordinate: [139.868285, 35.709729],
        discription: "月〜金　8:30〜17:00"
    }
];

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
            center: ol.proj.fromLonLat([139.868427, 35.706665]),
            zoom: 17
        })
    });

    // マーカーを載せるためのレイヤーを作成する
    __markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    __map.addLayer(__markerLayer);

    // ポップアップを表示するためのオーバーレイを作成する
    __overlay = new ol.Overlay({
        element: document.getElementById('popup'),
        positioning: 'bottom-center'
    });

    // マーカーをレイヤーにプロットする
    for (i in facilities) {
        // 地物オブジェクトを作成
        var info = facilities[i];
        var feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(info.coordinate))
        });
        feature.information = info;

        // マーカーのスタイルを設定
        var style = new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/facility.png',
                anchor: [0.5, 1.0],
                scale: 0.8
            })
        });
        feature.setStyle(style);

        // 地物を追加する
        __markerLayer.getSource().addFeature(feature);
    }

    // 地図のクリックイベントを設定
    __map.on('click', function (evt) {
        var feature = __map.forEachFeatureAtPixel(evt.pixel,
            function (feature) {
                return feature;
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            var info = feature.information;
            var element = __overlay.getElement();
            var descriptionHTML =
                "<div>" + info.name + "</div>" +
                "<div>" + info.address + "</div>" +
                "<div>" + info.discription + "</div>";
            element.innerHTML = descriptionHTML;
            __overlay.setPosition(coordinates);
            __map.addOverlay(__overlay);
        } else {
            __map.removeOverlay(__overlay);
        }
    });
}
