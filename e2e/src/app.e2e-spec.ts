import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Earthquakes App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('have loader and dashboard elements present', () => {
    page.navigateTo();
    expect(page.haveLoadingElement() && page.haveDashboardElement()).toEqual(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
