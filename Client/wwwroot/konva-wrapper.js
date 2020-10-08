window.konvawrap = {
    init: function (element, dotNetRef) {
        // first we need to create a stage
        window.stage = new Konva.Stage({
            container: 'container', // id of container <div>
            width: 500,
            height: 500
        });
        console.log("init done");
        console.log(konvawrap.stage);
    },

    drawCircle: function () {
        // then create layer
        var layer = new Konva.Layer();

        // create our shape
        var circle = new Konva.Circle({
            x: window.stage.width() / 2,
            y: window.stage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        // add the shape to the layer
        layer.add(circle);

        // add the layer to the stage
        window.stage.add(layer);

        // draw the image
        layer.draw();
    },
    drawImage: function drawImage(imageBase64) {
        var layer = new Konva.Layer();
        window.stage.add(layer);

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
    }
}