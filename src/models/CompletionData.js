export class CompletionData {
    lengthOfShots;
    averageShotDepth;
    pumpSettlementLength;

    numberCasingPipes;
    numberProductionTubings;

    casing;
    casingTop;
    casingMiddle;
    casingBottom;

    tubing;
    tubingTop;
    tubingMiddle;
    tubingBottom;

    constructor(lengthOfShots, averageShotDepth, pumpSettlementLength,
                numberCasingPipes, numberProductionTubings,
                casing, casingTop, casingMiddle, casingBottom,
                tubing, tubingTop, tubingMiddle, tubingBottom) {
        this.lengthOfShots = lengthOfShots;
        this.averageShotDepth = averageShotDepth;
        this.pumpSettlementLength = pumpSettlementLength;
        this.numberCasingPipes = numberCasingPipes;
        this.numberProductionTubings = numberProductionTubings;
        this.casing = casing;
        this.casingTop = casingTop;
        this.casingMiddle = casingMiddle;
        this.casingBottom = casingBottom;
        this.tubing = tubing;
        this.tubingTop = tubingTop;
        this.tubingMiddle = tubingMiddle;
        this.tubingBottom = tubingBottom;
    }
}