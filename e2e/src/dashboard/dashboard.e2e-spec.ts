import { DashboardPage } from './dashboard.po';

describe('Dashboard tests', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
    page.navigateTo();
  });

  it('displays paginator element', () => {
    expect(page.havePaginatorElement()).toEqual(true);
  });

  it('shows filters/sort menu', () => {
    page.clickShowMenuButton();
    expect(page.isMenuOpen()).toBe(true);
  });

});
