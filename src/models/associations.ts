import AccountingEntry from "./AccountingEntry"
import Benefict from "./Benefict"
import EntryType from "./EntryType"
import Inventory from "./Inventory"
import Membership from "./Membership"
import Parameter from "./Parameter"
import ParameterOption from "./ParameterOption"
import ParameterType from "./ParameterType"
import Product from "./Product"
import ProductEntry from "./ProductEntry"
import ProductParameter from "./ProductParameter"
import ProductUnit from "./ProductUnit"
import Profile from "./Profile"
import Subscription from "./Subscription"
import UnitType from "./UnitType"
import User from "./User"

export const setupAssociations = () => {
    /* PROFILES & USERS (1:N) */
    Profile.hasMany(User, {
        foreignKey: { name: "profileId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    User.belongsTo(Profile, {
        foreignKey: { name: "profileId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /* SUBSCRIPTIONS (User N:M Membership) */
    User.belongsToMany(Membership, {
        through: Subscription,
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Membership.belongsToMany(User, {
        through: Subscription,
        foreignKey: "membershipId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Subscription.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Subscription.belongsTo(Membership, {
        foreignKey: "membershipId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /* BENEFICTS (Membership 1:N Benefict) */
    Membership.hasMany(Benefict, {
        foreignKey: { name: "membershipId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Benefict.belongsTo(Membership, {
        foreignKey: { name: "membershipId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /* INVENTORY & USER (User 1:N Inventory) */
    User.hasMany(Inventory, {
        foreignKey: { name: "userId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Inventory.belongsTo(User, {
        foreignKey: { name: "userId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /* PRODUCTS & INVENTORY (Inventory 1:N Product) */
    Inventory.hasMany(Product, {
        foreignKey: { name: "inventoryId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Product.belongsTo(Inventory, {
        foreignKey: { name: "inventoryId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /* PARAMETERS, PARAMETER TYPE, PARAMETER OPTION & INVENTORY */
    ParameterType.hasMany(Parameter, {
        foreignKey: { name: "typeId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Parameter.belongsTo(ParameterType, {
        foreignKey: { name: "typeId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    Inventory.hasMany(Parameter, {
        foreignKey: { name: "inventoryId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Parameter.belongsTo(Inventory, {
        foreignKey: { name: "inventoryId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    Parameter.hasMany(ParameterOption, {
        foreignKey: { name: "parameterId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    ParameterOption.belongsTo(Parameter, {
        foreignKey: { name: "parameterId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /* PRODUCT PARAMETERS (Product N:M Parameter) */
    Product.belongsToMany(Parameter, {
        through: ProductParameter,
        foreignKey: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    Parameter.belongsToMany(Product, {
        through: ProductParameter,
        foreignKey: "parameterId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /* ACCOUNTING ENTRIES */
    /* ACCOUNTING ENTRIES to ENTRIES TYPES relation (N:1) */
    AccountingEntry.belongsTo(EntryType, {
        foreignKey: { name: "entryTypeId", allowNull: false },
    })
    /* ENTRIES TYPES to ACCOUNTING ENTRIES relation (1:N) */
    EntryType.hasMany(AccountingEntry, {
        foreignKey: { name: "entryTypeId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    /* ACCOUNTING ENTRIES to USERS relation (N:1) */
    AccountingEntry.belongsTo(User, {
        foreignKey: { name: "userId", allowNull: false },
    })
    /* USERS to ACCOUNTING ENTRIES relation (1:N) */
    User.hasMany(AccountingEntry, {
        foreignKey: { name: "userId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /*  EntryType.hasMany(AccountingEntry, {
        foreignKey: { name: "entryTypeId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    AccountingEntry.belongsTo(EntryType, {
        foreignKey: { name: "entryTypeId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    AccountingEntry.hasMany(ProductEntry, {
        foreignKey: { name: "entryTypeId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    User.hasMany(AccountingEntry, {
        foreignKey: { name: "userId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    AccountingEntry.belongsTo(User, {
        foreignKey: { name: "userId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }) */

    /* PRODUCT ENTRY (AccountingEntry N:M Product) */
    AccountingEntry.belongsToMany(Product, {
        through: ProductEntry,
        foreignKey: "entryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    Product.belongsToMany(AccountingEntry, {
        through: ProductEntry,
        foreignKey: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    ProductEntry.belongsTo(Product, {
        foreignKey: { name: "productId", allowNull: false },
    })

    Product.hasMany(ProductEntry, {
        foreignKey: { name: "productId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    ProductEntry.belongsTo(AccountingEntry, {
        foreignKey: { name: "entryId", allowNull: false },
    })

    AccountingEntry.hasMany(ProductEntry, {
        foreignKey: { name: "entryId", allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    //RELACION DE UNIT_TYPE a PRODUCT_UNIT
    /* Product.belongsToMany(UnitType, {
        through: ProductUnit,
        foreignKey: "productId",
        otherKey: "unitTypeId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    UnitType.belongsToMany(Product, {
        through: ProductUnit,
        foreignKey: "unitTypeId",
        otherKey: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }) */
    Product.hasOne(ProductUnit, {
        foreignKey: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    UnitType.hasMany(ProductUnit, {
        foreignKey: "unitTypeId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    ProductUnit.belongsTo(Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    ProductUnit.belongsTo(UnitType, {
        foreignKey: "unitTypeId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    /*  Product.hasMany(ProductUnit, {
        foreignKey: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })

    UnitType.hasMany(ProductUnit, {
        foreignKey: "unitTypeId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }) */
}
