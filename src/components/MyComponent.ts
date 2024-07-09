import { html, LitElement, customElement } from 'lit-element';

@customElement('my-component')
export class MyComponent extends LitElement {
  render() {
    return html`
      <div>
        <h2>This is a custom component</h2>
      </div>
    `;
  }
}
