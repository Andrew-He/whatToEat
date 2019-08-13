

export const predicates = {
    match: x => ({
        on: (pred, fn) => pred(x) ? predicates.matched(fn(x)) : predicates.match(x),
        otherwise: fn => fn(x)
    }),

    matched: x => ({
        on: () => predicates.matched(x),
        otherwise: () => x
    })
};
