import { Elysia } from "elysia";

declare module global {
    interface Request {
        featureSwitch?: Record<string, boolean>;
    }
}

const keyAbTestNameHeader = ['x-buyer-ab-test'];
const keyAbTestNameCookie = 'X-Buyer-AB-Test';
function getHeaderValueFromReq(
    req: any,
    keysHeader: string[],
    keyCookie: string,
    defaultValue: string
): string {
    if (keyCookie && req.cookies[keyCookie]) {
        return <string>req.cookies[keyCookie];
    }

    const headerValue = getHeaderValue(req, keysHeader);

    if (!headerValue) {
        return defaultValue;
    }

    if (typeof headerValue === 'string') {
        return headerValue;
    }

    return headerValue[0] || defaultValue;
}

function getHeaderValue(req: any, headers: string[]): string | string[] | undefined {
    for (let i = 0; i < headers.length; i++) {
        if (req.headers[headers[i]]) {
            return req.headers[headers[i]];
        }
    }
    return '';
}

export const featureSwitch = new Elysia().onTransform(async ({request: req , log}) => {
    const shopId = `${(req.ssrContext.bootstrap && req.ssrContext.bootstrap.shop.id) || 0}`;
    const abTestName = getHeaderValueFromReq(req, keyAbTestNameHeader, keyAbTestNameCookie, '');
    const cacheField = `${shopId}_${abTestName}`;
    // cache
    /*try {
        await fastify.cache.isReady();
        const val = await fastify.cache.hget(CacheKeys.FeatureSwitch, cacheField);
        if (val) {
            req.ssrContext.featureSwitch = req.featureSwitch = JSON.parse(val);
            return;
        }
    } catch (err) {
        req.log.error(err, 'Get feature switch from cache');
    }*/
    try {
        const options = {
            headers: {},
        };
        if (abTestName) {
            // @ts-ignore
            options.headers['X-Buyer-AB-Test'] = abTestName;
        }
        // custom http
        /*const response = await app.get(
            '/catalog/feature-switch.json?minimal=true',
            options
        );
        if (response.data) {
            req.ssrContext.featureSwitch = req.featureSwitch = response.data;
            // cache
            /!*fastify.cache.hset(CacheKeys.FeatureSwitch, cacheField, JSON.stringify(response.data));
            fastify.cache.expire(CacheKeys.FeatureSwitch, 900);*!/
        }*/
    } catch (err) {
        log.error(err, 'Get feature switch from api');
    }
})