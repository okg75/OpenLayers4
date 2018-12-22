var __map = null;
var __markerLayer = null;

function loadMap() {
    try {

        // 1.1 =================
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
                zoom: 17
            })
        });

        // 1.2 ==================

        // 地物オブジェクトを作成
        var feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([139.745433, 35.658581]))
        });

        // マーカーの見た目の作成
        var style = new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/icon.png',
                anchor: [0.5, 1.0],
                scale: 0.4
            })
        });
        feature.setStyle(style);

        // 地物をのせるベクターを作成する
        var vectorSource = new ol.source.Vector({
            features: [feature]
        })

        // 表示するためのレイヤーを作成する
        __markerLayer = new ol.layer.Vector({
            source: vectorSource
        });

        // マップに地物を乗せたレイヤーを追加
        __map.addLayer(__markerLayer);
    } catch (e) {
        console.log(e);
    }
}
