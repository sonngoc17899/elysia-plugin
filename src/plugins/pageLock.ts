import { Elysia, Context } from "elysia";

export const pageLock = new Elysia({name: 'pageLock'}).onTransform(({request: req, set}: Context)=> {
    if (
        req.ssrContext?.isPreview ||
        req.ssrContext?.previewId
    ) {
        return;
    }

    const fullUrl = new URL(`http://domain.com${req.url}`);
    const locks = req.ssrContext.bootstrap?.navigation.page_locks || [];
    const path = fullUrl.pathname.replace(/\/+$/, '');
    if (locks.includes(path)) {
        set.redirect = ('/page-not-found');
        return;
    }

    return;
})