export const getElement = <T extends HTMLElement>(root: DocumentFragment, selector: string): T => {
    const element = root.querySelector<T>(selector)
    if (!element) {
        throw new TypeError(`Error - can't get selector`)
    }
    return element
}

export const cloneNode =<T extends HTMLTemplateElement> (root: T): DocumentFragment => {
    const element: Node = root.content.cloneNode(true);
    if (!(element instanceof DocumentFragment)) {
        throw new TypeError(`Error - can't clone template`)
    }
    return element
}
