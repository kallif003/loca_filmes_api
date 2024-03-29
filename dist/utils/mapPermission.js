"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
class PermissionMapper {
    static getCreatablePermission(userPermission) {
        const mappedPermissions = PermissionMapper.creatablePermissions[userPermission];
        if (mappedPermissions) {
            return mappedPermissions;
        }
        else {
            throw new Error("Você não possui permissão para criar usuários");
        }
    }
}
PermissionMapper.creatablePermissions = {
    [enum_1.Permissions.ADMIN]: [enum_1.Permissions.COLLABORATOR],
    [enum_1.Permissions.MASTER]: [enum_1.Permissions.ADMIN],
    [enum_1.Permissions.COLLABORATOR]: [enum_1.Permissions.CLIENT],
    [enum_1.Permissions.CLIENT]: [enum_1.Permissions.CLIENT],
};
exports.default = PermissionMapper;
//# sourceMappingURL=mapPermission.js.map