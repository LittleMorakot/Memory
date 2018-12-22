import { vec3, mat4 } from 'gl-matrix';

export = function (regl) {
    return regl({
        frag: `
        precision mediump float;
        void main() {
            gl_FragColor = vec4(.3, .6, .7, 1.);
        }`,

        vert: `
        precision mediump float;
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0, 1);
        }`,

        uniforms: {
            'bounds[0]': regl.prop('bounds[0]'),
            'bounds[1]': regl.prop('bounds[1]'),
            'model': (context, props) => props.model || context.model,
        },

        attributes: {
            position: regl.buffer([
                [-.2, -.2],
                [.2, -.2],
                [.2,  .2],
            ]),
        },
        count: 3,
    });
};