export interface UIProperties{
    type ? : string | 'div';
    text ? : string | '';
    id? : string | undefined;
    classes ? : string[] | [];
    attributes ? : { [key: string]: string } | {};
    style ? : { [key: string]: string } | {};
    data ? : { [key: string]: string } | {};
    events ? : { [key: string]: (event: Event) => void } | {};
}

export class UIComponent  {
    element: HTMLElement;

    type: string | 'div';
    text: string | '';
    id: string | undefined;
    classes: string[] | [];
    attributes: { [key: string]: string } | {};
    style: { [key: string]: string } | {};
    data: { [key: string]: string } | {};
    events: { [key: string]: (event: Event) => void } | {};

    constructor( props: UIProperties ) {
        this.type = props.type;
        this.text = props.text;
        this.id = props.id;
        this.classes = props.classes;
        this.attributes = props.attributes;
        this.style = props.style;
        this.data = props.data;
        this.events = props.events;
        this.element = this.createElement();
    }

    createElement(): HTMLElement {
        let element: HTMLElement;

        if (this.type === 'div') {
            element = document.createElement('div');
        } else {
            element = document.createElement(this.type);
        }

        if (this.text) {
            element.innerText = this.text;
        }

        if (this.id) {
            element.id = this.id;
        }

        if (this.classes) {
            setClasses(element, this.classes);
        }

        if (this.attributes) {
                setOptions(element, this.attributes);
        }

        if (this.style) {
            setStyles(element, this.style);
        }

        if (this.data) {
            setDataset(element, this.data);
        }
        
        if (this.events) {
            setEvents(element, this.events);
        }

        return element;
    }

    appendChild(child: UIComponent | HTMLElement): void {
        if (child instanceof UIComponent) {
            this.element.appendChild(child.element);
        } else {
            this.element.appendChild(child);
        }
    }

    removeChild(child: UIComponent): void {
        this.element.removeChild(child.element);
    }

    appendTo(parent: UIComponent): void {
        parent.appendChild(this);
    }

    clean(): void {
        this.element.innerHTML = '';
    }

    show(): void {
        this.element.style.display = 'block';
    }

    hide(): void {
        this.element.style.display = 'none';
    }
}


/**
 * Set attributes to a DOM element
 * @param {*} element
 * @param {*} options
 */
export const setOptions = (element, options) => {
  if (options)
    for (const key in options) element.setAttribute(key, options[key]);
};

/**
 * Set dataset to a DOM element
 * @param {*} element
 * @param {*} dataset
 */
export const setDataset = (element, dataset) => {
  if (dataset) for (const key in dataset) element.dataset[key] = dataset[key];
};

/**
 * Set events to a DOM element
 * @param {*} element
 * @param {*} events
 */
export const setEvents = (element, events) => {
  if (events)
    for (const key in events) element.addEventListener(key, events[key]);
};

/**
 * Set styles to a DOM element
 * @param {*} element
 * @param {*} styles
 */
export const setStyles = (element, styles) => {
  if (styles) for (const key in styles) element.style[key] = styles[key];
};

/**
 * Set classes to a DOM element
 * @param {*} element
 * @param {*} classes
 */
export const setClasses = (element, classes) => {
  if (classes) classes.forEach((cl) => element.classList.add(cl));
};

/**
 * Remove the NODE matching the selector
 * @param {*} selector
 */
export const remove = (selector) => {
  const comp = document.querySelector(selector);
  if (comp != null) comp.parentNode.removeChild(comp);
};

/**
 * Remove all the NODEs matching the selector
 * @param {*} selector
 */
export const removeAll = (selector) => {
  const comps = document.querySelectorAll(selector);
  if (comps != null) comps.forEach((comp) => comp.parentNode.removeChild(comp));
};

export const forAll = (selector, funct) => {
  const comps = document.querySelectorAll(selector);
  if (comps != null) comps.forEach((comp) => funct(comp));
};
