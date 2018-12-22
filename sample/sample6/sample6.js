/** 地図 */
var __map = null;
/** マーカーをプロットするためのレイヤー */
var __markerLayer = null;
/** ポリゴンを描画するためのレイヤー */
var __polygonLayer = null;
/** 緯度経度一時保存用の配列 */
var __tmpCoordinates = [];
/** 記録中であるか否か */
var __isRecording = false;
/** 緯度経度保存用配列 */
var __coordinates = [];

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

    // マーカーを載せるためのレイヤーを作成する
    __markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    __map.addLayer(__markerLayer);

    // ポリゴンを表示するレイヤーを作成する
    __polygonLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#000000', width: 5 }),
            fill: new ol.style.Fill({ color: [0, 0, 0, 0.5] })
        })
    });
    __map.addLayer(__polygonLayer);

    // マップをクリックした時のアクションを設定
    __map.on('click', onClick);
}

function onClick(evt) {

    // 記録中でない場合は無視する
    if (!__isRecording) {
        return;
    }

    // クリックした場所の座標を取得
    var coordinate = evt.coordinate;

    var epsg4326Coord = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
    __coordinates.push(epsg4326Coord);
    plotMarker(epsg4326Coord[0], epsg4326Coord[1]);
}

/**
 * マーカーを地図にプロットする
 * @param {Number} lon 
 * @param {Number} lat 
 */
function plotMarker(lon, lat) {
    // 地物オブジェクトを作成
    var feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
    });

    // マーカーのスタイルを設定
    var style = new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/icon.png',
            anchor: [0.5, 1.0],
            scale: 0.3
        })
    });
    feature.setStyle(style);
    feature.setId(lon);

    // 地物を追加する
    __markerLayer.getSource().addFeature(feature);
}

/**
 * 記録を開始する
 */
function startRecord() {
    __isRecording = true;
    __coordinates = [];
    setMessage('記録中です');
}

/**
 * ポリゴンを作成する
 */
function makePolygon() {

    // 3点以上ないとポリゴンが作れないのでエラー
    if (__coordinates.length < 3) {
        setMessage('2点以上選択してください');
        return;
    }

    __isRecording = false;

    // ポリゴンを作るにあたって, 最初に選択した座標と
    // 最後に選択した座標を繋いでくれるよう, 先頭の座標をお尻に追加する
    __coordinates.push(__coordinates[0]);
    var coord = [];
    coord.push(__coordinates);

    console.log(coord);

    // ジオメトリの作成
    var polygon = new ol.geom.Polygon([]);
    polygon.setCoordinates(coord);

    // 地物オブジェクトの作成　〜　レイヤーの作成
    var feature = new ol.Feature(
        polygon.transform('EPSG:4326', 'EPSG:3857')
    );

    __polygonLayer.getSource().addFeature(feature);
    __markerLayer.getSource().clear();

    setMessage('ポリゴンを描画しました');
}

/**
 * ポリラインを作成する
 */
function makePolyline() {

    __isRecording = false;

    // ポリラインの作成
    var lineString = new ol.geom.LineString([]);
    lineString.setCoordinates(__coordinates);

    var feature = new ol.Feature(
        lineString.transform('EPSG:4326', 'EPSG:3857')
    );
    __polygonLayer.getSource().addFeature(feature);
    __markerLayer.getSource().clear();
    setMessage('ポリラインを描画しました');
}

/**
 * 地図上の地物を削除する
 */
function clearPolygon() {
    __polygonLayer.getSource().clear();
    __markerLayer.getSource().clear();
    setMessage('地図をクリアしました');
}

/**
 * メッセージを表示する
 * @param {String} message 
 */
function setMessage(message) {
    document.getElementById('label').innerHTML = message;
}
