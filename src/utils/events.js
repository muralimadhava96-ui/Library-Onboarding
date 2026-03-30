export function emit(target, eventName, detail = undefined) {
  target.dispatchEvent(
    new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    })
  );
}

export function on(target, eventName, handler) {
  target.addEventListener(eventName, handler);
  return () => target.removeEventListener(eventName, handler);
}
