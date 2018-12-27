import { vec3 } from 'gl-matrix';

const DEFAULT_COLOR = vec3.set(vec3.create(), 0, 0, 0);

export = function (regl) {
    const drawPoint = regl({
        frag: `
        precision mediump float;
        uniform lowp vec3 color;
        void main () {
            if (length(gl_PointCoord.xy - 0.5) > 0.45) {
                discard;
            }
            gl_FragColor = vec4(color, 1);
        }`,

        vert: `
        precision mediump float;
        uniform mat4 projection, view;
        // attribute float p;
        uniform float radius;

        float rand(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main () {
            float x = rand(vec2(0.1, 0.1));
            float y = rand(vec2(0.2, 0.2));
            float z = rand(vec2(0.3, 0.3));

            gl_PointSize = radius;
            gl_Position = projection * view * vec4(x, y, z, 1);
        }`,

        uniforms: {
            'radius': ({ pixelRatio }, { radius }) => pixelRatio * radius,
            'color': regl.prop('color'),
        },

        count: 100,
        primitive: 'points',
        offset: 0,
    });

    return function (radius?:number, color?:vec3) {
        drawPoint({
            radius: (radius || 8),
            color: color || DEFAULT_COLOR,
        });
    };
};