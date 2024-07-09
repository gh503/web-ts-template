import { html, LitElement, customElement } from 'lit-element';

@customElement('home-view')
export class HomeView extends LitElement {
  render() {
    return html`
      <div>
        <h1>Welcome to My Vaadin Project</h1>
        <vaadin-text-field label="Enter your name"></vaadin-text-field>
        <vaadin-button @click="${this.sayHello}">Say Hello</vaadin-button>
      </div>
    `;
  }

  private sayHello() {
    const textField = this.shadowRoot?.querySelector('vaadin-text-field');
    const name = (textField as any).value;
    alert(`Hello, ${name}!`);
  }
}
