import AspectRatio from "../models/types/aspect-ratio.type"

export default class AspectRatioFunctions {

    static getAspectRatioFromSize(width: number, height: number): AspectRatio {
        return { numerator: this.getNumerator(width, height), denominator: this.getDenominator(width, height) }
    }

    static getNumerator(width: number, height: number): number {
        return width / this.gcd(width, height)
    }

    static getDenominator(width: number, height: number): number {
        return height / this.gcd(width, height)
    }

    static gcd(a: number, b: number): number {
        return b === 0 ? a : this.gcd(b, a % b)
    }

}
