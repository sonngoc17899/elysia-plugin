enum CacheKeys {
  ThemeLocale = 'theme_locale',
  ShopLocale = 'shop_locale',
  DynamicComponent = 'dynamic_component',
}

/**
 * Build shop theme locale cache key
 * @param shopId
 * @param handle
 */
export function buildShopLocaleCacheKey(handle: string, shopId: number): string {
  return `${handle}_${shopId}`;
}

/**
 * Build theme locale cache key
 * @param versionId
 * @param handle
 * @param useGpt
 */
export function buildLocaleCacheKey(handle: string, versionId = 1, useGpt = false): string {
  return `${useGpt ? 'gpt_' : ''}${handle}_${versionId}`;
}

/**
 * Build dynamic component cache key
 * @param domain
 */
export function buildDynamicComponentCacheKey(domain: string): string {
  return `${CacheKeys.DynamicComponent}_${domain}`;
}

export enum CacheExpires {
  Default = 60 * 5,
  ThirdPartyAppsVersion = 60 * 60 * 24 * 90,
  Locale = 60 * 60 * 24 * 14,
  TemplateDynamicComponent = 60 * 60 * 24 * 30,
  ShopDynamicComponent = 60 * 30,
}