// src/models/index.ts
/* import "./AccountingEntry" */
import "./Benefict"
import "./EntryType"
import "./Inventory"
import "./Membership"
import "./Parameter"
import "./ParameterOption"
import "./ParameterType"
import "./Product"
/* import "./ProductEntry" */
/* import "./ProductParameter" */
import "./Profile"
import "./Subscription"
import "./User"

import { setupAssociations } from "./associations"

export const initModels = () => {
    setupAssociations()
}
