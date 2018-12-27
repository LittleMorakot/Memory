import { mat4, vec3 } from 'gl-matrix';
import { REGLLoader } from './regl';
import { GLState } from './state/state';
import { GameState } from '../state';

import glDebugBox = require('./debug/box');
import glDebugTriangle = require('./debug/triangle');
import glDebugPoint = require('./debug/point');
import glDebugNoisePoint = require('./debug/noisePoint');

export = function (regl, loader:REGLLoader) {
    const drawDebugBox = loader.require(glDebugBox);
    const drawDebugTriangle = loader.require(glDebugTriangle);
    const drawDebugPoint = loader.require(glDebugPoint);
    const drawDebugNoisePoint = loader.require(glDebugNoisePoint);

    const modelMatrix = mat4.identity(mat4.create());

    const setup = loader.profile('main:setup', {
        context: {
            model: modelMatrix,
        },
        uniforms: {
            model: modelMatrix,

            eye: regl.prop('camera.eye'),
            view: regl.prop('camera.view'),
            projection: regl.prop('camera.projection'),
            viewProj: regl.prop('camera.viewProjection'),
            invView: regl.prop('camera.invView'),
            invProjection: regl.prop('camera.invProjection'),
        },
    });

    function draw (state:GameState) {
        const glState = <GLState>state.glState;
        setup(glState, (context) => {
            regl.clear({
                depth: 1,
            });
            // drawDebugTriangle();
            drawDebugBox({
                bounds: [[0, 0, 0], [1, 1, 1]],
                color: [1, .2, .2],
            });

            drawDebugPoint(vec3.fromValues(0, 0, 0), undefined, vec3.fromValues(0, 0, 0));
            drawDebugPoint(vec3.fromValues(1, 0, 0), undefined, vec3.fromValues(1, 0, 0));
            drawDebugPoint(vec3.fromValues(0, 1, 0), undefined, vec3.fromValues(0, 1, 0));
            drawDebugPoint(vec3.fromValues(0, 0, 1), undefined, vec3.fromValues(0, 0, 1));

            drawDebugNoisePoint();
        });
    }

    return {
        draw,
    };
};