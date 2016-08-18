import { RubbertrampPage } from './app.po';

describe('rubbertramp App', function() {
  let page: RubbertrampPage;

  beforeEach(() => {
    page = new RubbertrampPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
