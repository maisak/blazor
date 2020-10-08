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
                draggable: true,
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

            var selectionRectangle = new Konva.Rect({
                fill: 'rgba(0,0,255,0.5)'
            });
            layer.add(selectionRectangle);

            var x1, y1, x2, y2;
            stage.on('mousedown touchstart', (e) => {
                // do nothing if we mousedown on eny shape
                if (e.target !== stage) {
                    return;
                }
                x1 = stage.getPointerPosition().x;
                y1 = stage.getPointerPosition().y;
                x2 = stage.getPointerPosition().x;
                y2 = stage.getPointerPosition().y;

                selectionRectangle.visible(true);
                selectionRectangle.width(0);
                selectionRectangle.height(0);
                layer.draw();
            });

            stage.on('mousemove touchmove', () => {
                // no nothing if we didn't start selection
                if (!selectionRectangle.visible()) {
                    return;
                }
                x2 = stage.getPointerPosition().x;
                y2 = stage.getPointerPosition().y;

                selectionRectangle.setAttrs({
                    x: Math.min(x1, x2),
                    y: Math.min(y1, y2),
                    width: Math.abs(x2 - x1),
                    height: Math.abs(y2 - y1),
                });
                layer.batchDraw();
            });

            stage.on('mouseup touchend', () => {
                // no nothing if we didn't start selection
                if (!selectionRectangle.visible()) {
                    return;
                }
                // update visibility in timeout, so we can check it in click event
                setTimeout(() => {
                    selectionRectangle.visible(false);
                    layer.batchDraw();
                });

                var shapes = stage.find('.image').toArray();
                var box = selectionRectangle.getClientRect();
                var selected = shapes.filter((shape) =>
                    Konva.Util.haveIntersection(box, shape.getClientRect())
                );
                tr.nodes(selected);
                layer.batchDraw();
            });

            stage.on('click tap',
                function (e) {
                    // if we are selecting with rect, do nothing
                    if (selectionRectangle.visible()) {
                        return;
                    }

                    // if click on empty area - remove all selections
                    if (e.target === stage) {
                        tr.nodes([]);
                        layer.draw();
                        return;
                    }

                    // do nothing if clicked NOT on our rectangles
                    if (!e.target.hasName('image')) {
                        return;
                    }

                    // do we pressed shift or ctrl?
                    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
                    const isSelected = tr.nodes().indexOf(e.target) >= 0;

                    if (!metaPressed && !isSelected) {
                        // if no key pressed and the node is not selected
                        // select just one
                        tr.nodes([e.target]);
                    } else if (metaPressed && isSelected) {
                        // if we pressed keys and node was selected
                        // we need to remove it from selection:
                        const nodes = tr.nodes().slice(); // use slice to have new copy of array
                        // remove node from array
                        nodes.splice(nodes.indexOf(e.target), 1);
                        tr.nodes(nodes);
                    } else if (metaPressed && !isSelected) {
                        // add the node into selection
                        const nodes = tr.nodes().concat([e.target]);
                        tr.nodes(nodes);
                    }
                    layer.draw();
                });

        }
        imageObj.src = imageBase64;
    }
}