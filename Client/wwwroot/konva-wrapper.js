window.konvawrap = {
    init: function (element, dotNetRef) {
        window.stage = new Konva.Stage({
            container: 'container', // id of container <div>
            width: 500,
            height: 500
        });
        var textLayer = new Konva.Layer({ id: 'textLayer' });
        var imageLayer = new Konva.Layer({ id: 'imageLayer' });
        window.stage.add(textLayer, imageLayer);
    },
    drawImage: function drawImage(imageBase64) {
        var layer = window.stage.find('#imageLayer');
        var imageObj = new Image();
        imageObj.onload = function () {
            var loadedImage = new Konva.Image({
                image: imageObj,
                x: stage.width() / 2 - 200 / 2,
                y: stage.height() / 2 - 137 / 2,
                width: 200,
                height: 137,
                name: 'image',
                draggable: true
            });

            loadedImage.on('mouseover', function () {
                document.body.style.cursor = 'pointer';
            });
            loadedImage.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });

            layer.add(loadedImage);


            var tr = new Konva.Transformer();
            layer.add(tr);
            tr.nodes([loadedImage]);

            layer.draw();

            window.stage.on('click tap',
                function(e) {
                    if (e.target === stage) {
                        console.log('executing click tap - target = stage');
                        tr.nodes([]);
                        layer.draw();
                        return;
                    }
                    if (e.target.hasName('image')) {
                        console.log('executing click tap - target = image');
                        tr.nodes([e.target]);
                        layer.draw();
                        return;
                    }
                });
        }
        imageObj.src = imageBase64;
    },
    addText: function(id, text) {
        var layer = window.stage.find('#textLayer');
        var simpleText = new Konva.Text({
            x: 15,
            y: 15,
            text: text,
            fontSize: 16,
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
    }
}