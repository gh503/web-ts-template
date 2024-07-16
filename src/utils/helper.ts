/* 无刷新跳转 */
export function navigateToUrl(url: string) {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
}
