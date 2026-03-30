const initialState = {
  currentStep: 0,
  preferences: [],
  importedBooks: []
};

function createStore() {
  let state = { ...initialState };
  const listeners = new Set();

  return {
    getState() {
      return state;
    },

    setState(patch) {
      state = { ...state, ...patch };
      listeners.forEach((listener) => listener(state));
    },

    reset() {
      state = { ...initialState };
      listeners.forEach((listener) => listener(state));
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

export const onboardingStore = createStore();
