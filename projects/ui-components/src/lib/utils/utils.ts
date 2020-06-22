
/**
 * customEmit :: Emits a custom event onto the Dom element
 * @param context - el.nativeElement of the component
 * @param output - name of the outPut variable
 * @param event - event name to bind to
 * @param val - value of the event to pass out
 */
export function customEmit(context, output, event, val) {
    console.log("customEmit context", context)
    console.log("customEmit output", output)
    console.log("customEmit event", event)
    console.log("customEmit val", val)

    context[output].emit(val);
    const domEvent = new CustomEvent(event, { detail: val });
    context.el.nativeElement.dispatchEvent(domEvent);
}
