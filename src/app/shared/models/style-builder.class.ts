import * as _ from 'lodash';

export class StyleBuilderClass {

  public static build(): StyleBuilderClass {
    return new StyleBuilderClass();
  }

  public withBorderRadius(radius: number): StyleBuilderClass {
    if (radius) {
      _.set(this, 'borderRadius', radius + 'px');
    }
    return this;
  }

  public withHeight(value: string): StyleBuilderClass {
    if (value) {
      _.set(this, 'height', value);
    }
    return this;
  }

  public withWidth(value: string): StyleBuilderClass {
    if (value) {
      _.set(this, 'width', value);
    }
    return this;
  }

  withShadow(hasShadow: boolean): StyleBuilderClass {
    if (hasShadow) {
      _.set(this, 'webkitBoxShadow', '0px 3px 6px 0px rgba(0, 0, 0, 0.15)');
      _.set(this, 'mozBoxShadow', '0px 3px 6px 0px rgba(0, 0, 0, 0.15)');
      _.set(this, 'boxShadow', '0px 3px 6px 0px rgba(0, 0, 0, 0.15)');
    }
    return this;
  }

  withMinHeight(value: string): StyleBuilderClass {
    if (value) {
      _.set(this, 'minHeight', value);
    }
    return this;
  }
}
