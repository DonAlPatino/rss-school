export const getElement = <T extends HTMLElement>(root: HTMLDivElement, selector: string): T => {
    const element = root.querySelector<T>(selector)
    if (!element) {
        throw new TypeError(`Error - can't get selector`)
    }
    return element
}

export const getElements = <T extends HTMLElement>(root: HTMLDivElement, selector: string): NodeListOf<T> => {
    const elements = root.querySelectorAll<T>(selector)
    if (!elements) {
        throw new TypeError(`Error - can't get selector`)
    }
    return elements
}

export const cloneNode =<T extends HTMLTemplateElement> (root: T): DocumentFragment => {
    const element: Node = root.content.cloneNode(true);
    if (!(element instanceof DocumentFragment)) {
        throw new TypeError(`Error - can't clone template`)
    }
    return element
}

export const getElementOfDocument = <T extends HTMLElement>( selector: string): T => {
    const element = document.querySelector<T>(selector)
    if (!element) {
        throw new TypeError(`Error - can't get selector`)
    }
    return element
}
