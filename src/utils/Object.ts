/* eslint-disable @typescript-eslint/no-explicit-any */
export const haveSameInterface = (obj1: object, obj2: object): boolean => {
    const obj1Interface = obj1 as any
    const obj2Interface = obj2 as any

    return (
        Object.keys(obj1Interface).length ===
            Object.keys(obj2Interface).length &&
        Object.keys(obj1Interface).every(
            key => typeof obj1Interface[key] === typeof obj2Interface[key],
        )
    )
}
