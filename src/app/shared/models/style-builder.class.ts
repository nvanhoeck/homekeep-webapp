export class StyleBuilderClass {

  public static build(): StyleBuilderClass {
    return new StyleBuilderClass();
  }

  public withBorderRadius(radius: number): StyleBuilderClass {
    return {...this, borderRadius: radius + 'px'};
  }

}
