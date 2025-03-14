import { IEncodeFeature } from '@antv/l7-core';
import BaseLayer from '../core/BaseLayer';
import { IPolygonLayerStyleOptions } from '../core/interface';
import PolygonModels, { PolygonModelType } from './models/';

export default class PolygonLayer extends BaseLayer<IPolygonLayerStyleOptions> {
  public type: string = 'PolygonLayer';
  public buildModels() {
    const shape = this.getModelType();
    this.layerModel = new PolygonModels[shape](this);
    this.layerModel.initModels((models) => {
      this.models = models;
      this.renderLayers();
    });
  }
  public rebuildModels() {
    this.layerModel.buildModels((models) => (this.models = models));
  }
  protected getConfigSchema() {
    return {
      properties: {
        opacity: {
          type: 'number',
          minimum: 0,
          maximum: 1,
        },
      },
    };
  }

  protected getModelType(): PolygonModelType {
    if (this.layerSource.parser.type === 'mvt') {
      return 'vectorpolygon';
    }
    const shapeAttribute = this.styleAttributeService.getLayerStyleAttribute(
      'shape',
    );
    const shape = shapeAttribute?.scale?.field as PolygonModelType;
    if (shape === 'fill') {
      return 'fill';
    } else if (shape === 'extrude') {
      return 'extrude';
    } else if (shape === 'water') {
      return 'water';
    } else if (shape === 'ocean') {
      return 'ocean';
    } else if (shape === 'line') {
      return 'line';
    } else if (shape === 'tile') {
      return 'tile';
    } else {
      return this.getPointModelType();
    }
  }
  protected getPointModelType(): PolygonModelType {
    // pointlayer
    //  2D、 3d、 shape、image、text、normal、
    const layerData = this.getEncodedData();
    const { shape2d, shape3d } = this.getLayerConfig();
    const iconMap = this.iconService.getIconMap();
    const item = layerData.find((fe: IEncodeFeature) => {
      return fe.hasOwnProperty('shape');
    });
    if (!item) {
      return 'fill';
    } else {
      const shape = item.shape;
      if (shape === 'dot') {
        return 'point_normal';
      }
      if (shape2d?.indexOf(shape as string) !== -1) {
        return 'point_fill';
      }
      if (shape3d?.indexOf(shape as string) !== -1) {
        return 'point_extrude';
      }
      if (iconMap.hasOwnProperty(shape as string)) {
        return 'point_image';
      }
      return 'text';
    }
  }
}
