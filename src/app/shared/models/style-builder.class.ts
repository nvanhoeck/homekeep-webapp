import * as _ from 'lodash';

export class StyleBuilderClass {

  public static build(): StyleBuilderClass {
    return new StyleBuilderClass();
  }

  public withBorderRadius(radius: number): StyleBuilderClass {
    _.set(this, 'borderRadius',  radius + 'px');
    return this;
  }

  public withHeight(value: string): StyleBuilderClass {
    _.set(this, 'height',  value);
    return this;
  }

  public withWidth(value: string): StyleBuilderClass {
    _.set(this, 'width',  value);
    return this;
  }
}
