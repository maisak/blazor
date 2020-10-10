window.konvawrap = {
    stageWidth: 500,
    stageHeight: 500,
    init: function (element, dotNetRef) {
        window.stage = new Konva.Stage({
            container: 'canvasContainer',
            width: konvawrap.stageWidth,
            height: konvawrap.stageHeight
        });
        var textLayer = new Konva.Layer({ id: 'textLayer' });
        var imageLayer = new Konva.Layer({ id: 'imageLayer' });
        window.stage.add(textLayer, imageLayer);
        konvawrap.fitStageIntoParentContainer();
        window.addEventListener('resize', konvawrap.fitStageIntoParentContainer);
    },
    drawImage: function drawImage(imageBase64) {
        var layer = window.stage.find('#imageLayer');
        var imageObj = new Image();
        imageObj.onload = function () {
            var loadedImage = new Konva.Image({
                image: imageObj,
                x: 10,//stage.width() / 2 - 200 / 2,
                y: 10, //stage.height() / 2 - 137 / 2,
                name: 'image',
                draggable: true
            });
            layer.add(loadedImage);
            konvawrap.configureImage(loadedImage, layer);
        }
        imageObj.src = imageBase64;
    },
    addText: function(id, text) {
        var layer = window.stage.find('#textLayer');
        var simpleText = new Konva.Text({
            x: 15,
            y: 15,
            text: text,
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'red',
            id: id,
            draggable: true
        });
        layer.add(simpleText);
        layer.draw();
    },
    updateText: function(id, text) {
        var layer = window.stage.find('#textLayer');
        var textItem = window.stage.find('#' + id);
        textItem.text(text);
        layer.draw();
    },
    configureImage: function (loadedImage, layer) {
        loadedImage.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        loadedImage.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });
        var tr = new Konva.Transformer({
            nodes: [loadedImage],
            keepRatio: true
        });
        layer.add(tr);
        layer.draw();
        window.stage.on('click tap',
            function (e) {
                if (e.target === stage) {
                    tr.nodes([]);
                    layer.draw();
                    return;
                }
                if (e.target.hasName('image')) {
                    tr.nodes([e.target]);
                    layer.draw();
                    return;
                }
            });
    },
    fitStageIntoParentContainer: function () {
        var container = document.querySelector('#stage-parent');
        var containerWidth = container.offsetWidth;
        var scale = containerWidth / konvawrap.stageWidth;
        stage.width(konvawrap.stageWidth * scale);
        stage.height(konvawrap.stageHeight * scale);
        stage.scale({ x: scale, y: scale });
        stage.draw();
    }
}