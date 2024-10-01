import { AbilityBuilder, Ability } from "@casl/ability";

export const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === "restaurant_manager") {
    can("manage", "restaurant");
    if (!user.sub_role) {
      // Super admin abilities (can manage all, except create orders)
      can("manage", "all"); // Super admins can do everything
      cannot("create", "Order"); // But they can't create orders
    } else {
      // Restaurant Manager with sub-role permissions
      user.Permissions.forEach((permission) => {
        can(permission.action.toLowerCase(), permission.object);
      });
      cannot("create", "Order"); // Restaurant managers can't create orders
    }
  } else if (user.role === "customer") {
    // Customer abilities (create and read their own orders and profile)
    can("read", "Order", { customerId: user.id });
  }

  can("edit", "User", { id: user.id });
  can("read", "User", { id: user.id });

  return build();
};
