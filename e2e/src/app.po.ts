import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  haveLoadingElement() {
    return element(by.css('app-root app-loader')).isPresent() as Promise<boolean>;
  }

  haveDashboardElement() {
    return element(by.css('app-root app-dashboard')).isPresent() as Promise<boolean>;
  }
}
