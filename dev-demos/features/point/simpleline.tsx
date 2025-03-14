import {
  LineLayer,
  Scene,
  // @ts-ignore
} from '@antv/l7';
// @ts-ignore
import { GaodeMap } from '@antv/l7-maps';
import React, { useEffect } from 'react';
import { polygonToLineString, MultiPolygon } from '@turf/turf';

function getImageData(img: HTMLImageElement) {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const { width, height } = img;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);

  return imageData;
}

function getLatData(data: number[]) {
  const size = Math.floor(Math.sqrt(data.length));

  const arr = [];
  const startLng = 110;
  const lngStep = 5 / (size - 1);
  const startLat = 30;
  const latStep = -5 / (size - 1);
  for (let i = 0; i < size; i++) {
    const arr2 = [];
    for (let j = 0; j < size; j++) {
      const index = i + j * size;
      const x = startLng + lngStep * i;
      const y = startLat + latStep * j;
      // @ts-ignore
      arr2.push([x, y, data[index]]);
    }
    // @ts-ignore
    arr.push(arr2);
  }
  return arr;
}

function getLngData(data: number[]) {
  const size = Math.floor(Math.sqrt(data.length));
  const arr = [];
  const startLng = 110;
  const lngStep = 5 / (size - 1);
  const startLat = 30;
  const latStep = -5 / (size - 1);

  for (let i = 0; i < size; i++) {
    const arr2 = [];
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      const x = startLng + lngStep * j;
      const y = startLat + latStep * i;
      // @ts-ignore
      arr2.push([x, y, data[index]]);
    }
    // @ts-ignore
    arr.push(arr2);
  }
  return arr;
}

function getR(data: Uint8ClampedArray) {
  const arr = [];
  for (let i = 0; i < data.length; i += 4) {
    // @ts-ignore
    arr.push(data[i]);
  }
  return arr;
}

export default () => {
  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        // center: [121.268, 30.3628],
        // center: [115.565185546875,41.31082388091818],
        center: [112.796630859375, 21.80030805097259],
        pitch: 0,
        // style: 'blank',
        // zoom: 3,
        zoom: 10,
      }),
    });

    const testdata = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [
              [
                [115.565185546875, 41.31082388091818],
                [115.3948974609375, 41.203456192051306],
                [115.1751708984375, 40.979898069620134],
                [115.0982666015625, 40.90105786688403],
                [114.697265625, 40.701463603604594],
                [114.89501953125, 40.50126945841643],
                [114.9993896484375, 40.50126945841643],
                [115.0982666015625, 40.400947631519614],
                [114.9993896484375, 40.3004760797495],
                [114.697265625, 40.20405042511331],
                [114.697265625, 40.3004760797495],
                [114.3951416015625, 40.20405042511331],
                [114.1973876953125, 40.20405042511331],
                [114.0985107421875, 40.00237193587648],
                [113.9996337890625, 39.90130858574736],
                [113.697509765625, 39.80009595634837],
                [113.2965087890625, 39.90130858574736],
                [113.0987548828125, 39.80009595634837],
                [112.9998779296875, 39.70296052957232],
                [112.69775390625, 39.202462225882385],
                [112.598876953125, 39.202462225882385],
                [112.5, 39.0533181067413],
                [112.3956298828125, 38.90385833966778],
                [112.1978759765625, 38.70265930723801],
                [112.060546875, 38.77121637244272],
                [112.060546875, 40.061256581404734],
                [112.1978759765625, 40.20405042511331],
                [112.060546875, 40.20405042511331],
                [112.060546875, 41.31082388091818],
                [115.565185546875, 41.31082388091818],
              ],
            ],
          },
          properties: {
            ECO_NAME: 'Mongolian-Manchurian grassland',
            BIOME_NAME: 'Temperate Grasslands, Savannas & Shrublands',
            REALM: 'Palearctic',
            NNH: 3,
            NNH_NAME: 'Nature Could Recover',
            COLOR: '#F6FC38',
            COLOR_BIO: '#FEFF73',
            COLOR_NNH: '#F9A91B',
          },
        },
      ],
    };

    const multipolygon = {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [112.796630859375, 21.80030805097259],
              [112.796630859375, 21.601258036965902],
              [112.69775390625, 21.70336934552425],
              [112.796630859375, 21.80030805097259],
            ],
          ],
          [
            [
              [113.5491943359375, 22.350075806124863],
              [113.5986328125, 22.304343762932234],
              [113.499755859375, 22.2026634080092],
              [113.2965087890625, 22.2026634080092],
              [113.1976318359375, 22.004174972902007],
              [113.0987548828125, 22.10090935057272],
              [112.9998779296875, 22.10090935057272],
              [112.9998779296875, 21.902277966668635],
              [112.8955078125, 21.902277966668635],
              [112.8515625, 21.94304553343818],
              [112.796630859375, 22.004174972902007],
              [112.74169921875, 21.94304553343818],
              [112.598876953125, 21.80030805097259],
              [112.3956298828125, 21.80030805097259],
              [112.3956298828125, 21.70336934552425],
              [112.2967529296875, 21.70336934552425],
              [112.1978759765625, 21.80030805097259],
              [112.060546875, 21.80030805097259],
              [112.060546875, 22.350075806124863],
              [113.5491943359375, 22.350075806124863],
            ],
          ],
          [
            [
              [114.2962646484375, 22.350075806124863],
              [114.1973876953125, 22.304343762932234],
              [114.049072265625, 22.350075806124863],
              [114.2962646484375, 22.350075806124863],
            ],
          ],
        ],
      },
      properties: {
        ECO_NAME: 'Mongolian-Manchurian grassland',
        BIOME_NAME: 'Temperate Grasslands, Savannas & Shrublands',
        REALM: 'Palearctic',
        NNH: 3,
        NNH_NAME: 'Nature Could Recover',
        COLOR: '#F6FC38',
        COLOR_BIO: '#FEFF73',
        COLOR_NNH: '#F9A91B',
      },
    };
    const testdata2 = {
      type: 'FeatureCollection',
      features: [],
    };
    console.log(polygonToLineString((multipolygon as unknown) as MultiPolygon));

    const layer = new LineLayer()
      // .source({
      //   type: 'FeatureCollection',
      //   features: [
      //     {
      //       type: 'Feature',
      //       properties: {},
      //       geometry: {
      //         type: 'MultiLineString',
      //         coordinates: [
      //           [
      //             [80, 30, 5000],
      //             [150, 30, 5000],
      //             [150, 10, 5000],
      //           ],
      //           [
      //             [120, 50, 5000],
      //             [120, 30, 5000],
      //           ],
      //         ],
      //       },
      //     },
      //     {
      //       type: 'Feature',
      //       properties: {},
      //       geometry: {
      //         type: 'MultiLineString',
      //         coordinates: [
      //           [
      //             [100, 35, 100],
      //             [120, 50, 100],
      //             [120, 20, 100],
      //             [130, 20, 100],
      //           ],
      //         ],
      //       },
      //     },
      //   ],
      // })
      // @ts-ignore
      // .source(polygonToLine(testdata2))
      // .source(testdata)
      .source(polygonToLineString((multipolygon as unknown) as MultiPolygon))
      // .source([
      //   {
      //     lng1: 120,
      //     lat1: 30,
      //     lng2: 130,
      //     lat2: 30
      //   }
      // ], {
      //   parser: {
      //     type: 'json',
      //     x: 'lng1',
      //     y: 'lat1',
      //     x1: 'lng2',
      //     y1: 'lat2'
      //   }
      // })
      .shape('simple')
      .color('#f00')
      .style({
        // vertexHeightScale: 2000,
        // sourceColor: '#f00',
        // targetColor: '#0f0',
      });

    scene.on('loaded', () => {
      scene.addLayer(layer);
    });

    const img: HTMLImageElement = new Image();
    img.crossOrigin = 'none';
    img.src =
      'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*UkvYRYS5jTAAAAAAAAAAAAAAARQnAQ';
    img.onload = function() {
      const data = getImageData(img);
      const rData = getR(data.data);
      const d1 = getLngData(rData);
      const d2 = getLatData(rData);
      const geoData = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'MultiLineString',
              coordinates: d1,
            },
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'MultiLineString',
              coordinates: d2,
            },
          },
        ],
      };
      // console.log(geoData)
      const layer = new LineLayer({})
        .source(geoData)
        .size(1)
        .shape('simple')
        .color('#f00')
        .style({
          vertexHeightScale: 2000,
          opacity: 0.4,
        });
      scene.addLayer(layer);
    };
  }, []);
  return (
    <div
      id="map"
      style={{
        height: '500px',
        position: 'relative',
      }}
    />
  );
};
