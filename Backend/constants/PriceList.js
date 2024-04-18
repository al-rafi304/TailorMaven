const {SINGLE, DOUBLE, TUXEDO} = require('./SuitTypes')
const {COTTON, LINEN, VELVET} = require('./FabricTypes')

const SuitTypePrice = {
    [SINGLE]: 50,
    [DOUBLE]: 60,
    [TUXEDO]: 100 
}
const FabricTypePrice = {
    [COTTON]: 97,
    [LINEN]: 58,
    [VELVET]: 90
}

module.exports = {
    SuitTypePrice,
    FabricTypePrice
}