export interface ParameterModel {
    id?: number
    name: string
    configuration: ParameterConfigurationModel
}

export interface ParameterConfigurationModel {
    required: boolean
}
