import { Permissions } from "./enum";

class PermissionMapper {
  private static creatablePermissions: Record<Permissions, Permissions[]> = {
    [Permissions.ADMIN]: [Permissions.COLLABORATOR],
    [Permissions.MASTER]: [Permissions.ADMIN],
    [Permissions.COLLABORATOR]: [Permissions.CLIENT],
    [Permissions.CLIENT]: [Permissions.CLIENT],
  };

  static getCreatablePermission(userPermission: string): Permissions[] {
    const mappedPermissions =
      PermissionMapper.creatablePermissions[userPermission as Permissions];

    if (mappedPermissions) {
      return mappedPermissions;
    } else {
      throw new Error("Você não possui permissão para criar usuários");
    }
  }
}

export default PermissionMapper;
