import logger from 'redux-logger';
import { createPromise } from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const promise = createPromise ({
    type: {
        fullfilled:'succsess'
    }
})

export {
    logger,
    promise,
    thunk
}