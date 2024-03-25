const validateProductInfo = (product) => {
    const requiredFields = ["name", "price", "stripeID"];
    const missingFields = requiredFields.filter(field => {
        if (field === "image") {
            return !product[field] || !product[field].size;
        } else {
            return !product[field]
        }
    });

    if (missingFields.length > 0) {
        return {
            isValid: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        };
    }

    return {isValid: true};
};

module.exports = validateProductInfo;