import { TestElement, poll } from "../norman"

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

    track_target() {
        this.config.variant.track_event("Increasingly Collection Displayed")
        this.element = {}
        this.element.container = document.querySelector(this.config.target)
        this.element.products = this.element.container.querySelectorAll(".inc_col_lection_item_bk")
        this.config.debug && console.warn({ element: this.element })
        this.element.products.forEach(product => {
            let btn = product.querySelector(".inc_col_lection_checkout_btn")
            if (!!btn) {
                btn.addEventListener("click", e => {
                    this.config.variant.track_event("Increasingly Recommendation Clicked")
                })
            }
        })
        this.config.debug && console.warn({ element: this.element })
    }

    detect_target() {
        poll(_ => {
            this.config.debug && console.count(`Polling for target: ${this.config.target}`)
            return !!document.querySelector(this.config.target)
        }, _ => { this.track_target() }, 10, 3000)
    }
}