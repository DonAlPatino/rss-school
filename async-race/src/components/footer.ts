export default class Footer {
  private readonly template:string;

  private readonly container: HTMLElement;

  constructor() {
    this.container = document.createElement('footer');
    this.template = `<p class="copyright">
<a href="https://rs.school/js/">
<img src="https://rs.school/images/rs_school_js.svg" alt="Logotype"></a>
<a href="https://github.com/DonAlPatino">Don Al Patino 2023</a>
</p>
`;
  }

  render():HTMLElement {
    this.container.innerHTML = this.template;
    return this.container;
  }
}
