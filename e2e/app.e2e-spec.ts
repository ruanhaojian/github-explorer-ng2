import { GithubExplorerNg2Page } from './app.po';

describe('github-explorer-ng2 App', function() {
  let page: GithubExplorerNg2Page;

  beforeEach(() => {
    page = new GithubExplorerNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
