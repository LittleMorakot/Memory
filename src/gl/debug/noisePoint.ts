import { vec3, mat4 } from 'gl-matrix';
import { hsv2rgb } from '../../utils/hsv2rgb';
// const noiseVert = require('../glsl/test.glsl');

const DEFAULT_COLOR = vec3.set(vec3.create(), 0, 0, 0);
const POINT_AMOUNT = 1e4;
const VERT_SIZE = 4 * (4 + 4 + 3);

export = function (regl) {

    const pointBuffer = regl.buffer(Array(POINT_AMOUNT).fill(0).map(() => {
        const color = hsv2rgb(Math.random() * 360, 0.6, 1);
        return [
            // freq
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            // phase
            2.0 * Math.PI * Math.random(),
            2.0 * Math.PI * Math.random(),
            2.0 * Math.PI * Math.random(),
            2.0 * Math.PI * Math.random(),
            // color
            color[0] / 255, color[1] / 255, color[2] / 255,
        ];
    }));

    const drawPoint = regl({
        frag: `
        precision lowp float;
        varying vec3 fragColor;
        void main() {
            if (length(gl_PointCoord.xy - 0.5) > 0.5) {
                discard;
            }
            gl_FragColor = vec4(fragColor, 1);
        }`,

        vert: `
        precision mediump float;
        attribute vec4 freq, phase;
        attribute vec3 color;
        uniform float time;
        uniform mat4 view, projection;
        varying vec3 fragColor;
        void main() {
            vec3 position = .5 * cos(freq.xyz * time + phase.xyz) + vec3(.5);
            gl_PointSize = 5.0 * (1.0 + cos(freq.w * time + phase.w));
            gl_Position = projection * view * vec4(position, 1);
            fragColor = color;
        }`,

        attributes: {
            freq: {
              buffer: pointBuffer,
              stride: VERT_SIZE,
              offset: 0,
            },
            phase: {
              buffer: pointBuffer,
              stride: VERT_SIZE,
              offset: 16,
            },
            color: {
              buffer: pointBuffer,
              stride: VERT_SIZE,
              offset: 32,
            },
          },

          uniforms: {
            // time: ({tick}) => tick * 0.001,
            time: 0.001,
          },

        count: POINT_AMOUNT,
        primitive: 'points',
    });

    return function (radius?:number, color?:vec3) {
        drawPoint({
            radius: (radius || 8),
            color: color || DEFAULT_COLOR,
        });
    };
};