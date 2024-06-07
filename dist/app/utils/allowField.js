"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPayload = void 0;
// Filter allowed fields from payload
const filterPayload = (payload, allowedFields) => {
    const disallowedFields = Object.keys(payload).filter((key) => !allowedFields.includes(key));
    if (disallowedFields.length > 0) {
        throw new Error(`Invalid fields: ${disallowedFields.join(', ')}`);
    }
    return Object.keys(payload)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj, key) => {
        obj[key] = payload[key];
        return obj;
    }, {});
};
exports.filterPayload = filterPayload;
