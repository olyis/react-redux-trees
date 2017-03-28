export function isPromise(candidate) {
    // TODO improve
    return candidate && !!candidate.then;
}

export function PromiseMonad(action) {
    const self = this;
    let resolved = false;
    let rejected = false;
    let value = undefined;
    let subs = [];

    self.bind = bind;
    self.map = map;
    self.then = then;
    self.catch = catchError;

    setTimeout(() => {
        action(resolveSelf, rejectSelf);
    });

    function isSelfPending() {
        return !resolved && !rejected;
    }

    function resolveSelf(val) {
        if (isSelfPending()) {
            resolved = true;
            value = val;
            subs.forEach(sub => sub.resolve(val));
            subs = [];
        }
    }

    function rejectSelf(val) {
        if (isSelfPending()) {
            rejected = true;
            value = val;
            subs.forEach(sub => sub.reject(val));
            subs = [];
        }
    }
    
    function subscribeSelf(resolve, reject) {
        if (resolved)
            resolve(value);
        else if (rejected)
            reject(value);
        else
            subs.push({resolve, reject});
    }

    function map(projection) {
        return new PromiseMonad((resolve, reject) =>
            subscribeSelf(val =>
                resolve(projection(val)),
                reject));
    }

    function bind(projection) {
        return new PromiseMonad((resolve, reject) =>
            subscribeSelf(val =>
                projection(val)
                    .then(resolve)
                    .catch(reject),
                reject));
    }

    function then(projection) {
        return new PromiseMonad((resolve, reject) =>
            subscribeSelf(val => {
                const projected = projection(val)
                if (isPromise(projected)) {
                    projected.then(resolve).catch(reject)
                } else {
                    resolve(projected)
                }
            }, reject))
    }

    function catchError(projection) {
        return new PromiseMonad((resolve, reject) =>
            subscribeSelf(resolve,
                err => {
                    const projected = projection(err)
                    if (isPromise(projected)) {
                        projected.then(resolve).catch(reject)
                    } else {
                        resolve(projected)
                    }
                }))
    }
}

export function pureReject(reason) {
    return new PromiseMonad((_, reject) => reject(reason))
}

export function pure(value) {
    return new PromiseMonad(resolve => resolve(value))
}

export default PromiseMonad