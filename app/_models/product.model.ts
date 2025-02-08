import { Product } from "@/_lib/definitions";

export class ProductModel {
  private colorToSizes: Record<string, string[]>;
  private sizeToColors: Record<string, string[]>;

  constructor(public data: Product) {
    this.colorToSizes = this.hasStockBy("color");
    this.sizeToColors = this.hasStockBy("size");
  }
  getAvailableColors() {
    return this.data.colors
      .filter((color) => this.colorToSizes[color.name])
      .map((color) => {
        return { ...color, isAvailable: true };
      });
  }
  getAvailableSizes(colorFilter: string) {
    return this.data.sizes.map((size) => {
      let sizeAvailability;
      if (colorFilter)
        sizeAvailability = this.colorToSizes[colorFilter].find(
          (s) => s === size
        );
      else sizeAvailability = this.sizeToColors[size];
      return {
        value: size,
        isAvailable: Boolean(sizeAvailability),
      };
    });
  }
  getImagesByColor(colorFilter: string) {
    return (
      this.data.imagesByColor.find((item) => item.color === colorFilter)
        ?.images || []
    );
  }
  private hasStockBy(groupProp: "color" | "size") {
    const valueProp = groupProp === "color" ? "size" : "color";
    return this.data.stocks.reduce(
      (acc, currStock) => {
        if (currStock.quantity) {
          acc[currStock[groupProp]] ??= [];
          acc[currStock[groupProp]]?.push(currStock[valueProp]);
        }
        return acc;
      },
      {} as Record<string, string[]>
    );
  }
}
