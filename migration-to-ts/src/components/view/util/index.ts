export const getElement = <T extends HTMLElement>(root: HTMLElement, selector: string): T => {
    const element = root.querySelector<T>(selector)
    if (!element) {
        throw new TypeError('blalalal')
    }
    return element
}
