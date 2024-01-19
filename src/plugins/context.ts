export type Theme = {
    customized?: boolean;
    is_web_builder?: boolean,
    handle: string,
    version_id: number,
    cdn: {
        asset: string,
    }
};

export type Navigation = {
    page_locks: Array<string>,
}


export interface SSRBootstrap {
    theme: Theme;
    navigation: Navigation,
    shop: {
        id: number,
    },
}

export interface Shop {
    id: number,
    locale: {
        code: string
    }
}


export type SSRContext = {
    id: number,
    bootstrap?: SSRBootstrap;
    isPreview?: boolean,
    previewId?: number,
    isCheckout?: boolean,
    featureSwitch?: Record<string, boolean>,
    state?: {
        theme: Theme,
        feature_switch: {
            [key: string]: string
        },
        shop: Shop,
        locales: Array<Locale>,
        checkout_locales: {
            [key: string]: string,
        },
        cdn: {
            locale: Locale,
            locale_version: number,
            assets_domain: string,
        }
    }
};

export declare type I18nLocaleMessages = {
    [k: string]: any;
};

export type Locale = {
    code: string;
    name: string;
    content?: I18nLocaleMessages;
    customized: boolean;
};

declare global {
    interface Request {
        ssrContext: SSRContext;
        http: any;
        featureSwitch?: Record<string, boolean>,
    }
}


export declare type I18nLocaleMessage = string;
