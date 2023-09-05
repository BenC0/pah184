import { poll } from "../norman"

export class IncreasinglyTracker {
    constructor(options = {}) {
        const {
            variant = null,
            debug = false,
            target = null,
        } = options
        
        this.config = {}
        this.config.debug = debug
        this.config.target = target
        this.config.variant = variant
    }

    init() {
        if(!!this.config.variant) {
            this.detect_target()
        } else {
            console.error("Variation undefined", this.config)
        }
    }

    build_element_object() {
        this.element = {}
        this.element.container = document.querySelector(this.config.target)
        this.element.products = this.element.container.querySelectorAll(".inc_col_lection_item_bk")
        this.elements.products.map(product => { return product })
        // .inc_col_lection_checkout_btn
        this.config.debug && console.warn({ element: this.element })
    }

    track_target() {
        this.build_element_object()
    }

    detect_target() {
        poll(_ => {
            this.config.debug && console.count(`Polling for target: ${this.config.target}`)
            return !!document.querySelector(this.config.target)
        }, _ => { this.track_target() }, 10, 3000)
    }
}