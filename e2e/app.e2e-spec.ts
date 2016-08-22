import { SolarToolPage } from './app.po';

describe('solar_tool App', function() {
  let page: SolarToolPage;

  beforeEach(() => {
    page = new SolarToolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
