/**
 * customEmit :: Emits a custom event onto the Dom element
 * @param context - el.nativeElement of the component
 * @param output - name of the outPut variable
 * @param event - event name to bind to
 * @param val - value of the event to pass out
 */
export function customEmit(context, output, event, val) {
    context[output].emit(val);
    const domEvent = new CustomEvent(event, { detail: val });
    context.el.nativeElement.dispatchEvent(domEvent);
}

/**
 *
 * @param source object to add from
 * @param key object key to match
 * @param dest collection to add to
 */
export function appendToCollection(source: any[], key: string, dest: any) {
    if (source) {
        if (source[key]) {
            for (const k of Object.keys(source[key])) {
                dest = dest.append(k, source[key][k]);
            }
        }
    }
    return dest;
}
