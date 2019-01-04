import { vec3 } from 'gl-matrix';
import * as dat from 'dat.gui';

const DEFAULT_COLOR = vec3.set(vec3.create(), 1, 1, 1);

export = function (regl) {

    class GuiData {
        public red = .2;
        public green = .2;
        public blue = .2;

        public size = 8;
    }

    const data = new GuiData();
    const gui = new dat.GUI();
    gui.add(data, 'red', 0, 1);
    gui.add(data, 'green', 0, 1);
    gui.add(data, 'blue', 0, 1);
    gui.add(data, 'size', 0, 50);

    const drawPoint = regl({
        frag: `
        precision mediump float;
        uniform lowp vec3 color;
        void main () {
            if (length(gl_PointCoord.xy - 0.5) > 0.45) {
                discard;
            }
            vec2 toCenter = (gl_PointCoord.xy - 0.5) * 2.0;
            float len = length(toCenter);
            float a = 1.0 - len;
            gl_FragColor = vec4(color.rgb, a);
        }`,

        vert: `
        precision mediump float;
        uniform mat4 projection, view;
        attribute float p;
        uniform vec3 point;
        uniform float radius;
        uniform vec3 eye;
        void main () {
            vec4 viewPosition = view * vec4(point, 1.0);
            float disScale = 1. / length(vec3(viewPosition));
            gl_PointSize = radius * disScale;
            gl_Position = projection * viewPosition;
        }`,

        uniforms: {
            'point': regl.prop('point'),
            'radius': ({ pixelRatio }, { radius }) => pixelRatio * radius,
            'color': regl.prop('color'),
        },

        attributes: {
            p: [ 1 ],
        },
        count: 1,
        primitive: 'points',
        offset: 0,
    });

    return function (point:vec3) {
        drawPoint({
            point,
            radius: data.size,
            color: vec3.set(vec3.create(), data.red, data.green, data.blue),
        });
    };
};