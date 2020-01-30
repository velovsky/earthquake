import { browser, element, by } from 'protractor';

export class DashboardPage {
  navigateTo() {
    return browser.get('');
  }

  havePaginatorElement() {
    return element(by.css('mat-paginator')).isPresent() as Promise<boolean>;
  }

  clickShowMenuButton() {
    return element(by.css('mat-sidenav-content p > button')).click() as Promise<void>;
  }

  isMenuOpen() {
    return element(by.css('mat-sidenav')).isDisplayed() as Promise<boolean>;
  }

}
