import BaseLayer from '../core/BaseLayer';
import { IRasterLayerStyleOptions } from '../core/interface';
import RasterModels, { RasterModelType } from './models/index';
export default class RaterLayer extends BaseLayer<IRasterLayerStyleOptions> {
  public type: string = 'RasterLayer';
  public buildModels() {
    const modelType = this.getModelType();
    this.layerModel = new RasterModels[modelType](this);
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
  protected getDefaultConfig() {
    const type = this.getModelType();
    const defaultConfig = {
      raster: {},
      raster3d: {},
      rasterTile: {},
    };
    return defaultConfig[type];
  }

  protected getModelType(): RasterModelType {
    // 根据 source 的类型判断 model type
    switch (this.layerSource.parser.type) {
      case 'raster':
        return 'raster';
      case 'rasterTile':
        return 'rasterTile';
      default:
        return 'raster';
    }
    // return 'raster';
  }
}
