import "./index.css"
import { Variant } from "../norman"
import { IncreasinglyTracker } from "../Increasingly"
import { ExtractVariantName } from "../norman/ExtractVariantName"

const conditions = _ => {
    let conditions = [
        !!document.querySelector(`body`),
    ]
    return conditions.every(a => a)
}

function action() {
    this.log("Action loaded")
    console.warn(this)
    const incTracker = new IncreasinglyTracker({
        variant: this,
        debug: false,
        target: ".plp_collection_bk"
    })
    incTracker.init()
}

function fallback() {
    this.log("Test can't run, fallback loaded", true)
}

const control = new Variant(TEST, ExtractVariantName(__dirname), conditions, action, fallback)
control.run()