import { LetscreatePage } from './app.po';

describe('letscreate App', () => {
  let page: LetscreatePage;

  beforeEach(() => {
    page = new LetscreatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
