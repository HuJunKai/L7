import { Mapbox, Scene } from '@antv/l7';
import { Choropleth } from '@antv/l7plot';

const scene = new Scene({
  id: 'map',
  map: new Mapbox({
    style: 'blank',
    center: [120.19382669582967, 30.258134],
    zoom: 3,
    pitch: 0,
  }),
});

scene.on('loaded', () => {
  fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/6a5ee962-76df-479c-b49a-9c76662e727d.json',
  )
    .then((res) => res.json())
    .then((ProvinceData) => {
      const choropleth = new Choropleth({
        source: {
          data: ProvinceData,
          joinBy: {
            sourceField: 'code',
            geoField: 'adcode',
          },
        },
        viewLevel: {
          level: 'country',
          adcode: 100000,
        },
        autoFit: true,
        color: {
          field: 'value',
          value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
          scale: { type: 'quantile' },
        },
        style: {
          opacity: 1,
          stroke: '#ccc',
          lineWidth: 0.6,
          lineOpacity: 1,
        },
        label: {
          visible: true,
          field: 'name',
          style: {
            fill: '#000',
            opacity: 0.8,
            fontSize: 10,
            stroke: '#fff',
            strokeWidth: 1.5,
            textAllowOverlap: false,
            padding: [5, 5],
          },
        },
        state: {
          active: { stroke: 'black', lineWidth: 1 },
        },
        tooltip: {
          items: ['name', 'adcode', 'value'],
        },
        zoom: {
          position: 'bottomright',
        },
        legend: {
          position: 'bottomleft',
        },
      });
      choropleth.addToScene(scene);
    });
});
