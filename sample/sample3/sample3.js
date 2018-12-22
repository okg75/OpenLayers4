var __map = null;

// 浜松町〜東京タワーの道のりを表す座標の配列
var coordinates = [
    [139.75655240134424, 35.6553463380788],
    [139.75648388462506, 35.65504941783402],
    [139.75593575087174, 35.65512364799868],
    [139.75573020071425, 35.654585477741634],
    [139.7550450335226, 35.65467826597572],
    [139.7544512219565, 35.65473393886441],
    [139.75390308820317, 35.65482672692599],
    [139.75349198788817, 35.65477105410197],
    [139.75305804866682, 35.65484528452539],
    [139.752715465071, 35.65491951487979],
    [139.75280682069655, 35.65696082259022],
    [139.75040873552575, 35.65722062164694],
    [139.75040361339467, 35.65783126326163],
    [139.74689841726482, 35.65818210512349],
    [139.74705081709652, 35.65853294544405],
    [139.74578081849876, 35.659007609306684]
]

function loadMap() {
    try {

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
                zoom: 16
            })
        });

        // ポリラインを載せるためのレイヤーを作成する
        __polylineLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        __map.addLayer(__polylineLayer);

        // ポリラインを描く
        drawPolyilne();

    } catch (e) {
        console.log(e);
    }
}

/**
 * ポリラインを描画する
 */
function drawPolyilne() {
    // ジオメトリの作成
    var lineStrings = new ol.geom.LineString([]);
    lineStrings.setCoordinates(coordinates);

    // 地物オブジェクトの作成　〜　レイヤーの作成
    var feature = new ol.Feature(
        lineStrings.transform('EPSG:4326', 'EPSG:3857')
    );
    feature.setId('tokyotower');

    var vector = new ol.source.Vector({
        features: [feature]
    });
    var routeLayer = new ol.layer.Vector({
        source: vector,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#ff33ff', width: 10 })
        })
    });

    // 作成したポリラインをレイヤーにのせる
    __map.addLayer(routeLayer);
}


