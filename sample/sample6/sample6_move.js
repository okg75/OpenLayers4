var __map = null;

function loadMap() {
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

    // マップをクリックした時のアクションを設定
    __map.on('movestart', moveStart);
    __map.on('moveend', moveEnd);
}

/**
 * 移動を開始したときに呼び出す
 * @param {*} evt ol.MapEvent
 */
function moveStart(evt) {
    document.getElementById('latitude').innerHTML = '?????';
    document.getElementById('longitude').innerHTML = '?????';
}

/**
 * 移動を終了したときに呼び出す
 * @param {*} evt ol.MapEvent
 */
function moveEnd(evt) {
    // 移動が終了した時の地図の中心点を取得する
    var coordinate = evt.map.getView().getCenter();
    document.getElementById('latitude').innerHTML = coordinate[1];
    document.getElementById('longitude').innerHTML = coordinate[0];
}


