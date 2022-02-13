export function invert(obj: Record<any, any>): Record<any, any> {
    const newObj = {}
    let key
    for (key in obj) {
        if (!obj.hasOwnProperty(key)) continue
        const value = obj[key]
        // @ts-ignore
        newObj[value] = key
    }
    return newObj
}

export function uniq<T>(src: T[]): T[] {
    const res = []
    let i: number
    for (i = 0; i < src.length; i++) {
        const value = src[i]
        if (res.indexOf(value) < 0) {
            res.push(value)
        }
    }
    return res
}

export function assign(target: Record<string, any>, src: Record<string, any>): Record<string, any> {
    let key: string
    for (key in src) {
        if (src.hasOwnProperty(key)) {
            console.debug('rewrite key:', key, ' with value:', src[key]) // DEBUG
            target[key] = src[key]
        }
    }
    return target
}

export async function sleep(timeout: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    });
}
